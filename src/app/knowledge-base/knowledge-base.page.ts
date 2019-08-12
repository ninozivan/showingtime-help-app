import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.page.html',
  styleUrls: ['./knowledge-base.page.scss'],
})
export class KnowledgeBasePage implements OnInit, OnDestroy {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];
  //
  appVars = {
    viewState: 1,
    viewStateEnums: {
      isLoading: 1,
      listExist: 2,
      listEmpty: 3
    }
  };

  constructor(private afs: AngularFirestore) { }

  public getData() {
    this.itemsCollection = this.afs.collection('test-collection');
    this.items = this.itemsCollection.valueChanges();
    // this.items = this.itemsCollection.valueChanges().pipe(
    //   map(items => items.map( item => {
    //     console.log('item in map', item);
    //     return item;
    //   }))
    // );
    this.itemsSubscription = this.items.subscribe(snapshot => {
      console.log(snapshot);
      this.itemsArrayList = snapshot as [];
      this.appVars.viewState = this.itemsArrayList.length > 0 ? this.appVars.viewStateEnums.listExist : this.appVars.viewStateEnums.listEmpty;
    });
    console.log('items ', this.items);
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

}
