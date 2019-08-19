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
  selector: 'app-content-administration',
  templateUrl: './content-administration.page.html',
  styleUrls: ['./content-administration.page.scss'],
})
export class ContentAdministrationPage implements OnInit, OnDestroy {
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
    pageTitle: ''
  };
  //

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private loadCtrl: LoadingController
  ) {}


  public getData() {
    this.itemsCollection = this.afs.collection('knowledge-contents', ref => ref.orderBy('areaName'));

    this.items = this.itemsCollection.valueChanges();
    this.itemsSubscription = this.items.subscribe(snapshot => {
      // console.log(snapshot);
      this.itemsArrayList = snapshot as [];
      this.appVars.viewState =
        this.itemsArrayList.length > 0
          ? this.appVars.viewStateEnums.listExist
          : this.appVars.viewStateEnums.listEmpty;
    });
    // console.log('items ', this.items);
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

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

}
