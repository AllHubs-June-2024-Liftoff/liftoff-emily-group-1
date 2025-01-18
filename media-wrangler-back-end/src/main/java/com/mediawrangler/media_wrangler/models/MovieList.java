package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
public class MovieList {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank(message = "List name is required")
    private String name;

    @ManyToOne
    private User user;

    @ManyToMany
    @JoinTable(name = "movie_list_movies", joinColumns = @JoinColumn(name = "movie_list_id"), inverseJoinColumns = @JoinColumn(name = "movie_id"))
    private List<Movie> movies = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public @NotBlank(message = "List name is required") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "List name is required") String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
