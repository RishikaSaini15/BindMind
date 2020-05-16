package com.sha.serverside.repository;

import com.sha.serverside.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByModuleId(Long instructorId);

}