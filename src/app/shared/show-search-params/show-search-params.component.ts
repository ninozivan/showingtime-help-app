import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-show-search-params',
  templateUrl: './show-search-params.component.html',
  styleUrls: ['./show-search-params.component.scss'],
})
export class ShowSearchParamsComponent implements OnInit, OnChanges {
  @Input() inputParamsObject = null;

  constructor() { }

  ngOnChanges() {
  }

  ngOnInit() {
  }

}
