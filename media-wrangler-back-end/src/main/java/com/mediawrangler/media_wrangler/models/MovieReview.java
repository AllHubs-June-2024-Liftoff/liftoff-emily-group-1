package com.mediawrangler.media_wrangler.models;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;



public class MovieReview {


    private int id;
    private LocalDateTime dateCreated;

    //? Might want to change the max to higher than 1000
    @NotBlank
    @Size(max = 1000, message = "Review must be less than 1000 characters")
    private String review;

    @NotNull
    private Movie movie;

    @NotNull
    private Rating rating;

    @NotNull
    private User user;


    public MovieReview() {
    }


    public MovieReview(String review, Movie movie, Rating rating, User user) {
        this.review = review;
        this.movie = movie;
        this.rating = rating;
        this.user = user;
        this.dateCreated = LocalDateTime.now();
    }

    public int getId() {
        return id;
    }


    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
                ", movie=" + movie +
                ", rating=" + rating +
                ", user=" + user +
                '}';
    }
}
