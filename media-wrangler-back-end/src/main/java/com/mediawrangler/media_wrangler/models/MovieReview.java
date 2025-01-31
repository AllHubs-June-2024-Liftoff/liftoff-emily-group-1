package com.mediawrangler.media_wrangler.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
public class MovieReview {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateCreated;

    @PrePersist
    protected void onCreate() {
        this.dateCreated = LocalDate.now();
    }

    @NotNull(message = "You must enter a date watched")
    private LocalDate dateWatched;

//    Might want to change the max to higher than 1000
    @NotBlank(message = "We want to hear your thoughts, write your movie review")
    @Size(max = 1000, message = "Review must be less than 1000 characters")
    private String review;

    @JsonProperty("isSpoiler")
    private boolean isSpoiler;

    private String award;

    @NotNull(message = "You must give movie a star rating")
    @ManyToOne
    @JoinColumn(name = "rating_id", referencedColumnName = "id", nullable = false)
    private Rating rating;

    private String watchAgain;

    private List<String> tags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    //To track the movie until movie data gets sent to database from API
    private String title;
    private String fullPosterURL;
    private String yearReleased;

    private Long movieId;


//TODO: uncomment when ready to test relationships
//    @ManyToOne
//    private List<Comment> comments;




    public MovieReview() {
    }


    public MovieReview(String review, LocalDate dateWatched, boolean isSpoiler, String award, Rating rating,
                       String watchAgain, String title, String fullPosterURL, String yearReleased, User user, Long movieId ) {
        this.dateCreated = LocalDate.now();
        this.review = review;
        this.dateWatched = dateWatched;
        this.isSpoiler = isSpoiler;
        this.award = award;
        this.rating = rating;
        this.watchAgain = watchAgain;
        this.title = title;
        this.fullPosterURL = fullPosterURL;
        this.yearReleased = yearReleased;
        this.user = user;
        this.movieId = movieId;
    }


    //* getters for id and dateCreated since they should update (I could make an editDate)
    public Long getId() {
        return id;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }


    //* All the review fields here...
    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public String getAward() {
        return award;
    }

    public void setAward(String award) {
        this.award = award;
    }

    public boolean isSpoiler() {
        return isSpoiler;
    }

    public void setSpoiler(boolean isSpoiler) {
        this.isSpoiler = isSpoiler;
    }

    public LocalDate getDateWatched() {
        return dateWatched;
    }

    public void setDateWatched(LocalDate dateWatched) {
        this.dateWatched = dateWatched;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getWatchAgain() {
        return watchAgain;
    }

    public void setWatchAgain(String watchAgain) {
        this.watchAgain = watchAgain;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }



    //* All the movie details here...
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFullPosterURL() {
        return fullPosterURL;
    }

    public void setFullPosterURL(String fullPosterURL) {
        this.fullPosterURL = fullPosterURL;
    }

    public String getYearReleased() {
        return yearReleased;
    }

    public void setYearReleased(String yearReleased) {
        this.yearReleased = yearReleased;
    }
    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }



    //* User getter/setter here...
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }






    //TODO: Add equals, hashcode, and toString methods later
    //TODO: Get the LocalDate to initialize during MovieReview object instantiation
    //TODO: The checked box isn't registering correctly. I tried a boolean and String. Think I am setting it up wrong in form too
}






