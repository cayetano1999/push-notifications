import { Component, DoCheck, OnInit } from '@angular/core';
import { OSNotification } from '@ionic-native/onesignal/ngx';
import { OneSingnalService } from '../core/push-service/one-singnal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, DoCheck {

  notifications: Array<OSNotification> = [];

  constructor(private pushService: OneSingnalService) {}
  ngDoCheck(): void {
    this.notifications = this.pushService.getNotificaitons();

  }

  ngOnInit(){
    this.notifications = this.pushService.getNotificaitons();
  }

}
