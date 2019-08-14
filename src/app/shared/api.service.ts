import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';

import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];

  constructor(private afs: AngularFirestore) {}



  // code goes here

}
