package com.mediawrangler.media_wrangler.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class MovieList {

    private long id;
    private LocalDateTime createdList;

    @NotBlank
    @Size(min=1, max = 75, message = "List title must be between 1 and 75 characters")
    private String listName;

    @NotNull
    private List<Movie> movies;

    @NotNull
    private List<Tag> tags;

    @NotNull
    private User user;

    public MovieList() {
    }

    public MovieList(String listName, List<Movie> movies, List<Tag> tags, User user) {
        this.listName = listName;
        this.movies = movies;
        this.tags = tags;
        this.createdList = LocalDateTime.now();
    }

    public long getId() {
        return id;
    }

    public LocalDateTime getCreatedList() {
        return createdList;
    }

    public void setCreatedList(LocalDateTime createdList) {
        this.createdList = createdList;
    }

    public @NotBlank @Size(min = 1, max = 75, message = "List title must be between 1 and 75 characters") String getListName() {
        return listName;
    }

    public void setListName(@NotBlank @Size(min = 1, max = 75, message = "List title must be between 1 and 75 characters") String listName) {
        this.listName = listName;
    }

    public @NotNull List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(@NotNull List<Movie> movies) {
        this.movies = movies;
    }

    public @NotNull List<Tag> getTags() {
        return tags;
    }

    public void setTags(@NotNull List<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MovieList movieList = (MovieList) o;
        return id == movieList.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MovieList{" +
                "id=" + id +
                ", createdList=" + createdList +
                ", listName='" + listName + '\'' +
                ", movies=" + movies +
                ", tags=" + tags +
                '}';
    }
}
