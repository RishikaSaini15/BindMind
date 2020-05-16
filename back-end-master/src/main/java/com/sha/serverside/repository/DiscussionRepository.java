package com.sha.serverside.repository;


import com.sha.serverside.model.Discussions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscussionRepository extends JpaRepository<Discussions, Long> {

    Discussions findByPostId(Long discId);
}

