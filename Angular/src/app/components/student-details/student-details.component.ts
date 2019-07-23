import { Component, OnInit, ViewChildren, ViewChild, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student';
import { ApiService } from '../../services/api.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  student: Student = new Student();
  birthdate;
  submitted = false;
  @ViewChild("resetBtn", { static: true }) resetBtn: ElementRef;
  options: DatepickerOptions = {
    minYear: 1900,
    maxYear: 2030,
    displayFormat: 'DD/MM/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    addClass: 'form-control',
    addStyle: { 'backgroundColor': 'unset' },
    maxDate: new Date(),
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday,
  };
  constructor(private route: ActivatedRoute, public api: ApiService, private router: Router) {
    this.getStudent();
    this.api.messages.subscribe(res => {
      this.getStudent();
    });

  }

  ngOnInit() {
  }

  getStudent() {
    if (this.api.students){
      var id = +this.route.snapshot.paramMap.get('id');
      if (id == 0)
        this.student = new Student();
      else {
        this.student = this.api.students.find(f => f.Id == id);
      }
    }
  }



  onSubmit() {
    this.api.showSpinner();
    this.api.setStudent(this.student).subscribe(res => {
      this.api.hideSpinner();
      this.api.message(res);
      if (res.Success) {
        this.api.students = res.Value;
        this.router.navigate(['']);
      }
    })

  }

  clearAll() {
    this.resetBtn.nativeElement.click();
    this.submitted = false;
    this.student = new Student();
    this.router.navigate(['/student-details/0']);
  }

}
