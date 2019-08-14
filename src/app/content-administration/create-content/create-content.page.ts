import { Component, OnInit } from '@angular/core';
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
export class CreateContentPage implements OnInit {
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
    this.areasCollection = this.afs.collection('area-tags');
    this.areasItems = this.areasCollection.valueChanges();
    this.areasItemsSubscription = this.areasItems.subscribe(snapshot => {
      console.log('areas tags ', snapshot);
      this.form.area.options = snapshot as [];
    });
    // Get Actions Tags Collection
    this.actionsCollection = this.afs.collection('action-tags');
    this.actionsItems = this.actionsCollection.valueChanges();
    this.actionsItemsSubscription = this.actionsItems.subscribe(snapshot => {
      console.log('action tags ', snapshot);
      this.form.action.options = snapshot as [];
    });
    // Get Objects Tags Collection
    this.objectsCollection = this.afs.collection('object-tags');
    this.objectsItems = this.objectsCollection.valueChanges();
    this.objectsItemsSubscription = this.objectsItems.subscribe(snapshot => {
      console.log('object tags ', snapshot);
      this.form.object.options = snapshot as [];
    });
    // Get Conditions Tags Collection
    this.conditionsCollection = this.afs.collection('condition-tags');
    this.conditionsItems = this.conditionsCollection.valueChanges();
    this.conditionsItemsSubscription = this.conditionsItems.subscribe(snapshot => {
      console.log('condition tags ', snapshot);
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
    console.log('save changes');
    console.log(`area-selected: ${this.form.area.selected}, action-selected: ${this.form.action.selected}, object-selected: ${this.form.object.selected}, conditions-selected: ${this.form.conditions.selectedList.length}`);
    console.log('area obj', this.form.area.selected);
    console.log('action obj', this.form.action.selected);
    console.log('object obj', this.form.object.selected);
    console.log('stringified data ', JSON.stringify(this.form.editorData));
    if (!this.isFormValid()) {
      return;
    }
    //
    this.presentLoading();
    //
    const idForItem = this.afs.createId();
    //

    //
    const newItem = {
      uid: idForItem,
      areaTag: this.form.area.selected,
      actionTag: this.form.action.selected,
      objectTag: this.form.object.selected,
      conditionsTags: this.form.conditions.selectedList,
      //
      htmlContent: JSON.stringify(this.form.editorData)
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
  // Check Form valid
  private isFormValid() {
    const isValid = true;
    // isValid = !!this.formName;
    // isValid = !!this.formDescription;
    return isValid;
  }

  private returnToPrevious() {
    this.loadCtrl.dismiss();
    this.router.navigateByUrl('/content-administration');
  }

  ngOnInit() {
    this.getDataFromApi();
  }

}
