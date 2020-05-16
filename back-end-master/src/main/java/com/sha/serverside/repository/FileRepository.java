package com.sha.serverside.repository;

import com.sha.serverside.model.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {
    List<File> getByAssignmentId(Long assignmentId);
}
