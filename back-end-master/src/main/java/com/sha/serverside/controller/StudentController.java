package com.sha.serverside.controller;

import com.sha.serverside.model.*;
import com.sha.serverside.model.Module;
import com.sha.serverside.service.CourseStudentService;
import com.sha.serverside.service.DiscussionService;
import com.sha.serverside.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class StudentController {

    @Autowired
    private CourseStudentService courseStudentService;
    @Autowired
    private DiscussionService discussionStudentService;
    @Autowired
    private ModuleService moduleService;

    @GetMapping("/api/student/courses/{studentId}")
    public ResponseEntity<?> findAllCoursesOfStudent(@PathVariable Long studentId){
        List<Course> courseList =
                courseStudentService.findAllCoursesOfStudent(studentId).stream()
                        .map(cs -> cs.getCourse())
                        .collect(Collectors.toList());
        return new ResponseEntity<>(courseList, HttpStatus.OK);
    }

    @PostMapping("/api/student/enroll")
    public ResponseEntity<?> enroll(@RequestBody CourseStudent courseStudent){
        return new ResponseEntity<>(courseStudentService.saveCourseStudent(courseStudent), HttpStatus.CREATED);
    }

    @PostMapping("/api/student/de-enroll")
    public ResponseEntity<?> deEnrollCourse(@RequestBody CourseStudent courseStudent){
            courseStudentService.deleteCourseStudent(courseStudent);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/api/student/courses/modules/{courseId}")
    public ResponseEntity<?> findAllModulesOfCourse(@PathVariable Long courseId){
        List<Module> moduleList =
                moduleService.findAllModulesOfCourse(courseId);
        return new ResponseEntity<>(moduleList, HttpStatus.OK);
    }

    // --------------------------------------------------------------------------------------- discussions from here ---

    @PostMapping("/api/user/discussionpost/")
    public ResponseEntity<?> submitDiscussion(@RequestBody Discussions discussion){
        return new ResponseEntity<>(discussionStudentService.saveDiscussion(discussion), HttpStatus.CREATED);
    }

    @GetMapping("/api/user/discussions")
    public ResponseEntity<?> getAllDiscussions(){
        List<Discussions> discussionsList =
                discussionStudentService.getAllDiscussions();
        return new ResponseEntity<>(discussionsList, HttpStatus.OK);
    }

    @GetMapping("/api/user/discussion/{discId}")
    public ResponseEntity<?> getDiscussionById(@PathVariable Long discId){
        Discussions discussion =
                discussionStudentService.findByPostId(discId);
        return new ResponseEntity<>(discussion, HttpStatus.OK);
    }

    @PostMapping("/api/user/discussions/delete/discussion/{discussionId}")
    public ResponseEntity<?> deleteDiscussion(@RequestBody Long discussionId){
        discussionStudentService.deleteDiscussion(discussionId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // ------------------------------------------------------------------------------------------ comments from here ---

    @GetMapping("/api/user/discussion/comments/{discId}")
    public ResponseEntity<?> getAllComments(@PathVariable Long discId){
        List<Comments> commentsList =
                discussionStudentService.findAllCommentsByPostId(discId);
        return new ResponseEntity<>(commentsList, HttpStatus.OK);
    }

    @PostMapping("/api/user/discussion/postcomment/")
    public ResponseEntity<?> submitComment(@RequestBody Comments comment){
        return new ResponseEntity<>(discussionStudentService.saveComment(comment), HttpStatus.CREATED);
    }

    @PostMapping("/api/user/discussions/delete/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@RequestBody Long commentId){
        discussionStudentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
