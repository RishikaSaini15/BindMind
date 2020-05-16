package com.sha.serverside.repository;

import com.sha.serverside.model.Course;
import com.sha.serverside.model.CourseStudent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructorId(Long instructorId);
}
