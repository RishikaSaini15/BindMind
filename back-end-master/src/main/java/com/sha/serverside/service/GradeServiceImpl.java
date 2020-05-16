package com.sha.serverside.service;

import com.sha.serverside.model.Grade;
import com.sha.serverside.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Service
@Transactional
public class GradeServiceImpl implements GradeService{

    @Autowired
    private GradeRepository moduleRepository;

    @Override
    public Grade addCourse(Grade grade) {
        return moduleRepository.save(grade);
    }

    @Override
    public Grade findStudentGrade(Long assignmentId, Long userId) {
        List<Grade> submissions = moduleRepository.getByAssignmentId(assignmentId).stream()
                .filter(c -> c.getUser().getId() == userId)
                .collect(Collectors.toList());;
        if (submissions.size() == 0)
            return null;
        return submissions.get(0);
    }
}
