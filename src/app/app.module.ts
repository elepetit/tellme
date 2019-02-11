import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BellovacomService } from './bellovacom.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicGestureConfig } from "./gestures/ionic-gesture-config";
import * as Hammer from 'hammerjs';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { PopoverPageModule } from './popover/popover.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
//import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      // override hammerjs default configuration
      'swipe': { direction: Hammer.DIRECTION_ALL  },
      'press': { time: 1000  },
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, PopoverPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    BellovacomService,
    TextToSpeech,
    BarcodeScanner,
    //SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig 
        },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
