import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import {Subject} from 'rxjs';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, take, first, switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';
import { snapshotChanges } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StepSearchingService {
  /* #region Multi Param */
  multiParamsQueryObservable: Observable<any>;
  //
  multiParamsQuerySubject: BehaviorSubject<any>;
  multiParamSubjectAsObservable = this.multiParamsQuerySubject.asObservable();
  //
  areaNameFilter$: BehaviorSubject<string|null>;
  actionNameFilter$: BehaviorSubject<string|null>;
  objectNameFilter$: BehaviorSubject<string|null>;
  /* #endregion Multi Param */

  /* #region Single Param */
  private itemsCollection: AngularFirestoreCollection<any>;
  private itemsCollectionGroup: AngularFirestoreCollectionGroup<any>;
  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];
  /* #endregion Single Param */

  searchTriggered = new Subject();

  constructor(private afs: AngularFirestore) {
    this.areaNameFilter$ = new BehaviorSubject(null);
    this.actionNameFilter$ = new BehaviorSubject(null);
    this.objectNameFilter$ = new BehaviorSubject(null);
    //
    this.multiParamSubjectAsObservable = combineLatest(
      this.areaNameFilter$,
      this.actionNameFilter$,
      this.objectNameFilter$
    ).pipe(
      switchMap(([areaName, actionName, objectName]) =>
        this.afs.collection('knowledge-contents', ref => {
          // console.log('input actionName: ', actionName, ' input objectName ', objectName);
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (areaName) { query = query.where('areaName', '==', areaName); }
          if (actionName) { query = query.where('actionName', '==', actionName); }
          if (objectName) { query = query.where('objectName', '==', objectName); }
          return query;
        }).valueChanges()
      )
    );

    // this.multiParamsQueryObservable.subscribe(snapshot => {
    //   console.log('snapshot for combined items ', snapshot);
    // });
  }

  public get_knowledgeContent_bySingleParam() {
    this.itemsCollection = this.afs.collection('knowledge-contents', ref => ref.where('actionName', '==', 'Schedule'));
    this.items = this.itemsCollection.valueChanges();
    this.itemsSubscription = this.items.subscribe(snapshot => {
      // console.log('step searchig service :', snapshot);
    });
  }

  //
  public get_knowledgeContent_byMultiParams(areaName, actionName, objectName) {
    this.areaNameFilter$.next(areaName);
    this.actionNameFilter$.next(actionName);
    this.objectNameFilter$.next(objectName);
  }

  subscribeToMultiFilterResults(): Observable<any> {
    return this.multiParamsQueryObservable;
  }

  public get_knowledgeContent() {

  }

}
