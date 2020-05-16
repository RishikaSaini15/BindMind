package com.sha.serverside.service;

//import com.sha.serverside.model.Comments;
import com.sha.serverside.model.Comments;
import com.sha.serverside.model.Discussions;
//import com.sha.serverside.repository.CommentRepository;
import com.sha.serverside.repository.CommentRepository;
import com.sha.serverside.repository.DiscussionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DiscussionServiceImpl implements DiscussionService{

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Discussions> getAllDiscussions() {
        return discussionRepository.findAll();
    }

    @Override
    public Discussions findByPostId(Long discId) {
        return discussionRepository.findByPostId(discId);}

    @Override
    public Discussions saveDiscussion(Discussions discussion) {
        return discussionRepository.save(discussion);
    }

    @Override
    public void deleteDiscussion(Long discussionId) {
         discussionRepository.deleteById(discussionId);
    }
// -------------------------------------------------------- COMMENTS
    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public List<Comments> findAllCommentsByPostId(Long discId) {
        return commentRepository.findAllCommentsByPostId(discId);
    }

    @Override
    public Comments saveComment(Comments comment) {
        return commentRepository.save(comment);
    }





}
