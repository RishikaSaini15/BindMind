import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CourseStudent} from '../models/coursestudent';
import {Assignment} from '../models/assignment';
import {ModuleContent} from '../models/modulecontent';

const ASSIGNMENT_API_URL = "http://localhost:8080/api/assignment/";
const URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  getAssignmentById(assignementId: string): Observable<any> {
    return this.http.get(ASSIGNMENT_API_URL + assignementId, {headers: this.headers});
  }

  findAllAssignmentOfModule(moduleId: string): Observable<any> {
    return this.http.get(URL + "api/course/modules/" + moduleId + "/assignments", {headers: this.headers});
  }

  submitAssignment (assignment: Assignment): Observable<any> {
    return this.http.post(ASSIGNMENT_API_URL + "add", JSON.stringify(assignment), {headers: this.headers});
  }

  downloadAssignment(filePath: string): Observable<any>{
    const headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token
    });
    return this.http.get<any>(ASSIGNMENT_API_URL + 'download?file=' + filePath, {
      headers: headers, 'responseType'  : 'arraybuffer' as 'json'
    });
  }

  addAssignmentFile(file: File, assignment) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('assignment', assignment.id);
    console.log(formData);
    return this.http.post(ASSIGNMENT_API_URL + "addFile", formData, {headers: new HttpHeaders({
        authorization:'Bearer ' + this.currentUser.token
      })});
  }

  uploadStudentAssignment(file: File, assignment, currentUser) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('assignment', assignment.id);
    formData.append('user', currentUser.id);
    console.log(formData);
    return this.http.post(ASSIGNMENT_API_URL + "addStudentAssignment", formData, {headers: new HttpHeaders({
        authorization:'Bearer ' + this.currentUser.token
      })});
  }

  getAllSubmissions(assignmentId: string, userId: string): Observable<any> {
    return this.http.get(ASSIGNMENT_API_URL + "getAllSubmission/" + assignmentId + "/" + userId, {headers: this.headers});
  }
}
