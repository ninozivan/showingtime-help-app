import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable, Subscription} from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { UistatesService } from '../shared/uistates.service';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../shared/step-searching/api.service';
import { SearchTutorialComponent } from '../shared/modals/search-tutorial/search-tutorial.component';
import { QuickSearchComponent } from '../shared/modals/quick-search/quick-search.component';

@Component({
  selector: 'app-content-administration',
  templateUrl: './content-administration.page.html',
  styleUrls: ['./content-administration.page.scss'],
})
export class ContentAdministrationPage implements OnInit, OnDestroy {
  serviceApiResultsSubscription: Subscription;
  uiStatesQuickSearchSubscription: Subscription;

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];
  //
  appVars = {
    viewState: 1,
    viewStateEnums: {
      isLoading: 1,
      listExist: 2,
      listEmpty: 3
    },
    pageTitle: '',
    lastSearchParams: null
  };
  //

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private loadCtrl: LoadingController,
    private apiService: ApiService, private modalCtrl: ModalController, private uiStates: UistatesService
  ) {
    this.serviceApiResultsSubscription = this.apiService.multiParamsQueryObservable.subscribe(
      data => {
        this.itemsArrayList = data as [];
        this.itemsArrayList.sort( this.sortArray );
        this.appVars.lastSearchParams = this.apiService.get_lastMultiParams_values();
        this.appVars.viewState = this.itemsArrayList.length > 0 ? this.appVars.viewStateEnums.listExist : this.appVars.viewStateEnums.listEmpty;
      },
      error => console.log('inside knowledge base subscription api error ', error)
    );
    this.uiStatesQuickSearchSubscription = this.uiStates.stepSearchVisibilitySubject.subscribe(data => {
      if (data && data === true) {
        this.openQuickSearchModal();
      }
    });
  }


  public getData() {
    this.itemsCollection = this.afs.collection('knowledge-contents', ref => ref.orderBy('areaName'));

    this.items = this.itemsCollection.valueChanges();
    this.itemsSubscription = this.items.subscribe(snapshot => {
      this.itemsArrayList = snapshot as [];
      this.appVars.viewState =
        this.itemsArrayList.length > 0
          ? this.appVars.viewStateEnums.listExist
          : this.appVars.viewStateEnums.listEmpty;
    });
  }

  private sortArray(a, b) {
    if ( a.areaName < b.areaName ) {
      return -1;
    }
    if ( a.areaName > b.areaName ) {
      return 1;
    }
    return 0;
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  public openContent(contentItem) {
    if (!contentItem) {
      return;
    }
    this.router.navigateByUrl('content-administration/edit-content/' + contentItem.uid);
  }

  async openQuickSearchModal() {
    const modal = await this.modalCtrl.create({
      cssClass: 'st-always-full-modal',
      component: QuickSearchComponent
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    if (this.uiStatesQuickSearchSubscription) {
      this.uiStatesQuickSearchSubscription.unsubscribe();
    }
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

}
