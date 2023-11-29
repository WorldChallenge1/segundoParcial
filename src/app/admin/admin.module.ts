import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TestsComponent } from '../tests/tests.component';


@NgModule({
  declarations: [
    TestsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

  ]
})
export class AdminModule { }
