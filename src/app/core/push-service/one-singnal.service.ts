import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { Storage as IonicStorage } from '@ionic/storage'
import { TEMP_DATA } from '../consts/viewInit';


@Injectable({
  providedIn: 'root'
})
export class OneSingnalService {

  messages: Array<OSNotification> = []
  temp: any;
  userId: string  = '';

  pushListener = new EventEmitter<OSNotification>();

  constructor(private oneSignal: OneSignal, private storage: IonicStorage) {
  }


  initialize() {
    this.oneSignal.startInit('2f557dad-20bb-4a07-a678-426ccaf1adea', '442950157319');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((receive) => {
      this.notificationReceived(receive);
    });

    this.oneSignal.handleNotificationOpened().subscribe(async (open) => {
      // do something when a notification is opened
      console.log('Open', open.notification);
      TEMP_DATA.NOTIFICATION = open.notification;
      await this.notificationReceived(open.notification);
    });

      //Get
      this.oneSignal.getIds().then(response=> {
        this.userId = response.userId;
      })

    this.oneSignal.endInit();
  }

  async notificationReceived(not: OSNotification) {
    debugger;
    this.getMessages();
    const payload = not.payload;
    const exist = this.messages.find(m => m.payload.notificationID === payload.notificationID);
    if (exist) {
      return;
    }
    this.messages.unshift(not);
    this.saveMessages();
    this.pushListener.emit(not);
  }

  saveMessages() {
    this.storage.set('messages', this.messages)
  }

  async getMessages() {
    this.messages = await this.storage.get('messages') || Array<OSNotification>();
    return this.messages;
  }

  async getNotificaitons() {
    await this.getMessages();
    return [...this.messages];
  }
}
