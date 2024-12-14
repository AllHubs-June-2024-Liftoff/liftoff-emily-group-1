package com.mediawrangler.media_wrangler.models;


import java.time.LocalDate;
import java.util.Objects;



public class MovieReview {


    private int id;
    private LocalDate dateCreated;
    private String review;

    private Movie movie;
    private Rating rating;
    private User user;


    public MovieReview() {
    }


    public MovieReview(LocalDate dateCreated, String review, Movie movie, Rating rating, User user) {
        this.dateCreated = dateCreated;
        this.review = review;
        this.movie = movie;
        this.rating = rating;
        this.user = user;
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
