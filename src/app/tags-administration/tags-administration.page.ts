import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';

@Component({
  selector: 'app-tags-administration',
  templateUrl: './tags-administration.page.html',
  styleUrls: ['./tags-administration.page.scss'],
})
export class TagsAdministrationPage implements OnInit {
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

  public createNewTag(){
    
  }

  public getData() {
    this.itemsCollection = this.afs.collection('tags-collection');
    this.items = this.itemsCollection.valueChanges();
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

}
