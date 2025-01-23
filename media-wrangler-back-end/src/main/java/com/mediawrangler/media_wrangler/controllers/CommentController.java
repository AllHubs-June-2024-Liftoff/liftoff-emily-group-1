package com.mediawrangler.media_wrangler.controllers;


import com.mediawrangler.media_wrangler.data.CommentRepository;
import com.mediawrangler.media_wrangler.models.Comment;
import com.mediawrangler.media_wrangler.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RestController
public class CommentController {


    @Autowired
    private final CommentService commentService;


    //Based off other branches, setup Service here
    @Autowired
    private final CommentRepository commentRepository;

    public CommentController(CommentService commentService, CommentRepository commentRepository) {
        this.commentService = commentService;
        this.commentRepository = commentRepository;
    }

    @PostMapping("/movies")
    public ResponseEntity<?> createComment(@RequestBody Comment comment) {
        try {
            Comment savedComment = commentService.saveComment(comment); // Use the service instance
            return new ResponseEntity<>("Comment Submission successful", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving the comment", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
