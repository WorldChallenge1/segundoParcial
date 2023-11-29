import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../test.service';
import { Test } from '../Test';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  testForm: FormGroup;
  editMode: boolean = false;

  constructor(private testService: TestService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {

    this.testForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      initials: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      isActive: new FormControl('', [Validators.required]),
      partCount: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.testService.getTest(id).subscribe(test => {
        this.testForm.setValue({
          name: test.name,
          initials: test.initials,
          description: test.description,
          isActive: test.isActive,
          partCount: test.partCount
        })
        this.testForm.controls['partCount'].disable();
      })
    } else {
      this.editMode = false;
      this.testForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        initials: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      });
    }
  }

  isValid() {
    return this.testForm.valid;
  }

  onSubmit() {
    if (this.isValid() && !this.editMode) {
      console.log(this.testForm.value);
      const test: Test = this.testForm.value;
      this.testService.addTest(test)
        .subscribe(
          () => {
            this.toastr.success('Test creado con exito', 'Test Creado');
            this.testForm.reset();
            this.router.navigate(['/tests']);
          }
        )
    }

    if (this.isValid() && this.editMode) {
      console.log(this.testForm.value);
      const test: Test = this.testForm.value;
      test.id = this.route.snapshot.params['id'];
      this.testService.editTest(test)
        .subscribe(
          () => {
            this.toastr.success('Test editado con exito', 'Test Editado');
            this.testForm.reset();
            this.router.navigate(['/tests']);
          }
        )
    }
  }

}
