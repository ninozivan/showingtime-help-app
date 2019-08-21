import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.page.html',
  styleUrls: ['./edit-content.page.scss'],
})
export class EditContentPage implements OnInit, OnDestroy {

  contentUidFromRouteParam = '';
  ///
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];
  // All Areas
  private collectionAllAreas: AngularFirestoreCollection<any>;
  private areasCollectionObservable: Observable<any>;
  private areasCollectionSubscription: any;
  // All Actions
  private collectionAllActions: AngularFirestoreCollection<any>;
  private actionsCollectionObservable: Observable<any>;
  private actionsCollectionSubscription: any;
  // All Objects
  private collectionAllObjects: AngularFirestoreCollection<any>;
  private objectsCollectionObservable: Observable<any>;
  private objectsCollectionSubscription: any;
  // All Conditioins
  private collectionAllConditions: AngularFirestoreCollection<any>;
  private conditionsCollectionObservable: Observable<any>;
  private conditionsCollectionSubscription: any;

  formName = '';
  formDescription = '';

  retrievedObject: any = null;

  form = {
    title: '',
    area: {
      selected: null,
      options: []
    },
    action: {
      selected: null,
      options: []
    },
    object: {
      selected: null,
      options: []
    },
    conditions: {
      selectedList: [],
      options: []
    },
    editorData: '<p>Hello, world!</p>'
  };

  constructor(private router: Router, private afs: AngularFirestore, private loadCtrl: LoadingController, private activeRoute: ActivatedRoute) { }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  private getDataFromApi() {
    this.itemsCollection = this.afs.collection('knowledge-contents');
    this.itemsCollection.doc(this.contentUidFromRouteParam).ref.get()
    .then(document => {
      if (document) {
        this.retrievedObject = document.data();
        this.retrievedObject.conditions = this.transformConditionToSimpleProperties(this.retrievedObject.conditions);
        this.form.editorData = JSON.stringify(this.retrievedObject.htmlContent).replace(/(\r\n|\n|\\n|\r|\\r|\t|\\t|""|\\|"\\"|'')/gm, '');
        this.form.title = this.retrievedObject.title;
        this.getAllOptionsList();
      } else {
        this.returnToPrevious();
      }
    }).catch(err => {
      this.returnToPrevious();
    });
  }

  /* #region Get list of all Areas, Actions, Objects.. */
  private getAllOptionsList() {
    this.getListOfAllExisting_areas();
    this.getListOfAllExisting_actions();
    this.getListOfAllExisting_objects();
    this.getListOfAllExisting_conditions();
  }
  private getListOfAllExisting_areas() {
    this.collectionAllAreas = this.afs.collection('area-tags', ref => ref.orderBy('name'));
    this.areasCollectionObservable = this.collectionAllAreas.valueChanges();
    this.areasCollectionSubscription = this.areasCollectionObservable.subscribe(data => {
      this.form.area.options = data;
      this.form.area.selected = this.form.area.options.find((item) => {
        return item.uid === this.retrievedObject.areaUid;
      });
    });
  }
  private getListOfAllExisting_actions() {
    this.collectionAllActions = this.afs.collection('action-tags', ref => ref.orderBy('name'));
    this.actionsCollectionObservable = this.collectionAllActions.valueChanges();
    this.actionsCollectionSubscription = this.actionsCollectionObservable.subscribe(data => {
      this.form.action.options = data;
      this.form.action.selected = this.form.action.options.find((item) => {
        return item.uid === this.retrievedObject.actionUid;
      });
    });
  }
  private getListOfAllExisting_objects() {
    this.collectionAllObjects = this.afs.collection('object-tags', ref => ref.orderBy('name'));
    this.objectsCollectionObservable = this.collectionAllObjects.valueChanges();
    this.objectsCollectionSubscription = this.objectsCollectionObservable.subscribe(data => {
      this.form.object.options = data;
      this.form.object.selected = this.form.object.options.find((item) => {
        return item.uid === this.retrievedObject.objectUid;
      });
    });
  }
  private getListOfAllExisting_conditions() {
    this.collectionAllConditions = this.afs.collection('condition-tags', ref => ref.orderBy('name'));
    this.conditionsCollectionObservable = this.collectionAllConditions.valueChanges();
    this.conditionsCollectionSubscription = this.conditionsCollectionObservable.subscribe(data => {
      this.form.conditions.options = data;
      this.form.conditions.selectedList = this.retrievedObject.conditions;
    });
  }
  public conditionSelectChanged(optionObject, index) {
    this.form.conditions.selectedList[index] = this.form.conditions.options.find((item, index, array) => {
      if (item.uid && optionObject && optionObject.uid) {
        return item.uid === optionObject.uid;
      }
    });
  }
  public addCondition() {
    const emptyCondition = {
      uid: null,
      name: null,
      description: null
    };
    this.form.conditions.selectedList.push(emptyCondition);
  }
  public removeCondition(index) {
    this.form.conditions.selectedList.splice(index, 1);
  }
  /* #endregion Get list of all Areas, Actions, Objects.. */

  private getUrlParam() {
    this.contentUidFromRouteParam = this.activeRoute.snapshot.paramMap.get('content-uid');
    this.getDataFromApi();
  }

  private returnToPrevious() {
    this.loadCtrl.dismiss();
    this.router.navigateByUrl('/content-administration');
  }

  // Cancel changes
  public cancelChanges() {
    this.router.navigateByUrl('/content-administration');
  }
  // Save changes
  public saveChanges() {
    if (!this.isFormValid() && !this.contentUidFromRouteParam ) {
      return;
    }
    //
    this.presentLoading();
    //
    const htmlEditorContent = JSON.stringify(this.form.editorData).replace(/(\r\n|\n|\\n|\r|\\r|\t|\\t)/gm, '');
    //
    const updatedObject = {
      areaUid: this.form.area.selected.uid, // Area Tag Uid
      areaName: this.form.area.selected.name, // Area Tag Name
      actionUid: this.form.action.selected.uid, // Action Tag Uid
      actionName: this.form.action.selected.name, // Action Tag Name
      objectUid: this.form.object.selected.uid, // Object Tag Uid
      objectName: this.form.object.selected.name, // Object Tag Name
      conditions: this.transformConditionsToComplexName(this.form.conditions.selectedList),
      //
      htmlContent: htmlEditorContent
    };
    this.afs.collection('knowledge-contents').doc(this.contentUidFromRouteParam).update(updatedObject)
    .then(res => {
      console.log('UPDATE success');
      this.returnToPrevious();
    }).catch(err => {
      console.log('something went wrong ' + err);
      this.returnToPrevious();
    });
  }

  private isFormValid() {
    const isValid = true;
    return isValid;
  }

  private transformConditionsToComplexName(inputConditionsList) {
    const returnList = [];
    for (let a = 0; a < inputConditionsList.length; a++) {
      const tempObj = {
        conditionUid: inputConditionsList[a].uid,
        conditionName: inputConditionsList[a].name,
        conditionDescription: inputConditionsList[a].description
      };
      returnList.push(tempObj);
    }
    return returnList;
  }

  private transformConditionToSimpleProperties(inputConditionsList) {
    const returnList = [];
    for (let a = 0; a < inputConditionsList.length; a++) {
      const tempObj = {
        uid: inputConditionsList[a].conditionUid,
        name: inputConditionsList[a].conditionName,
        description: inputConditionsList[a].conditionDescription
      };
      returnList.push(tempObj);
    }
    return returnList;
  }

  ngOnInit() {
    this.getUrlParam();
  }
  ngOnDestroy() {
    this.areasCollectionSubscription.unsubscribe();
    this.actionsCollectionSubscription.unsubscribe();
    this.objectsCollectionSubscription.unsubscribe();
    this.conditionsCollectionSubscription.unsubscribe();
  }

}
