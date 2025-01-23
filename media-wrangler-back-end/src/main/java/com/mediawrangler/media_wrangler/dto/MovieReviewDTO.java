package com.mediawrangler.media_wrangler.dto;

import com.mediawrangler.media_wrangler.models.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;



public class MovieReviewDTO {

    private Long id;
    private final LocalDate dateCreated;

    @NotNull(message = "You must enter a date watched")
    private LocalDate dateWatched;

    @NotBlank(message = "We want to hear your thoughts, write your movie review")
    @Size(max = 1000, message = "Review must be less than 1000 characters")
    private String review;

    private String award;

    @NotNull(message = "You must give movie a star rating")
    private int rating;

    private String watchAgain;

    private boolean isSpoiler;

    private List<String> tags = new ArrayList<>();

    private int userId;

    private String title;
    private String fullPosterURL;
    private String yearReleased;
    private Long movieId;



    public MovieReviewDTO() {
        this.dateCreated = LocalDate.now();
    }


    public MovieReviewDTO(LocalDate dateWatched, String review, String award, int rating, String watchAgain, boolean isSpoiler,
                          List<String> tags, String title, String fullPosterURL, String yearReleased, Long movieId, Long id, int userId) {
        this.dateCreated = LocalDate.now();
        this.dateWatched = dateWatched;
        this.review = review;
        this.award = award;
        this.rating = rating;
        this.watchAgain = watchAgain;
        this.tags = tags;
        this.title = title;
        this.fullPosterURL = fullPosterURL;
        this.yearReleased = yearReleased;
        this.movieId = movieId;
        this.isSpoiler = isSpoiler;
        this.id = id;
        this.userId = userId;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }




    //* Review data...
    public @NotNull(message = "You must enter a date watched") LocalDate getDateWatched() {
        return dateWatched;
    }

    public void setDateWatched(@NotNull(message = "You must enter a date watched") LocalDate dateWatched) {
        this.dateWatched = dateWatched;
    }

    public @NotBlank(message = "We want to hear your thoughts, write your movie review") @Size(max = 1000, message = "Review must be less than 1000 characters") String getReview() {
        return review;
    }

    public void setReview(@NotBlank(message = "We want to hear your thoughts, write your movie review") @Size(max = 1000, message = "Review must be less than 1000 characters") String review) {
        this.review = review;
    }

    public String getAward() {
        return award;
    }

    public void setAward(String award) {
        this.award = award;
    }

    @NotNull(message = "You must give movie a star rating")
    public int getRating() {
        return rating;
    }

    public void setRating(@NotNull(message = "You must give movie a star rating") int rating) {
        this.rating = rating;
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

    public boolean isSpoiler() {
        return isSpoiler;
    }

    public void setSpoiler(boolean spoiler) {
        isSpoiler = spoiler;
    }



    //* User data



    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }




    //* Movie info
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
}
