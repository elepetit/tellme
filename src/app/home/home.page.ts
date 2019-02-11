import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { GoogleService, GoogleObj } from '../google.service';
import { Platform, PopoverController} from '@ionic/angular';
import {BellovacomService} from '../bellovacom.service';
import { PopoverPage } from './../popover/popover.page';
import { LoadingController } from '@ionic/angular';
//import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

const consignes = 'La navigation se fait par glissement d\'un doigt sur l\'écran ,Switchez de gauche à droite ou de droite à gauche pour naviguer dans la section en cours.,Switchez de haut en bas pour entrer dans les détails d\'une section, et de bas en haut pour en sortir.,Un touche sur l\'écran répète la dernière phrase,un message vous averti quand vous êtes à la fin d\'une section';
const ratio = 1.5;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [GoogleService],
})
export class HomePage {
 	public carte;
	public googleObj: GoogleObj = new GoogleObj();
  	public key: string;
  	public result = '';
  	private btnSubmit: any;
  	private idx;
  	private ido;
  	private idxBck;
  	private to;
  	private currentLangage;
  	public value = 2;
constructor(
	private router: Router,
	private tts: TextToSpeech,
	private _google: GoogleService,
	private platform: Platform,
	private api: BellovacomService,
	public popoverController: PopoverController,
	public loadingController: LoadingController,
	){
	this.key = 'AIzaSyAO-tADyFTG9UOEj3Y2UgLGQLmYksFbzPI';

}
ngOnInit(){
	this.to = 'fr';
	this.api.getCarte().subscribe(data=>{
		this.carte = data;
		this.idx = 1000;
		this.ido = this.carte['a'+this.idx.toString()];
		this.currentLangage = 'fr-FR';
		this.platform.ready().then(() => {
      	this.tts.speak({text:'Faites un double touches pour écouter les consignes',rate:ratio,locale:this.to})
      		.then(()=>{
		    				this.tts.speak({text:this.ido,rate:ratio,locale:this.to})
		  						.then(() => console.log('Success'))
		  						.catch((reason: any) => console.log(reason))
		    			});
    	});
	})
}

async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      componentProps: {
        custom_id: this.value
      }
    });
    const loading = await this.loadingController.create({});
    await popover.present();
    popover.onDidDismiss().then(data1=>{
    	if(data1.data){
    		loading.present().then(()=>{
    			this.api.getCarteId(data1.data).subscribe(data=>{
    				loading.dismiss();
					this.carte = data;
					this.idx = 1000;
					console.log(this.carte);
					this.ido = this.carte['a'+this.idx.toString()];
					this.currentLangage = 'fr-FR';
					this.platform.ready().then(() => {
		    		this.tts.speak({text:'Faites un double touches pour écouter les consignes',rate:ratio,locale:this.to})
		    			.then(()=>{
		    				this.tts.speak({text:this.ido,rate:ratio,locale:this.to})
		  						.then(() => console.log('Success'))
		  						.catch((reason: any) => console.log(reason))
		    			})
		    		});
				})
    		})
    		
    	}
    })
  }	
downloadCarte(refCarte){
this.openPopover(this.value);
}
changeLangue(ido,to,currentLangage){
	if(this.ido){
		if(to=='fr'){
			this.googleObj = {
				'q':ido,
				'source' : currentLangage,
				'target' : to
			}
		}
		else{
			this.googleObj = {
				'q':ido,
				'source' : 'fr',
				'target' : to
			}
		}
		this._google.translate(this.googleObj, this.key).subscribe(
      		(res: any) => {
        		this.result = res.data.translations[0].translatedText;
        		this.ido = this.result;
        		this.currentLangage = to;
        		this.tts.speak({text:this.result,rate:ratio,locale:to})
  			.then(() => console.log('Success'))
  			.catch((reason: any) => console.log(reason));
      		},
      			err => {
        		console.log(err);
      			}
    		);
	}	
}
gotoHaut(to,currentLangage,idoBck){
	this.idxBck = this.idx;
	this.idx = Math.trunc(this.idx / 10);
	this.updateComponent(to,currentLangage,idoBck);
}
gotoBas(to,currentLangage,idoBck){
	this.idxBck = this.idx;
	this.idx = this.idx*10;
	this.updateComponent(to,currentLangage,idoBck);
}
gotoGauche(to, currentLangage, idoBck){
	this.idxBck = this.idx;
	this.idx = this.idx + 1;
	this.updateComponent(to,currentLangage,idoBck);
}
gotoDroite(to, currentLangage,idoBck){
	this.idxBck = this.idx;
	this.idx = this.idx - 1;
	this.updateComponent(to,currentLangage,idoBck);
}
goScribe(e,ido,to){
	if (!to){
		to = 'fr'
	}
	if(e.tapCount===1){
	this.tts.speak({text:ido,rate:ratio,locale:to})
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
	}
	else if(e.tapCount===2){
	this.tts.speak({text:consignes,rate:1.4,locale:to})
  		.then(() => console.log('succes')
			)
  .catch((reason: any) => console.log(reason));
	}
}
reInit(){
	this.to = 'fr';
	this.idx = 1000;
	this.ido = this.carte['a'+this.idx.toString()];
	this.currentLangage = 'fr-FR';
	this.platform.ready().then(() => {
      	this.tts.speak({text:'Remise à zéro effectuée, Faites un double touches pour écouter les consignes',rate:ratio,locale:this.to})
      	.then(()=>{
      		this.tts.speak({text:this.ido,rate:ratio,locale:this.to})
  			.then(() => console.log('Success'))
  			.catch((reason: any) => console.log(reason))
      	})
    	});
}
updateComponent(to,currentLangage,idoBck){
	this.ido = this.carte['a'+this.idx.toString()];
	//console.log('ido',this.ido);
	if(this.ido){
		if(to=='fr'){
			this.googleObj = {
				'q':this.ido,
				'source' : currentLangage,
				'target' : to
			}
		}
		else{
			this.googleObj = {
				'q':this.ido,
				'source' : 'fr',
				'target' : to
			}
		}
		//console.log('googleObj',this.googleObj);
		if(to!='fr'){
			this._google.translate(this.googleObj, this.key).subscribe(
      			(res: any) => {
        			this.result = res.data.translations[0].translatedText;
        			this.ido = this.result;
        			this.tts.speak({text:this.result,rate:ratio,locale:to})
  						.then(() => console.log('Success'))
  						.catch((reason: any) => console.log(reason));
      			},
      			err => {
        		console.log(err);
      			}
    		);
		}
		else{
			this.tts.speak({text:this.ido,rate:ratio,locale:to})
  				.then(() => console.log('Success'))
  				.catch((reason: any) => console.log(reason));
		}
	}
	else {
		this.idx=this.idxBck;
		this.ido = this.carte['a'+this.idx.toString()];
		//console.log('idx',this.idx,'ido',this.ido,'idoBck',idoBck);
		if(to!='fr'){
		this.googleObj = {
			'q':'Il n\'y a plus de rang',
			'source' : 'fr',
			'target' : to
		}
		//console.log('googleObj',this.googleObj);
			this._google.translate(this.googleObj, this.key).subscribe(
      			(res: any) => {
        			this.result = res.data.translations[0].translatedText;
        			this.ido = idoBck;
        			this.tts.speak({text:this.result,rate:ratio,locale:to})
  						.then(() => console.log('Success'))
  						.catch((reason: any) => console.log(reason));
      			},
      			err => {
        		console.log(err);
      			}
    		);
		}
		else{
			this.tts.speak({text:'Il n\'y a plus de rang',rate:ratio,locale:to})
  				.then(() => console.log('Success'))
  				.catch((reason: any) => console.log(reason));
		}
	}
}
}
