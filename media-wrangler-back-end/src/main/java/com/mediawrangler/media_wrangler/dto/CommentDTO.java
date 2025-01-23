package com.mediawrangler.media_wrangler.dto;

import java.time.LocalDate;

public class CommentDTO {


    private Long id;

    private String userComment;

    private LocalDate dateCreated;


    public CommentDTO() {
    }

    public CommentDTO(String userComment) {
        this.userComment = userComment;
        this.dateCreated = LocalDate.now();
    }

    public String getUserComment() {
        return userComment;
    }

    public void setUserComment(String userComment) {
        this.userComment = userComment;
    }


}
