package com.mediawrangler.media_wrangler.models;

import java.util.ArrayList;

public class Movie {
    private int id;
    private String title;
    private String releaseDate;
    private double rating;
    private String overview;
    private String posterPath;
    private ArrayList<CastMember> cast;
    private ArrayList<CrewMember> crew;

    public Movie() {

    }

    public Movie(int id, String title, String releaseDate, double rating, String overview,
                 String posterPath, ArrayList<CastMember> cast, ArrayList<CrewMember> crew) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.overview = overview;
        this.posterPath = posterPath;
        this.cast = cast;
        this.crew = crew;
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

    public ArrayList<CastMember> getCast() {
        return cast;
    }

    public void setCast(ArrayList<CastMember> cast) {
        this.cast = cast;
    }

    public ArrayList<CrewMember> getCrew() {
        return crew;
    }

    public void setCrew(ArrayList<CrewMember> crew) {
        this.crew = crew;
    }

    @Override
    public String toString() {
        return "Title: " + title + "\nRelease Date: " + releaseDate + "\nRating: " + rating + "\nOverview: " + overview;
    }
}

