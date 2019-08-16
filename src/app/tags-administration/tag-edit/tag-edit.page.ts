import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.page.html',
  styleUrls: ['./tag-edit.page.scss'],
})
export class TagEditPage implements OnInit {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];

  formName = '';
  formDescription = '';

  appVars = {
    tagTypes: {
      area: 'area-tags',
      action: 'action-tags',
      object: 'object-tags',
      condition: 'condition-tags'
    },
    pageTitle: ''
  };

  tagTypeFromRouteParam = '';
  tagUidFromRouteParam = '';

  constructor(private router: Router, private afs: AngularFirestore, private loadCtrl: LoadingController, private activeRoute: ActivatedRoute) { }

  public cancelChanges() {
    this.router.navigateByUrl('/tags-administration/' + this.tagTypeFromRouteParam);
  }

  public saveChanges() {
    // console.log('save changes');
    if (!this.isFormValid() || !this.routeIsValid(this.tagTypeFromRouteParam)) {
      return;
    }

    this.presentLoading();

    const idForItem = this.afs.createId();
    this.afs.collection(this.tagTypeFromRouteParam).doc(this.tagUidFromRouteParam).update({name: this.formName, description: this.formDescription})
    .then(res => {
      // console.log('save success');
      this.returnToPrevious();
    }).catch(err => {
      console.log('something went wrong ' + err);
      this.returnToPrevious();
    });
  }

  private returnToPrevious() {
    this.loadCtrl.dismiss();
    this.router.navigateByUrl('/tags-administration/' + this.tagTypeFromRouteParam);
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
  private isFormValid() {
    let isValid = false;
    isValid = !!this.formName;
    isValid = !!this.formDescription;
    return isValid;
  }

  private getUrlParam() {
    this.tagTypeFromRouteParam = this.activeRoute.snapshot.paramMap.get('tag-type');
    this.tagUidFromRouteParam = this.activeRoute.snapshot.paramMap.get('tag-uid');
    // console.log(' this.tagTypeFromRouteParam ', this.tagTypeFromRouteParam);
    this.getDataFromApi();
  }

  private getDataFromApi() {
    // console.log(' getDataFromApi ');
    this.itemsCollection = this.afs.collection(this.tagTypeFromRouteParam);
    this.itemsCollection.doc(this.tagUidFromRouteParam).ref.get()
    .then(document => {
      // console.log(' getDataFromApi  SUCCESS');
      if (document) {
        // console.log(' document exist ', document.data());
        this.formName = this.returnTagName(document);
        this.formDescription = document.data().description;
      } else {
        // console.log('read failed document dont exist');
        this.returnToPrevious();
      }
    }).catch(err => {
      console.log('something went wrong ' + err);
      this.returnToPrevious();
    });
    // this.itemsCollection = this.afs.collection(this.tagTypeFromRouteParam);

    // this.items = this.itemsCollection.valueChanges();
    // this.itemsSubscription = this.items.subscribe(snapshot => {
    //   console.log(snapshot);
    //   this.itemsArrayList = snapshot as [];
    //   this.appVars.viewState =
    //     this.itemsArrayList.length > 0
    //       ? this.appVars.viewStateEnums.listExist
    //       : this.appVars.viewStateEnums.listEmpty;
    // });
  }

  private returnTagName(inputDocument) {
    let returnName = null;
    switch (this.tagTypeFromRouteParam) {
      case this.appVars.tagTypes.area:
        returnName = inputDocument.data().name;
        break;
      case this.appVars.tagTypes.action:
        returnName = inputDocument.data().name;
        break;
      case this.appVars.tagTypes.object:
        returnName = inputDocument.data().name;
        break;
      case this.appVars.tagTypes.condition:
        returnName = inputDocument.data().name;
        break;
    }
    return returnName;
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



  ngOnInit() {
    this.getUrlParam();
  }

}
