import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private afs: AngularFirestore, private router: Router) { }

  public getData() {
    this.itemsCollection = this.afs.collection('knowledge-contents');
    this.items = this.itemsCollection.valueChanges();
    //
    this.itemsSubscription = this.items.subscribe(snapshot => {
      console.log(snapshot);
      this.itemsArrayList = snapshot as [];
      console.log('itemsArrayList ', this.itemsArrayList);
      this.appVars.viewState = this.itemsArrayList.length > 0 ? this.appVars.viewStateEnums.listExist : this.appVars.viewStateEnums.listEmpty;
    });
  }

  public openContent(contentItem) {
    if (!contentItem) {
      return;
    }
    this.router.navigateByUrl('knowledge-base/' + contentItem.uid);
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

}
