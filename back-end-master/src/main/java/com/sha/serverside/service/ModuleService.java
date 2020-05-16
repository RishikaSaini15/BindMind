package com.sha.serverside.service;

import com.sha.serverside.model.CourseStudent;
import com.sha.serverside.model.Module;

import java.util.List;

public interface ModuleService {
    Module updateModule(Module module);

    void deleteModule(Long moduleId);

    List<Module> findAllModules();

    List<Module> findAllModulesOfCourse(Long courseId);

}
