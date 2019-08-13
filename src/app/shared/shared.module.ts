import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StepSearchingComponent } from './step-searching/step-searching.component';

@NgModule({
  declarations: [StepSearchingComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [StepSearchingComponent]
})
export class SharedModule { }
