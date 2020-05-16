import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {StudentCourseHomeComponent} from '../../components/student/student-course-home/student-course-home.component';
import {StudentModuleDetailsComponent} from '../../components/student/student-module-details/student-module-details.component';
import {StudentAssignmentHomeComponent} from '../../components/student/student-assignment-home/student-assignment-home.component';
import {InstructorCourseDetailsComponent} from '../../components/instructor/instructor-course-details/instructor-course-details.component';
import { InstructorCourseHomeComponent } from '../../components/instructor/instructor-course-home/instructor-course-home.component';
import { InstructorAssignmentHomeComponent } from '../../components/instructor/instructor-assignment-home/instructor-assignment-home.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {AuthGuard} from '../../guards/auth.guard';
import {Role} from '../../models/role';
import {DiscussionHomeComponent} from '../../discussion-home/discussion-home.component';
import {DiscussionComponent} from '../../discussion/discussion.component';
import {DiscussionPostComponent} from '../../discussion-post/discussion-post.component';
import {MessagesConvoComponent} from '../../messages-convo/messages-convo.component';
import {MessagesNewComponent} from '../../messages-new/messages-new.component';
import {MessagesHomeComponent} from '../../messages-home/messages-home.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}},
    { path: 'student-course-home/:courseId',      component: StudentCourseHomeComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT]}},
    { path: 'student-module-details/:moduleId',      component: StudentModuleDetailsComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT]}},
    { path: 'student-assignment-home/:assignmentId',      component: StudentAssignmentHomeComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT]}},
    { path: 'instructor-course-home/:courseId',      component: InstructorCourseHomeComponent , canActivate: [AuthGuard], data: {roles: [Role.TEACHER]}},
    { path: 'instructor-course-details/:moduleId',      component: InstructorCourseDetailsComponent , canActivate: [AuthGuard], data: {roles: [Role.TEACHER]}},
    { path: 'instructor-assignment-home/:assignmentId',      component: InstructorAssignmentHomeComponent , canActivate: [AuthGuard], data: {roles: [Role.TEACHER]}},
    { path: 'user-profile',   component: UserProfileComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}},
    { path: 'discussion-home', component: DiscussionHomeComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}},
    { path: 'discussion/:postId', component: DiscussionComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}},
    { path: 'discussion-post', component: DiscussionPostComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}},
    { path: 'messages-home', component: MessagesHomeComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}},
    { path: 'messages-new', component: MessagesNewComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}},
    { path: 'messages-convo/:id', component: MessagesConvoComponent , canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}}
    ];
