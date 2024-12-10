package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.Objects;


@Entity
public class MovieReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate dateCreated;
    private String comment;
    private int rating;


    //TODO: Once User and Movie classes are setup add them


    //* Empty constructor for hibernate to use
    public MovieReview() {
    }

    //* Constructor for just a star rating
    // TODO: add user and movie
    public MovieReview(int rating) {
        this.rating = rating;
    }

    //* Overloaded constructor
    // TODO: add user and movie
    public MovieReview(LocalDate dateCreated, String comment, int rating) {
        this.dateCreated = dateCreated;
        this.comment = comment;
        this.rating = rating;
    }



    public int getId() {
        return id;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MovieReview review = (MovieReview) o;
        return id == review.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    //TODO: Update toString once decided how info should be presented
    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", dateCreated=" + dateCreated +
                ", comment='" + comment + '\'' +
                ", rating=" + rating +
                '}';
    }
}
