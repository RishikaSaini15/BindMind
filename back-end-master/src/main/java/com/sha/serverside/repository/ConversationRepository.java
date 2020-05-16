package com.sha.serverside.repository;

import com.sha.serverside.model.Conversations;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversations, Long>{

    List<Conversations> findByUserId(Long user);
    Optional<Conversations> findById(Long convoid);
    List<Conversations> findByRecepId(Long userId);
}
