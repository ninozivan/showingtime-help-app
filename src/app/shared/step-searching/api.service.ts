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
            // console.log('input actionName: ',actionName,' input objectName ',objectName);
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
      // console.log('final snapshot for combined items ', snapshot);
      this.apiResultsSubject.next(snapshot);
    });

  }

  public get_knowledgeContent_byMultiParams(areaName, actionName, objectName) {
    // console.log(`Calling api with params, area: ${areaName}, action: ${actionName}, object: ${objectName}`);
    this.areaNameFilter$.next(areaName);
    this.actionNameFilter$.next(actionName);
    this.objectNameFilter$.next(objectName);
  }

}
