import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.page.html',
  styleUrls: ['./view-content.page.scss'],
})
export class ViewContentPage implements OnInit {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];

  contentItem = null;

  contentUidFromRouteParam = '';

  appVars = {
    pageTitle: '2324'
  };

  constructor(private router: Router, private afs: AngularFirestore, private loadCtrl: LoadingController, private activeRoute: ActivatedRoute) { }

  private getDataFromApi() {
    console.log(' getDataFromApi ');
    this.itemsCollection = this.afs.collection('knowledge-contents');
    this.itemsCollection.doc(this.contentUidFromRouteParam).ref.get()
    .then(document => {
      console.log(' getDataFromApi  SUCCESS');
      if (document) {

        console.log(' document exist ', document.data());
        this.contentItem = document.data();

      } else {
        console.log('read failed document dont exist');
      }
    }).catch(err => {
      console.log('something went wrong ' + err);
    });
  }

  private getUrlParam() {
    this.contentUidFromRouteParam = this.activeRoute.snapshot.paramMap.get('content-uid');
    this.getDataFromApi();
  }

  ngOnInit() {
    this.getUrlParam();
  }

}
