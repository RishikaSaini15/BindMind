import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Course} from '../models/course';
import {CourseStudent} from '../models/coursestudent';
import {Discussions} from '../models/discussions';
import {Comments} from '../models/comments';
import {Messages} from '../models/messages';
import {Conversation} from '../models/conversation';

let API_URL = "http://localhost:8080/api/user/";
let STUDENT_API_URL = "http://localhost:8080/api/student/";
let TEACHER_API_URL = "http://localhost:8080/api/teacher/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setHeaders() {
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUserSubject.value.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders(
      user ? {
        authorization:'Basic ' + btoa(user.username + ':' + user.password)
      } : {}
    );

    return this.http.get<any> (API_URL + "login", {headers:headers}).pipe(
      map(response =>{
        if(response){
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  logOut(): Observable<any> {
    return this.http.post(API_URL + "logout", {}).pipe(
      map(response => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + "registration", JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findAllCourses(): Observable<any> {
    return this.http.get(API_URL + "courses",
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findAllCoursesOfStudent(studentId: string): Observable<any> {
    this.setHeaders();
    return this.http.get(STUDENT_API_URL + "courses/"+studentId, {headers: this.headers});
  }

  findAllCoursesOfTeacher(teacherId: string): Observable<any> {
    this.setHeaders();
    return this.http.get(TEACHER_API_URL + "courses/"+teacherId, {headers: this.headers});
  }

  enroll(courseStudent: CourseStudent): Observable<any> {
    this.setHeaders();
    return this.http.post(STUDENT_API_URL + "enroll", JSON.stringify(courseStudent), {headers: this.headers});
  }

  deEnroll(courseStudent: CourseStudent): Observable<any> {
    this.setHeaders();
    return this.http.post(STUDENT_API_URL + "de-enroll", JSON.stringify(courseStudent), {headers: this.headers});
  }

  updateProfile(user: User): Observable<any> {
    this.setHeaders();
    return this.http.post(API_URL + "profileupdate", JSON.stringify(user), {headers: this.headers});
  }

  // ------------------------------------------------------------------ Discussions API

  getAllDiscussions(): Observable<any> {
    return this.http.get(API_URL + "discussions",
        {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  submitDiscussion(discussion: Discussions): Observable<any> {
    return this.http.post(API_URL + "discussionpost/", JSON.stringify(discussion),
        {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  findByDiscussionID(discussionID: any) {
    this.setHeaders();
    return this.http.get(API_URL + "discussion/"+discussionID, {headers: this.headers});
  }

  deleteDiscussion(discussionID: any): Observable<any> {
    this.setHeaders();
    return this.http.post(API_URL + "discussions/delete/discussion/"+discussionID,
        JSON.stringify(discussionID), {headers: this.headers});
  }

  // ------------------------------------------------------------------ Comment API


  findCommentsByDiscussionID(discussionID: any) {
    this.setHeaders();
    return this.http.get(API_URL + "discussion/comments/"+discussionID, {headers: this.headers});
  }

  submitComment(postComment: Comments): Observable<any> {
    return this.http.post(API_URL + "discussion/postcomment/", JSON.stringify(postComment),
        {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  deleteComment(commentID: any): Observable<any> {
    this.setHeaders();
    return this.http.post(API_URL + "discussions/delete/comment/"+commentID,
        JSON.stringify(commentID), {headers: this.headers});
  }

  // ------------------------------------------------------------------ Messages API


  findConversationsByUserID(studentId: number) {
    this.setHeaders();
    return this.http.get(API_URL + "messages/conversations/"+studentId, {headers: this.headers});
  }

  findConversations2ByUserID(studentId: number) {
      this.setHeaders();
      return this.http.get(API_URL + "messages/conversationsrecep/"+studentId, {headers: this.headers});
  }

  getConvoMeta(convoId: number){
    this.setHeaders();
    return this.http.get(API_URL + "messages/conversationmeta/"+convoId, {headers: this.headers});
  }

  getMessages(convoId: number){
    this.setHeaders();
    return this.http.get(API_URL + "messages/conversation/"+convoId, {headers: this.headers});
  }

  sendMessage(message: Messages) {
    return this.http.post(API_URL + "messages/newMessage/", JSON.stringify(message),
        {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  getRecipInfo(name: string){
    this.setHeaders();
    return this.http.get(API_URL + "messages/getrecipinfo/"+name, {headers: this.headers});
  }

  createConversation(conversation: Conversation){
    this.setHeaders();
    return this.http.post(API_URL + "messages/newconversation/", JSON.stringify(conversation),
        {headers: this.headers});
  }
}
