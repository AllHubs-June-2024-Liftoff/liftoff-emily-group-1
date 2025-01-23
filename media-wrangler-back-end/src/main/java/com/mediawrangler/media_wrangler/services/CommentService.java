package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.CommentRepository;
import com.mediawrangler.media_wrangler.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private static CommentRepository commentRepository;


    public CommentService(CommentRepository commentRepository) {
        CommentService.commentRepository = commentRepository;
    }


    //Saves a comment
    public static Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    //Finds a comment by id
    public Optional<Comment> findReviewById(Long id){
        return commentRepository.findById(id);
    }


}
