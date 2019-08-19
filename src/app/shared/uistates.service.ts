import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, take, first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UistatesService {

  stepSearchVisibilitySubject: BehaviorSubject<boolean|null>;
  stepSearchVisibilityState = false;

  constructor() {
    this.stepSearchVisibilitySubject = new BehaviorSubject(false);
  }

  public toggleStepSearchVisibility(inputNewState?) {
    console.log(' toggleStepSearchVisibility inputNewState ', inputNewState);
    this.stepSearchVisibilityState = inputNewState ? inputNewState : !this.stepSearchVisibilityState;
    this.stepSearchVisibilitySubject.next(this.stepSearchVisibilityState);
  }

  public getStepSearchState() {
    return this.stepSearchVisibilityState;
  }

}
