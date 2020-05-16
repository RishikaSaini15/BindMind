package com.sha.serverside.service;

import com.sha.serverside.model.Course;
import com.sha.serverside.model.Module;
import com.sha.serverside.model.ModuleContent;
import com.sha.serverside.repository.CourseRepository;
import com.sha.serverside.repository.ModuleContentRepository;
import com.sha.serverside.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private ModuleContentRepository moduleContentRepository;

    @Override
    public Course addCourse(Course course){
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Course course){
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long courseId){
        courseRepository.deleteById(courseId);
    }

    @Override
    public List<Course> findAllCourses(){
        return courseRepository.findAll();
    }

    @Override
    public List<Course> findCourseByInstructor(Long teacherId) {
        return courseRepository.findByInstructorId(teacherId);
    }

    @Override
    public Course findCourseById(Long courseId) {
        return courseRepository.findById(courseId).get();
    }

    @Override
    public List<Module> findAllModules(Long courseId) {
        return moduleRepository.findByCourseId(courseId);
    }

    @Override
    public List<ModuleContent> getModuleContent(Long moduleId) {
        return moduleContentRepository.findByModuleId(moduleId);
    }

    @Override
    public Module findModuleById(Long moduleId) {
        return moduleRepository.findById(moduleId).get();
    }

    @Override
    public ModuleContent addModuleContent(ModuleContent moduleContent) {
        return moduleContentRepository.save(moduleContent);
    }

    @Override
    public ModuleContent uploadMaterial(MultipartFile file, ModuleContent moduleContent) {
        String filePath = storeMaterial(file);
        moduleContent.setFile(filePath);
        return moduleContentRepository.save(moduleContent);
    }

    public String storeMaterial(MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get("src/main/java/com/sha/serverside/files", file.getOriginalFilename());
            Files.write(path, bytes);
            return path.toString().replace("\\", "/");
        } catch (Exception e) {
            System.out.println(file);
            throw new RuntimeException("failed to save file!", e);
        }
    }
}
