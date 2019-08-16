import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription} from 'rxjs';
import { map, take, first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/step-searching/api.service';
@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.page.html',
  styleUrls: ['./knowledge-base.page.scss'],
})
export class KnowledgeBasePage implements OnInit, OnDestroy {

  serviceApiResultsSubscription: Subscription;

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;
  itemsSubscription: any;
  itemsArrayList = [];
  //
  appVars = {
    viewState: 3,
    viewStateEnums: {
      isLoading: 1,
      listExist: 2,
      listEmpty: 3
    }
  };

  constructor(private afs: AngularFirestore, private router: Router, private apiService: ApiService) {
    this.serviceApiResultsSubscription = this.apiService.multiParamsQueryObservable.subscribe(
      data => {
        // console.log('inside knowledge base subscription api result ', data);
        this.itemsArrayList = data as [];
        this.itemsArrayList.sort( this.sortArray );
        this.appVars.viewState = this.itemsArrayList.length > 0 ? this.appVars.viewStateEnums.listExist : this.appVars.viewStateEnums.listEmpty;
      },
      error => console.log('inside knowledge base subscription api error ', error)
    );
  }

  public getData() {
    this.itemsCollection = this.afs.collection('knowledge-contents', ref => ref.orderBy('areaName'));
    this.items = this.itemsCollection.valueChanges();
    //
    this.itemsSubscription = this.items.subscribe(snapshot => {
      // console.log(snapshot);
      this.itemsArrayList = snapshot as [];
      // console.log('itemsArrayList ', this.itemsArrayList);
      this.appVars.viewState = this.itemsArrayList.length > 0 ? this.appVars.viewStateEnums.listExist : this.appVars.viewStateEnums.listEmpty;
    });
  }

  public openContent(contentItem) {
    if (!contentItem) {
      return;
    }
    this.router.navigateByUrl('knowledge-base/' + contentItem.uid);
  }

  private sortArray(a, b) {
    if ( a.areaName < b.areaName ) {
      return -1;
    }
    if ( a.areaName > b.areaName ) {
      return 1;
    }
    return 0;
  }

  ngOnInit() {
    // this.getData();
  }

  ngOnDestroy() {
    // this.serviceApiResultsSubscription.unsubscribe();
    // this.itemsSubscription.unsubscribe();
  }

}
