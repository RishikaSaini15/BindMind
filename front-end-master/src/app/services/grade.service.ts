import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment';
import {Grade} from '../models/grade';

const GRADE_API_URL = "http://localhost:8080/api/grade/";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  getStudentGrade(assignmentId: string, userId: number): Observable<any> {
    return this.http.get(GRADE_API_URL + "getGrade/" + assignmentId + "/" + userId, {headers: this.headers});
  }

  submitAssignment (grade: Grade): Observable<any> {
    return this.http.post(GRADE_API_URL + "addGrade", JSON.stringify(grade), {headers: this.headers});
  }
}

