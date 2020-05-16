package com.sha.serverside.repository;

import com.sha.serverside.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> getByAssignmentId(Long assignmentId);
}
