import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag-create.page.html',
  styleUrls: ['./tag-create.page.scss'],
})
export class TagCreatePage implements OnInit {

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

  constructor(private router: Router, private afs: AngularFirestore, private loadCtrl: LoadingController, private activeRoute: ActivatedRoute) { }

  public cancelChanges() {
    this.router.navigateByUrl('/tags-administration');
  }

  public saveChanges() {
    // console.log('save changes');
    if (!this.isFormValid() || !this.routeIsValid(this.tagTypeFromRouteParam)) {
      return;
    }

    this.presentLoading();

    const idForItem = this.afs.createId();
    const newObject = {
      uid: idForItem,
      type: this.returnTagType(),
      name: this.formName,
      description: this.formDescription
    };

    this.afs.collection(this.tagTypeFromRouteParam).doc(idForItem).set(newObject)
    .then(res => {
      // console.log('save success');
      this.clearForm();
      this.returnToPrevious();
    }).catch(err => {
      console.log('something went wrong ' + err);
      this.clearForm();
      this.returnToPrevious();
    });

    // this.afs.collection(this.tagTypeFromRouteParam).ref.add({name: 'adlfjaldf', desc: ' d9d9d99d9d9d'})
    // .then(res => {
    //   console.log('save success');
    //   this.returnToPrevious();
    // }).catch(err => {
    //   console.log('something went wrong ' + err);
    //   this.returnToPrevious();
    // });
  }

  private clearForm() {
    this.formName = '';
    this.formDescription = '';
  }

  private returnTagType() {
    let returnValue = null;
    switch (this.tagTypeFromRouteParam) {
      case this.appVars.tagTypes.area:
        returnValue = 'tag-area';
        break;
      case this.appVars.tagTypes.action:
          returnValue = 'tag-action';
          break;
      case this.appVars.tagTypes.object:
          returnValue = 'tag-object';
          break;
      case this.appVars.tagTypes.condition:
        returnValue = 'tag-condition';
        break;
    }
    return returnValue;
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
    if (!this.routeIsValid(this.tagTypeFromRouteParam)) {
      this.returnToPrevious();
      return;
    }
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
