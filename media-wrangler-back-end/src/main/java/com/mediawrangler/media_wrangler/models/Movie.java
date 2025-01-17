package com.mediawrangler.media_wrangler.models;

public class Movie {
    private int id;
    private String title;
    private String releaseDate;
    private double rating;
    private String overview;
    private String posterPath;


    public Movie() {

    }

    public Movie(int id, String title, String releaseDate, double rating, String overview, String posterPath) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.overview = overview;
        this.posterPath = posterPath;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    @Override
    public String toString() {
        return "Title: " + title + "\nRelease Date: " + releaseDate + "\nRating: " + rating + "\nOverview: " + overview;
    }
}

