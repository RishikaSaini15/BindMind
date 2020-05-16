package com.sha.serverside.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.sha.serverside.model.Assignment;
import com.sha.serverside.model.File;
import com.sha.serverside.model.ModuleContent;
import com.sha.serverside.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AssignmentService {
    Assignment findAssignmentById(Long assignmentId);
    List<Assignment> findAssignmentByModuleId(Long moduleId);
    List<File> findSubmissions(Long assignmentId, Long userId);
    Assignment addAssignment(Assignment assignment);
    Assignment uploadMaterial(MultipartFile file, Assignment assignment);
    Assignment uploadStudentSubmission(MultipartFile file, Assignment assignment, User user);
}
