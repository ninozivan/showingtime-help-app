import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { ApiService } from './api.service';
import { UistatesService } from '../uistates.service';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-step-searching',
  templateUrl: './step-searching.component.html',
  styleUrls: ['./step-searching.component.scss']
})
export class StepSearchingComponent implements OnInit, OnDestroy {
  private areasCollection: AngularFirestoreCollection<any>;
  areasItems: Observable<any>;
  areasItemsSubscription: any;
  areasItemsArrayList = [];
  // Actions tags
  private actionsCollection: AngularFirestoreCollection<any>;
  actionsItems: Observable<any>;
  actionsItemsSubscription: any;
  actionsItemsArrayList = [];
  // Objects tags
  private objectsCollection: AngularFirestoreCollection<any>;
  objectsItems: Observable<any>;
  objectsItemsSubscription: any;
  objectsItemsArrayList = [];
  // Conditions tags
  private conditionsCollection: AngularFirestoreCollection<any>;
  conditionsItems: Observable<any>;
  conditionsItemsSubscription: any;
  conditionsItemsArrayList = [];

  form = {
    area: {
      selected: null,
      options: []
    },
    action: {
      selected: null,
      options: []
    },
    object: {
      selected: null,
      options: []
    },
    conditions: {
      selectedList: [],
      options: []
    },
    refreshToggle: {
      state: false
    },
    editorData: '<p>Hello, world!</p>'
  };

  constructor(
    private searchService: ApiService,
    private router: Router,
    private afs: AngularFirestore,
    private loadCtrl: LoadingController,
    private activeRoute: ActivatedRoute,
    private uiStates: UistatesService,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {}

  public callApi() {
    // this.searchService.get_knowledgeContent_bySingleParam();
  }

  public callMultiParamsApiGet() {
    const areaName = this.form.area.selected && this.form.area.selected.name ? this.form.area.selected.name : null;
    const actionName = this.form.action.selected && this.form.action.selected.name ? this.form.action.selected.name : null;
    const objectName = this.form.object.selected && this.form.object.selected.name ? this.form.object.selected.name : null;

    this.searchService.get_knowledgeContent_byMultiParams(
      areaName,
      actionName,
      objectName
    );

    if (this.uiStates.getStepSearchState()) {
      this.modalCtrl.dismiss({
        dismissed: true
      });
      this.uiStates.toggleStepSearchVisibility(false);
    }

  }

  public anySelectChanged() {
    if (this.form.refreshToggle.state === true) {
      this.callMultiParamsApiGet();
    }
  }

  private getDataFromApi() {
    // Get Areas Tags Collection
    this.areasCollection = this.afs.collection('area-tags', ref => ref.orderBy('name'));
    this.areasItems = this.areasCollection.valueChanges();
    this.areasItemsSubscription = this.areasItems.subscribe(snapshot => {
      this.form.area.options = snapshot as [];
    });
    // Get Actions Tags Collection
    this.actionsCollection = this.afs.collection('action-tags', ref => ref.orderBy('name'));
    this.actionsItems = this.actionsCollection.valueChanges();
    this.actionsItemsSubscription = this.actionsItems.subscribe(snapshot => {
      this.form.action.options = snapshot as [];
    });
    // Get Objects Tags Collection
    this.objectsCollection = this.afs.collection('object-tags', ref => ref.orderBy('name'));
    this.objectsItems = this.objectsCollection.valueChanges();
    this.objectsItemsSubscription = this.objectsItems.subscribe(snapshot => {
      this.form.object.options = snapshot as [];
    });
    // Get Conditions Tags Collection
    this.conditionsCollection = this.afs.collection('condition-tags', ref => ref.orderBy('name'));
    this.conditionsItems = this.conditionsCollection.valueChanges();
    this.conditionsItemsSubscription = this.conditionsItems.subscribe(
      snapshot => {
        this.form.conditions.options = snapshot as [];
      }
    );
  }

  public clearAllSelection() {
    this.form.area.selected = null;
    this.form.action.selected = null;
    this.form.object.selected = null;
    this.form.conditions.selectedList = [];
    this.callMultiParamsApiGet();
  }

  ngOnInit() {
    const screenWidth = this.platform.width();
    if (screenWidth && screenWidth < 992) {
      this.form.refreshToggle.state = false;
    } else {
      this.form.refreshToggle.state = true;
    }
    this.getDataFromApi();
  }

  ngOnDestroy() {
    this.areasItemsSubscription.unsubscribe();
    this.actionsItemsSubscription.unsubscribe();
    this.objectsItemsSubscription.unsubscribe();
    this.conditionsItemsSubscription.unsubscribe();
  }
}
