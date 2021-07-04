import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class OneSingnalService {

  constructor(private oneSignal: OneSignal) { 

  }

  initialize(){
    this.oneSignal.startInit('2f557dad-20bb-4a07-a678-426ccaf1adea', '442950157319');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe((receive) => {
     // do something when notification is received
     console.log('Llego', receive)
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((open) => {
      // do something when a notification is opened
      console.log('Open', open);
    });
    
    this.oneSignal.endInit();
  }
}
