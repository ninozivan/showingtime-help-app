import { Component, OnInit } from '@angular/core';
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
export class TagsListPage implements OnInit {
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

    console.log('tagTypeFromRouteParam: ', this.tagTypeFromRouteParam);

    this.itemsCollection = this.afs.collection(this.tagTypeFromRouteParam);

    this.items = this.itemsCollection.valueChanges();
    this.itemsSubscription = this.items.subscribe(snapshot => {
      console.log(snapshot);
      this.itemsArrayList = snapshot as [];
      this.appVars.viewState =
        this.itemsArrayList.length > 0
          ? this.appVars.viewStateEnums.listExist
          : this.appVars.viewStateEnums.listEmpty;
    });
    console.log('items ', this.items);
  }

  routeIsValid(inputRoute) {
    let isvalid = false;
    switch (inputRoute) {
      case this.appVars.tagTypes.area:
        isvalid = true;
        this.appVars.pageTitle = 'Area';
        break;
      case this.appVars.tagTypes.action:
        isvalid = true;
        this.appVars.pageTitle = 'Action';
        break;
      case this.appVars.tagTypes.object:
        isvalid = true;
        this.appVars.pageTitle = 'Object';
        break;
      case this.appVars.tagTypes.condition:
        isvalid = true;
        this.appVars.pageTitle = 'Condition';
        break;
      default:
        isvalid = false;
    }
    return isvalid;
  }

  public editItem(inputItem) {
    console.log(' inputItem ', inputItem);
    if (!inputItem.uid) {
      return;
    }
    this.router.navigateByUrl('/tags-administration/' + this.tagTypeFromRouteParam + '/' + inputItem.uid);
  }

  public deleteItem(inputItem) {
    console.log(' inputItem ', inputItem);
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
        console.log('save success');
        this.loadCtrl.dismiss();
      })
      .catch(err => {
        console.log('something went wrong ' + err);
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

    console.log('Loading dismissed!');
  }

  ngOnInit() {
    this.getData();
  }
}
