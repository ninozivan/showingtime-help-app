import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.page.html',
  styleUrls: ['./tags-list.page.scss']
})
export class TagsListPage implements OnInit, OnDestroy {
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
    tagTypes: {
      area: 'area-tags',
      action: 'action-tags',
      object: 'object-tags',
      condition: 'condition-tags'
    },
    pageTitle: ''
  };
  //
  tagTypeFromRouteParam = '';

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private loadCtrl: LoadingController
  ) {}

  public createNewTag() {
    if (!this.routeIsValid(this.tagTypeFromRouteParam)) {
      return;
    }
    this.router.navigateByUrl('tags-create/' + this.tagTypeFromRouteParam);
  }

  public getData() {
    this.tagTypeFromRouteParam = this.activeRoute.snapshot.paramMap.get(
      'tag-type'
    );
    if (!this.routeIsValid(this.tagTypeFromRouteParam)) {
      return;
    }

    this.itemsCollection = this.afs.collection(this.tagTypeFromRouteParam);

    this.items = this.itemsCollection.valueChanges();
    this.itemsSubscription = this.items.subscribe(snapshot => {
      this.itemsArrayList = snapshot as [];
      this.appVars.viewState =
        this.itemsArrayList.length > 0
          ? this.appVars.viewStateEnums.listExist
          : this.appVars.viewStateEnums.listEmpty;
    });
  }

  routeIsValid(inputRoute) {
    let isvalid = false;
    switch (inputRoute) {
      case this.appVars.tagTypes.area:
        isvalid = true;
        this.appVars.pageTitle = 'Areas';
        break;
      case this.appVars.tagTypes.action:
        isvalid = true;
        this.appVars.pageTitle = 'Actions';
        break;
      case this.appVars.tagTypes.object:
        isvalid = true;
        this.appVars.pageTitle = 'Objects';
        break;
      case this.appVars.tagTypes.condition:
        isvalid = true;
        this.appVars.pageTitle = 'Conditions';
        break;
      default:
        isvalid = false;
    }
    return isvalid;
  }

  public editItem(inputItem) {
    if (!inputItem.uid) {
      return;
    }
    this.router.navigateByUrl(
      '/tags-administration/' + this.tagTypeFromRouteParam + '/' + inputItem.uid
    );
  }

  public deleteItem(inputItem) {
    this.tagTypeFromRouteParam = this.activeRoute.snapshot.paramMap.get(
      'tag-type'
    );
    if (!this.routeIsValid(this.tagTypeFromRouteParam) || !inputItem.uid) {
      return;
    }
    this.presentLoading();

    this.itemsCollection = this.afs.collection(this.tagTypeFromRouteParam);

    this.itemsCollection
      .doc(inputItem.uid)
      .delete()
      .then(res => {
        this.loadCtrl.dismiss();
      })
      .catch(err => {
        this.loadCtrl.dismiss();
      });
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  public returnTagName(inputTagItem) {
    let returnName = null;
    if (inputTagItem && inputTagItem.name) {
      returnName = inputTagItem.name;
    } else if (inputTagItem && inputTagItem.name) {
      returnName = inputTagItem.name;
    } else if (inputTagItem && inputTagItem.name) {
      returnName = inputTagItem.name;
    } else if (inputTagItem && inputTagItem.name) {
      returnName = inputTagItem.name;
    }
    return returnName;
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
}
