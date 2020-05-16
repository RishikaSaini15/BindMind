package com.sha.serverside.service;

import com.sha.serverside.model.Grade;

public interface GradeService {
    Grade addCourse(Grade course);
    Grade findStudentGrade(Long assignmentId, Long userId);
}
