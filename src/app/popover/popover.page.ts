import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
passedId = null;
codeCarte;
  constructor(
  	private navParams: NavParams,
  	private popoverController: PopoverController,
  	private barcodeScanner: BarcodeScanner,
  	) { }

   ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }
   closePopover() {
    this.popoverController.dismiss(this.codeCarte);
  }
  flash(){
  	this.barcodeScanner.scan().then(barcodeData => {
		if(!barcodeData.cancelled){
 			this.popoverController.dismiss(barcodeData.text);
    	}
	}, (err) => {
    console.log('dismiss');
  	});
  }

}
