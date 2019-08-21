import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
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
  ////
  apiSearchResultsSubscription: Subscription;

  form = {
    area: {
      selected: null,
      options: [],
      optionsToShow: []
    },
    action: {
      selected: null,
      options: [],
      optionsToShow: []
    },
    object: {
      selected: null,
      options: [],
      optionsToShow: []
    },
    conditions: {
      selectedList: [],
      options: [],
      optionsToShow: []
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
  ) {
    this.apiSearchResultsSubscription = this.searchService.apiResultsSubject.subscribe(data => {
      if (data) {
        this.form.action.optionsToShow = [];
        this.form.object.optionsToShow = [];
        this.form.conditions.optionsToShow = [];
        setTimeout(function() {
          this.checkForSelectDisable(data);
        }.bind(this), 300);
      }
    });
  }

  public callApi() {
    // this.searchService.get_knowledgeContent_bySingleParam();
  }

  public callMultiParamsApiGet() {
    const areaName = this.form.area.selected && this.form.area.selected.name ? this.form.area.selected.name : null;
    const actionName =
      this.form.action.selected && this.form.action.selected.name ? this.form.action.selected.name : null;
    const objectName =
      this.form.object.selected && this.form.object.selected.name ? this.form.object.selected.name : null;

    this.searchService.get_knowledgeContent_byMultiParams(areaName, actionName, objectName);

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
      if (this.form.area.optionsToShow.length === 0) {
        this.form.area.optionsToShow = this.form.area.options;
      }
    });
    // Get Actions Tags Collection
    this.actionsCollection = this.afs.collection('action-tags', ref => ref.orderBy('name'));
    this.actionsItems = this.actionsCollection.valueChanges();
    this.actionsItemsSubscription = this.actionsItems.subscribe(snapshot => {
      this.form.action.options = snapshot as [];
      if (this.form.action.optionsToShow.length === 0) {
        this.form.action.optionsToShow = this.form.action.options;
      }
    });
    // Get Objects Tags Collection
    this.objectsCollection = this.afs.collection('object-tags', ref => ref.orderBy('name'));
    this.objectsItems = this.objectsCollection.valueChanges();
    this.objectsItemsSubscription = this.objectsItems.subscribe(snapshot => {
      this.form.object.options = snapshot as [];
      if (this.form.object.optionsToShow.length === 0) {
        this.form.object.optionsToShow = this.form.object.options;
      }
    });
    // Get Conditions Tags Collection
    this.conditionsCollection = this.afs.collection('condition-tags', ref => ref.orderBy('name'));
    this.conditionsItems = this.conditionsCollection.valueChanges();
    this.conditionsItemsSubscription = this.conditionsItems.subscribe(snapshot => {
      this.form.conditions.options = snapshot as [];
      if (this.form.conditions.optionsToShow.length === 0) {
        this.form.conditions.optionsToShow = this.form.conditions.options;
      }
    });
  }

  public clearAllSelection() {
    this.form.area.selected = null;
    this.form.action.selected = null;
    this.form.object.selected = null;
    this.form.conditions.selectedList = [];
    this.callMultiParamsApiGet();
  }

  public checkForSelectDisable(result) {
    const searchResultsFromApi: any = result as [];
    //
    this.form.object.optionsToShow = this.form.object.options.filter(function(item, index, array) {
      for (let k = 0; k < searchResultsFromApi.length; k++) {
        if (searchResultsFromApi[k].objectName === item.name) {
          return true;
        }
      }
      return false;
    });
    //
    this.form.action.optionsToShow = this.form.action.options.filter(function(item, index, array) {
      for (let l = 0; l < searchResultsFromApi.length; l++) {
        if (searchResultsFromApi[l].actionName === item.name) {
          return true;
        }
      }
      return false;
    });
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
    this.apiSearchResultsSubscription.unsubscribe();
  }
}
