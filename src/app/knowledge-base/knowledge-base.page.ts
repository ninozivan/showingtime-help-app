import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { map, take, first,  } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/step-searching/api.service';
import { UistatesService } from '../shared/uistates.service';
import { ModalController, Platform } from '@ionic/angular';
import { SearchTutorialComponent } from '../shared/modals/search-tutorial/search-tutorial.component';
import { QuickSearchComponent } from '../shared/modals/quick-search/quick-search.component';

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.page.html',
  styleUrls: ['./knowledge-base.page.scss']
})
export class KnowledgeBasePage implements OnInit, OnDestroy {
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  //
  serviceApiResultsSubscription: Subscription;
  uiStatesQuickSearchSubscription: Subscription;

  private itemsCollection: AngularFirestoreCollection<any>;

  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];
  //
  appVars = {
    showLeftColumn: false,
    viewState: 4,
    viewStateEnums: {
      isLoading: 1,
      listExist: 2,
      listEmpty: 3,
      initialLoad: 4
    },
    isSearchVisibleOnSmDown: true,
    lastSearchParams: null
  };

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private uiStates: UistatesService,
    private platform: Platform
  ) {
    this.serviceApiResultsSubscription = this.apiService.multiParamsQueryObservable.subscribe(
      data => {
        this.itemsArrayList = data as [];
        this.itemsArrayList.sort(this.sortByAreaAndAction);
        // console.log('this.itemsArrayList ', this.itemsArrayList);
        this.appVars.lastSearchParams = this.apiService.get_lastMultiParams_values();
        this.appVars.viewState =
          this.itemsArrayList.length > 0
            ? this.appVars.viewStateEnums.listExist
            : this.appVars.viewStateEnums.listEmpty;
      },
      error => console.log('inside knowledge base subscription api error ', error)
    );

    this.uiStatesQuickSearchSubscription = this.uiStates.stepSearchVisibilitySubject.subscribe(data => {
      if (data && data === true) {
        this.openQuickSearchModal();
      }
    });
  }

  // public getData() {
  //   this.itemsCollection = this.afs.collection('knowledge-contents', ref => ref.orderBy('areaName'));
  //   this.items = this.itemsCollection.valueChanges();
  //   //
  //   this.itemsSubscription = this.items.subscribe(snapshot => {
  //     this.itemsArrayList = snapshot as [];
  //     this.appVars.viewState = this.itemsArrayList.length > 0 ? this.appVars.viewStateEnums.listExist : this.appVars.viewStateEnums.listEmpty;
  //   });
  // }

  public openContent(contentItem) {
    if (!contentItem) {
      return;
    }
    this.router.navigateByUrl('knowledge-base/' + contentItem.uid);
  }

  private sortByAreaAndAction(itemA, itemB) {
    if (itemA.areaName > itemB.areaName) {
      return 1;
    }
    if (itemA.areaName < itemB.areaName) {
      return -1;
    }
    //
    if (itemA.actionName > itemB.actionName) {
      return 1;
    }
    if (itemA.actionName < itemB.actionName) {
      return -1;
    }
  }

  async openSearchTutorial() {
    const modal = await this.modalCtrl.create({
      cssClass: 'st-always-full-modal',
      component: SearchTutorialComponent
    });
    return await modal.present();
  }

  async openQuickSearchModal() {
    const modal = await this.modalCtrl.create({
      cssClass: 'st-always-full-modal',
      component: QuickSearchComponent
    });
    return await modal.present();
  }

  public checkIfResolutionIsRight() {
    if (this.platform && this.platform.width() > 768) {
      this.appVars.showLeftColumn = true;
    } else {
      this.appVars.showLeftColumn = false;
    }
  }

  ngOnInit() {
    // this.getData();
    this.checkIfResolutionIsRight();
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.checkIfResolutionIsRight();
    });
  }

  ngOnDestroy() {
    if (this.serviceApiResultsSubscription) {
      this.serviceApiResultsSubscription.unsubscribe();
    }
    if (this.uiStatesQuickSearchSubscription) {
      this.uiStatesQuickSearchSubscription.unsubscribe();
    }
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
    if (this.resizeSubscription$) {
      this.resizeSubscription$.unsubscribe();
    }
  }
}
