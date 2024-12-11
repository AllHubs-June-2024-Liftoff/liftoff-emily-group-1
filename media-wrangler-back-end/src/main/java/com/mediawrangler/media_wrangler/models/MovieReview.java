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
    private String review;



    //TODO: Once User, Movie and Rating classes are setup add them


    //* Empty constructor for hibernate to use
    public MovieReview() {
    }


    //* Overloaded constructor
    // TODO: add user, movie, rating
    public MovieReview(LocalDate dateCreated, String review, int rating) {
        this.review = review;
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

    public String getReview() {
        return review;
    }

    public void setComment(String review) {
        this.review = review;
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
        return "MovieReview{" +
                "id=" + id +
                ", dateCreated=" + dateCreated +
                ", review='" + review + '\'' +
                '}';
    }
}
