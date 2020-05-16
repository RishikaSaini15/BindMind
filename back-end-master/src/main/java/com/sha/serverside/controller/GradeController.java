package com.sha.serverside.controller;

import com.sha.serverside.model.Grade;
import com.sha.serverside.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class GradeController {

    @Autowired
    private GradeService gradeService;

    @GetMapping("/api/grade/getGrade/{assignmentId}/{userId}")
    public ResponseEntity<?> findAllSubmission(@PathVariable Long assignmentId, @PathVariable Long userId){
        return ResponseEntity.ok(gradeService.findStudentGrade(assignmentId, userId));
    }



    @PostMapping("/api/grade/addGrade")
    public ResponseEntity<?> enrollCourse(@RequestBody Grade grade){
        return new ResponseEntity<>(gradeService.addCourse(grade), HttpStatus.CREATED);
    }
}
