import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.page.html',
  styleUrls: ['./create-content.page.scss'],
})
export class CreateContentPage implements OnInit, OnDestroy {
  // Areas tags
  private areasCollection: AngularFirestoreCollection<any>;
  areasItems: Observable<any>;
  areasItemsSubscription: any;
  areasItemsArrayList = [];
  // Actions tags
  private actionsCollection: AngularFirestoreCollection<any>;
  actionsItems: Observable<any>;
  actionsItemsSubscription: any;
  actionsItemsArrayList = [];
  // Objects tags
  private objectsCollection: AngularFirestoreCollection<any>;
  objectsItems: Observable<any>;
  objectsItemsSubscription: any;
  objectsItemsArrayList = [];
  // Conditions tags
  private conditionsCollection: AngularFirestoreCollection<any>;
  conditionsItems: Observable<any>;
  conditionsItemsSubscription: any;
  conditionsItemsArrayList = [];

  formName = '';
  formDescription = '';


  form = {
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



  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  private getDataFromApi() {
    // Get Areas Tags Collection
    this.areasCollection = this.afs.collection('area-tags', ref => ref.orderBy('name'));
    this.areasItems = this.areasCollection.valueChanges();
    this.areasItemsSubscription = this.areasItems.subscribe(snapshot => {
      // console.log('areas tags ', snapshot);
      this.form.area.options = snapshot as [];
    });
    // Get Actions Tags Collection
    this.actionsCollection = this.afs.collection('action-tags', ref => ref.orderBy('name'));
    this.actionsItems = this.actionsCollection.valueChanges();
    this.actionsItemsSubscription = this.actionsItems.subscribe(snapshot => {
      // console.log('action tags ', snapshot);
      this.form.action.options = snapshot as [];
    });
    // Get Objects Tags Collection
    this.objectsCollection = this.afs.collection('object-tags', ref => ref.orderBy('name'));
    this.objectsItems = this.objectsCollection.valueChanges();
    this.objectsItemsSubscription = this.objectsItems.subscribe(snapshot => {
      /// console.log('object tags ', snapshot);
      this.form.object.options = snapshot as [];
    });
    // Get Conditions Tags Collection
    this.conditionsCollection = this.afs.collection('condition-tags', ref => ref.orderBy('name'));
    this.conditionsItems = this.conditionsCollection.valueChanges();
    this.conditionsItemsSubscription = this.conditionsItems.subscribe(snapshot => {
      // console.log('condition tags ', snapshot);
      this.form.conditions.options = snapshot as [];
    });
  }

  // Add condition
  public addCondition() {
    const emptyCondition = {
      uid: null,
      name: null,
      description: null
    };
    this.form.conditions.selectedList.push(emptyCondition);
  }
  //
  public selectChanged(optionObject, index) {
    // console.log('event, ', optionObject);
    // console.log('before this.form.conditions.selectedList[index], ', this.form.conditions.selectedList[index]);
    this.form.conditions.selectedList[index] = optionObject;
    // console.log('after this.form.conditions.selectedList[index], ', this.form.conditions.selectedList[index]);
  }
  // Remove condition
  public removeCondition(index) {
    this.form.conditions.selectedList.splice(index, 1);
  }
  // Cancel changes
  public cancelChanges() {
    this.router.navigateByUrl('/content-administration');
  }
  // Save changes
  public saveChanges() {
    if (!this.isFormValid()) {
      return;
    }
    //
    this.presentLoading();
    //
    const idForItem = this.afs.createId();
    //
    const htmlEditorContent = JSON.stringify(this.form.editorData).replace(/(\r\n|\n|\\n|\r|\\r|\t|\\t)/gm, '');
    //
    const newItem = {
      uid: idForItem, // Content Uid
      areaUid: this.form.area.selected.uid, // Area Tag Uid
      areaName: this.form.area.selected.name, // Area Tag Name
      actionUid: this.form.action.selected.uid, // Action Tag Uid
      actionName: this.form.action.selected.name, // Action Tag Name
      objectUid: this.form.object.selected.uid, // Object Tag Uid
      objectName: this.form.object.selected.name, // Object Tag Name
      conditions: this.transformConditions(this.form.conditions.selectedList),
      //
      htmlContent: htmlEditorContent
    };
    this.afs.collection('knowledge-contents').doc(idForItem).set(newItem)
    .then(res => {
      console.log('save success');
      this.returnToPrevious();
    }).catch(err => {
      console.log('something went wrong ' + err);
      this.returnToPrevious();
    });
  }
  private transformConditions(inputConditionsList) {
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
  // Check Form valid
  private isFormValid() {
    const isValid = true;
    return isValid;
  }

  private returnToPrevious() {
    this.loadCtrl.dismiss();
    this.router.navigateByUrl('/content-administration');
  }

  ngOnInit() {
    this.getDataFromApi();
  }

  ngOnDestroy() {
    this.areasItemsSubscription.unsubscribe();
    this.actionsItemsSubscription.unsubscribe();
    this.objectsItemsSubscription.unsubscribe();
    this.conditionsItemsSubscription.unsubscribe();
  }

}
