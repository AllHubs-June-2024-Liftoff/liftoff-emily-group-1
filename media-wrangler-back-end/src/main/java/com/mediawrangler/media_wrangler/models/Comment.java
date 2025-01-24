package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userComment;

    private LocalDate dateCreated;

    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDate.now();
    }

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Comment() {
    }

    public Comment(String userComment, User user) {
        this.userComment = userComment;
        this.user = user;
        this.dateCreated = LocalDate.now();
    }

    public String getUserComment() {
        return userComment;
    }

    public void setUserComment(String userComment) {
        this.userComment = userComment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
