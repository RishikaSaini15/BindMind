package com.sha.serverside.controller;

import com.sha.serverside.model.Assignment;
import com.sha.serverside.model.User;
import com.sha.serverside.service.AssignmentService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @GetMapping("/api/assignment/{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId){
        return ResponseEntity.ok(assignmentService.findAssignmentById(assignmentId));
    }

    @GetMapping("/api/course/modules/{moduleId}/assignments")
    public ResponseEntity<?> findModuleById(@PathVariable Long moduleId){
        return ResponseEntity.ok(assignmentService.findAssignmentByModuleId(moduleId));
    }

    @GetMapping("/api/assignment/getAllSubmission/{assignmentId}/{userId}")
    public ResponseEntity<?> findAllSubmission(@PathVariable Long assignmentId, @PathVariable Long userId){
        return ResponseEntity.ok(assignmentService.findSubmissions(assignmentId, userId));
    }

    @PostMapping("/api/assignment/add")
    public ResponseEntity<?> enrollCourse(@RequestBody Assignment assignment){
        return new ResponseEntity<>(assignmentService.addAssignment(assignment), HttpStatus.CREATED);
    }

    @PostMapping("/api/assignment/addFile")
    public ResponseEntity<?> addAssignmentFile(@RequestParam("file") MultipartFile file, @RequestParam Assignment assignment) {
        return new ResponseEntity<>(assignmentService.uploadMaterial(file, assignment),HttpStatus.CREATED);
    }

    @PostMapping("/api/assignment/addStudentAssignment")
    public ResponseEntity<?> addStudentSubmission(@RequestParam("file") MultipartFile file, @RequestParam Assignment assignment, @RequestParam User user) {
        return new ResponseEntity<>(assignmentService.uploadStudentSubmission(file, assignment, user),HttpStatus.CREATED);
    }

    @RequestMapping(value="/api/assignment/download", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity downloadMaterial(@RequestParam("file") String file) throws IOException {
        ResponseEntity respEntity = uploadFile(file);
        return respEntity;
    }

    private ResponseEntity uploadFile(String fileName) throws IOException {
        ResponseEntity respEntity = null;

        File result=new File(fileName);

        if(result.exists()){
            InputStream inputStream = new BufferedInputStream(new FileInputStream(result));
            String type=result.toURL().openConnection().guessContentTypeFromName(fileName);

            byte[] out = IOUtils.toByteArray(inputStream);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            respEntity = new ResponseEntity(out, headers, HttpStatus.OK);
        }else{
            respEntity = new ResponseEntity ("File Not Found", HttpStatus.OK);
        }
        return respEntity;
    }

}
