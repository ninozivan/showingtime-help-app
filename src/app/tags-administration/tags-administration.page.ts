import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, first } from 'rxjs/operators';

@Component({
  selector: 'app-tags-administration',
  templateUrl: './tags-administration.page.html',
  styleUrls: ['./tags-administration.page.scss'],
})
export class TagsAdministrationPage implements OnInit {

  constructor(private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {

  }

}
