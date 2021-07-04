import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class OneSingnalService {

  messages: Array<OSNotification> = []

  constructor(private oneSignal: OneSignal) { 

  }

  initialize(){
    this.oneSignal.startInit('2f557dad-20bb-4a07-a678-426ccaf1adea', '442950157319');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationReceived().subscribe((receive) => {
     // do something when notification is received
     console.log('Llego', receive);
     this.notificationReceived(receive);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((open) => {
      // do something when a notification is opened
      console.log('Open', open);
    });
    
    this.oneSignal.endInit();
  }

  notificationReceived(not: OSNotification){
    debugger;
      const payload = not.payload;
      const exist = this.messages.find(m=> m.payload.notificationID === payload.notificationID);
      if(exist){
        return;
      }
      this.messages.push(not);
  }

  getNotificaitons (){
    return this.messages;
  }
}
