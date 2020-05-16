package com.sha.serverside.service;

import com.sha.serverside.model.CourseStudent;
import com.sha.serverside.repository.CourseStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CourseStudentServiceImpl implements CourseStudentService {

    @Autowired
    private CourseStudentRepository courseStudentRepository;

    @Override
    public CourseStudent saveCourseStudent(CourseStudent courseStudent){
        return courseStudentRepository.save((courseStudent));
    }

    @Override
    public List<CourseStudent> findAllCoursesOfStudent(Long studentId){
        return courseStudentRepository.findByStudentId(studentId);
    }

    @Override
    public List<CourseStudent> findAllStudentsOfInstructor(Long instructorId){
        return courseStudentRepository.findByCourseInstructorId(instructorId);
    }

    @Override
    public List<CourseStudent> findAllEnrollments(){
        return courseStudentRepository.findAll();
    }

    @Override
    public void deleteCourseStudent(CourseStudent courseStudent) {
        long courseId = courseStudent.getCourse().getId();
        long id = -1;
        List<CourseStudent> studentList = courseStudentRepository.findByStudentId(courseStudent.getStudent().getId());
        for (CourseStudent student: studentList) {
            if (student.getCourse().getId() == courseId) {
                id = student.getId();
                break;
            }
        }
        if (id != -1)
            courseStudentRepository.deleteById(id);
    }
}
