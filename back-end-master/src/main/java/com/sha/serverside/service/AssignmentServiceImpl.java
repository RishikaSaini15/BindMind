package com.sha.serverside.service;

import com.sha.serverside.model.Assignment;
import com.sha.serverside.model.File;
import com.sha.serverside.model.ModuleContent;
import com.sha.serverside.model.User;
import com.sha.serverside.repository.AssignmentRepository;
import com.sha.serverside.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private FileRepository fileRepository;

    @Override
    public Assignment findAssignmentById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId).get();
    }

    @Override
    public List<Assignment> findAssignmentByModuleId(Long moduleId) {
        return assignmentRepository.findByModuleId(moduleId);
    }

    @Override
    public List<File> findSubmissions(Long assignmentId, Long userId) {
        List<File> submissions = fileRepository.getByAssignmentId(assignmentId).stream()
                .filter(c -> c.getUploadedBy().getId() == userId)
                .collect(Collectors.toList());;
        return submissions;
    }

    @Override
    public Assignment addAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment uploadMaterial(MultipartFile file, Assignment assignment) {
        String filePath = storeMaterial(file);
        assignment.setFile(filePath);
        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment uploadStudentSubmission(MultipartFile file, Assignment assignment, User user) {
        String filePath = storeStudentAssignment(file, user);
        File fileModel = new File();
        fileModel.setAssignment(assignment);
        fileModel.setDate(new Date(new java.util.Date().getTime()));
        fileModel.setUploadedBy(user);
        fileModel.setFile(filePath);
        fileRepository.save(fileModel);
        return assignment;
    }

    public String storeMaterial(MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get("src/main/java/com/sha/serverside/files/assignment", file.getOriginalFilename());
            Files.write(path, bytes);
            return path.toString().replace("\\", "/");
        } catch (Exception e) {
            System.out.println(file);
            throw new RuntimeException("failed to save file!", e);
        }
    }

    public String storeStudentAssignment(MultipartFile file, User user) {
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get("src/main/java/com/sha/serverside/files/assignment/" + user.getId());
            if (!Files.exists(path)) {
                Files.createDirectory(path);
            }
            Path pathForFile = Paths.get("src/main/java/com/sha/serverside/files/assignment/" + user.getId(), file.getOriginalFilename());
            Files.write(pathForFile, bytes);
            return pathForFile.toString().replace("\\", "/");
        } catch (Exception e) {
            System.out.println(file);
            throw new RuntimeException("failed to save file!", e);
        }
    }
}
