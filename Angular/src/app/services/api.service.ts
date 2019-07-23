import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebResult } from '../models/web-result';
import { IdName } from '../models/id-name';
import { Student } from '../models/student';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  genders: IdName[];
  students: Student[];
  messages: Subject<any> = new Subject<any>();
  spinnerView: number = 0;
  baseUrl = "http://localhost:54973/api/server";
  constructor(private http: HttpClient, public alert: ToastrService) {
    this.getStudents();
  }

  

  getStudents() {
    
    this.showSpinner();
    this.http.get(this.baseUrl + '/getStudents').subscribe((res: WebResult) => {
      if (res.Success) {
        this.students = res.Value;
        this.hideSpinner();
        this.nextMessage({ name: 'students', value: this.students });
      }
    });
  }

  hideSpinner() {
    this.spinnerView = this.spinnerView == 0 ? 0 : this.spinnerView - 1;
  }

  showSpinner(actions: number = 1) {
    this.spinnerView = this.spinnerView + actions;
  }

  nextMessage(data) {
    this.messages.next(data);
  }

  setStudent(student: Student) {
    return this.http.post<WebResult>(this.baseUrl+'/setStudent', student)
  }

  message(data: WebResult) {
    if (data.Success)
      this.alert.success(data.Message);
    else
      this.alert.error(data.Message);
  }
 
}
