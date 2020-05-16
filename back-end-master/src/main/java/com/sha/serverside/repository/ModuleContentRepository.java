package com.sha.serverside.repository;

import com.sha.serverside.model.Module;
import com.sha.serverside.model.ModuleContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModuleContentRepository extends JpaRepository<ModuleContent, Long> {
    List<ModuleContent> findByModuleId(Long moduleId);

}
