import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import {Subject} from 'rxjs';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, take, first, skip, switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';
import { snapshotChanges } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /* #region Multi Param */
  multiParamsQueryObservable: Observable<any>;
  public apiResultsSubject = new BehaviorSubject<any>(' ');
  //
  areaNameFilter$: BehaviorSubject<string|null>;
  actionNameFilter$: BehaviorSubject<string|null>;
  objectNameFilter$: BehaviorSubject<string|null>;
  /* #endregion Multi Param */
  lastParams = {
    areaName: null,
    actionName: null,
    objectName: null,
    conditions: null
  };

  constructor(private afs: AngularFirestore) {

    this.areaNameFilter$ = new BehaviorSubject(null);
    this.actionNameFilter$ = new BehaviorSubject(null);
    this.objectNameFilter$ = new BehaviorSubject(null);
    //
    this.multiParamsQueryObservable = combineLatest(
      this.areaNameFilter$,
      this.actionNameFilter$,
      this.objectNameFilter$
    ).pipe(
      skip(1),
      switchMap(([areaName, actionName, objectName]) =>
        this.afs
          .collection('knowledge-contents', ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;
            if (areaName) {
              query = query.where('areaName', '==', areaName);
            }
            if (actionName) {
              query = query.where('actionName', '==', actionName);
            }
            if (objectName) {
              query = query.where('objectName', '==', objectName);
            }
            return query;
          })
          .valueChanges()
      )
    );

    this.multiParamsQueryObservable.subscribe(snapshot => {
      this.apiResultsSubject.next(snapshot);
    });

  }

  public get_knowledgeContent_byMultiParams(areaName, actionName, objectName) {
    this.lastParams.areaName = areaName ? areaName : null;
    this.lastParams.actionName = actionName ? actionName : null;
    this.lastParams.objectName = objectName ? objectName : null;
    this.areaNameFilter$.next(areaName);
    this.actionNameFilter$.next(actionName);
    this.objectNameFilter$.next(objectName);
  }

  public get_lastMultiParams_values() {
    return this.lastParams;
  }

}
