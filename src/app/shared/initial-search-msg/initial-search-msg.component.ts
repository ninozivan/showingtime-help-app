import { Component, OnInit } from '@angular/core';
import { UistatesService } from '../uistates.service';

@Component({
  selector: 'app-initial-search-msg',
  templateUrl: './initial-search-msg.component.html',
  styleUrls: ['./initial-search-msg.component.scss'],
})
export class InitialSearchMsgComponent implements OnInit {

  constructor(private uiStates: UistatesService) { }

  public callInitialQuickSearchModal() {
    this.uiStates.toggleStepSearchVisibility();
  }

  ngOnInit() {}

}
