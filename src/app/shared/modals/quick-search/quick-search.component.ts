import { Component, OnInit } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { UistatesService } from '../../uistates.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss'],
})
export class QuickSearchComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private uiStates: UistatesService) { }

  public closeModal() {
    this.uiStates.toggleStepSearchVisibility(false);
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {}

}
