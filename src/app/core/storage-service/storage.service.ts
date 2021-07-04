import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage'


@Injectable({
    providedIn: 'root'
})
export class DataLocalService {
    constructor(private storage: Storage) {
        // this.getAll();
    }

}
