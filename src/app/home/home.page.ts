import { ApplicationRef, Component, DoCheck, OnInit } from '@angular/core';
import { OSNotification } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { TEMP_DATA } from '../core/consts/viewInit';
import { OneSingnalService } from '../core/push-service/one-singnal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, DoCheck {

  notifications: Array<OSNotification> = [];

  constructor(public pushService: OneSingnalService, private appref: ApplicationRef, private storage: Storage) {

  }
  ngDoCheck(): void {
    //
  }

  async ngOnInit() {
    this.storage.create();
    this.notifications = await this.pushService.getNotificaitons();
    this.pushService.pushListener.subscribe(response => {
      this.notifications.unshift(response);
      this.appref.tick();

    });

    if (TEMP_DATA.NOTIFICATION != null) {
      this.notifications.unshift(TEMP_DATA.NOTIFICATION as OSNotification);
      await this.storage.set('messages', this.notifications);
      TEMP_DATA.NOTIFICATION = null;
    }
  }

  async ionViewWillEnter() {
    this.notifications = await this.pushService.getNotificaitons();
  }
}
