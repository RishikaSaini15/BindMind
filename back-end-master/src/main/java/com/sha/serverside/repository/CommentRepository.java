package com.sha.serverside.repository;

import com.sha.serverside.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comments, Long> {
    //List <Comments> findCommentsByDiscussionID(Long discId);
    List<Comments> findAllCommentsByPostId(Long discId);
}
