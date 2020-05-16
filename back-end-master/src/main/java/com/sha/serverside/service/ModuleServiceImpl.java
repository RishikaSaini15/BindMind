package com.sha.serverside.service;

import com.sha.serverside.model.Module;
import com.sha.serverside.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Override
    public Module updateModule(Module module) {
        return moduleRepository.save(module);
    }

    @Override
    public void deleteModule(Long moduleId) {
        moduleRepository.deleteById(moduleId);
    }

    @Override
    public List<Module> findAllModules() {
        return moduleRepository.findAll();
    }

    @Override
    public List<Module> findAllModulesOfCourse(Long courseId) {
        return moduleRepository.findByCourseId(courseId);
    }
}
