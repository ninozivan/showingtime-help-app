import { Component, OnInit } from '@angular/core';
import { UistatesService } from '../uistates.service';

@Component({
  selector: 'app-knowledge-searchbar',
  templateUrl: './knowledge-searchbar.component.html',
  styleUrls: ['./knowledge-searchbar.component.scss'],
})
export class KnowledgeSearchbarComponent implements OnInit {


  constructor(private uiStates: UistatesService) { }

  public showQuickSearch() {
    this.uiStates.toggleStepSearchVisibility();
  }

  ngOnInit() {}

}
