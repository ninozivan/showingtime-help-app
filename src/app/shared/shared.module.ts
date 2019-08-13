import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepSearchingComponent } from './step-searching/step-searching.component';

@NgModule({
  declarations: [StepSearchingComponent],
  imports: [
    CommonModule
  ],
  exports: [StepSearchingComponent]
})
export class SharedModule { }
