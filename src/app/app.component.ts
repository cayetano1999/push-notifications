import { Component } from '@angular/core';
import { OneSingnalService } from './core/push-service/one-singnal.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private oneSingnalService: OneSingnalService) {
    this.initialize();
  }


  initialize(){
    this.oneSingnalService.initialize();
  }
}

