import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ModuleContent} from '../models/modulecontent';
import {ResponseContentType} from '@angular/http';
import {file} from 'googleapis/build/src/apis/file';
let COURSE_API_URL = "http://localhost:8080/api/course/";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  findAllModulesOfCourse(courseId: string): Observable<any> {
    return this.http.get(COURSE_API_URL + courseId + "/modules", {headers: this.headers});
  }

  getCourseById(courseId: string): Observable<any> {
    return this.http.get(COURSE_API_URL + courseId, {headers: this.headers});
  }

  getModuleById(moduleId: string): Observable<any> {
    return this.http.get(COURSE_API_URL + "modules/" + moduleId, {headers: this.headers});
  }

  findModuleContent(moduleId: string): Observable<any> {
    return this.http.get(COURSE_API_URL + "modules/" + moduleId + "/content", {headers: this.headers});
  }

  addModuleContent (moduleContent: ModuleContent): Observable<any> {
    return this.http.post(COURSE_API_URL + "modules/addModule", JSON.stringify(moduleContent), {headers: this.headers});
  }

  downloadMaterial(filePath: string): Observable<any>{
  const headers = new HttpHeaders({
    authorization:'Bearer ' + this.currentUser.token
  });
  return this.http.get<any>(COURSE_API_URL + 'modules/download?file=' + filePath, {
  headers: headers, 'responseType'  : 'arraybuffer' as 'json'
});
}

  addFile(file: File, module) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('module', module.id);
    console.log(formData);
    return this.http.post(COURSE_API_URL + "modules/addModuleFile", formData, {headers: new HttpHeaders({
        authorization:'Bearer ' + this.currentUser.token
      })});
  }
}
