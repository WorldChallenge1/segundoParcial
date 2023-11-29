import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { Test } from './Test';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  tests: Test[] = [
    {
      "id": 0,
      "name": "string",
      "initials": "string",
      "description": "string",
      "isActive": true,
      "partCount": 0
    }
  ]

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.getTests();
  }

  getTests() {
    this.testService.getTests().subscribe(tests => this.tests = tests);
  }

}
