import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './tests.component';
import { TestFormComponent } from './test-form/test-form.component';

const routes: Routes = [

  {
    path: "",
    component: TestsComponent
  },
  {
    path: "add",
    component: TestFormComponent
  },
  {
    path: "edit/:id",
    component: TestFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
