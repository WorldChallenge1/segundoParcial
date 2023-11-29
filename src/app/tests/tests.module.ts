import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TestsRoutingModule } from './tests-routing.module';
import { TestFormComponent } from './test-form/test-form.component';


@NgModule({
  declarations: [
    TestFormComponent
  ],
  imports: [
    CommonModule,
    TestsRoutingModule,
    ReactiveFormsModule
  ]
})
export class TestsModule { }
