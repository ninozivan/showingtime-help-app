import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../../shared/step-searching/api.service';

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
    helpSlider: {
      activeIndex: 0
    }
  };

  form = {
    lastSearchTags: [],
    pageTitle: '',
    articleTitle: '',
    articleContent: ''
  };

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 40,
  };

  constructor(private router: Router, private afs: AngularFirestore, private loadCtrl: LoadingController, private activeRoute: ActivatedRoute, private apiService: ApiService) { }

  private getDataFromApi() {
    this.itemsCollection = this.afs.collection('knowledge-contents', ref => ref.orderBy('areaName'));
    this.itemsCollection.doc(this.contentUidFromRouteParam).ref.get()
    .then(document => {
      if (document) {
        this.contentItem = document.data();
        this.form.articleContent = JSON.stringify(this.contentItem.htmlContent).replace(/(\r\n|\n|\\n|\r|\\r|\t|\\t|""|\\|"\\"|'')/gm, '');
        this.form.articleTitle = this.contentItem.title ? this.contentItem.title : '';
        this.form.pageTitle = this.contentItem.areaName ? this.contentItem.areaName : 'Article';
        this.prepareLastSearchTags();
      } else {
        console.log('read failed document dont exist');
      }
    }).catch(err => {
      console.log('something went wrong ' + err);
    });
  }

  private prepareLastSearchTags() {
    const lastSearchObj = this.apiService.get_lastMultiParams_values();
    if (lastSearchObj.areaName) {
      this.form.lastSearchTags.push(lastSearchObj.areaName);
    }
    if (lastSearchObj.actionName) {
      this.form.lastSearchTags.push(lastSearchObj.actionName);
    }
    if (lastSearchObj.objectName) {
      this.form.lastSearchTags.push(lastSearchObj.objectName);
    }
    if (lastSearchObj.conditions && lastSearchObj.conditions.length && lastSearchObj.conditions.length > 0) {
      for (let a = 0; a < lastSearchObj.conditions.length; a++) {
        this.form.lastSearchTags.push(lastSearchObj.conditions[a].name);
      }
    }
  }

  private getUrlParam() {
    this.contentUidFromRouteParam = this.activeRoute.snapshot.paramMap.get('content-uid');
    this.getDataFromApi();
  }

  public slideChanged(event) {
    this.appVars.helpSlider.activeIndex = event.target.swiper.activeIndex;
  }

  public goToSlide(elReference, nextIndex) {
    if (elReference && elReference.el && elReference.el.swiper) {
      elReference.el.swiper.slideTo(nextIndex);
    }
  }

  ngOnInit() {
    this.getUrlParam();
  }

}
