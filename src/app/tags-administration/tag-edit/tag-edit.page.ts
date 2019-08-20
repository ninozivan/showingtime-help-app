import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class TagEditPage implements OnInit, OnDestroy {

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
    if (!this.isFormValid() || !this.routeIsValid(this.tagTypeFromRouteParam)) {
      return;
    }

    this.presentLoading();

    const idForItem = this.afs.createId();
    this.afs.collection(this.tagTypeFromRouteParam).doc(this.tagUidFromRouteParam).update({name: this.formName, description: this.formDescription})
    .then(res => {
      this.returnToPrevious();
    }).catch(err => {
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
    this.getDataFromApi();
  }

  private getDataFromApi() {
    this.itemsCollection = this.afs.collection(this.tagTypeFromRouteParam);
    this.itemsCollection.doc(this.tagUidFromRouteParam).ref.get()
    .then(document => {
      if (document) {
        this.formName = this.returnTagName(document);
        this.formDescription = document.data().description;
      } else {
        this.returnToPrevious();
      }
    }).catch(err => {
      this.returnToPrevious();
    });
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

  ngOnDestroy() {

  }

}
