package models;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Objects;

public class Rating {

    private long id;
    private LocalDateTime dateRated;

    //? This will be a display of stars, whatever star they click on will rep the int value
    @NotBlank
    private int value;

    @NotNull
    private Movie movie;

    @NotNull
    private User user;

    public Rating() {
    }

    public Rating(int value, Movie movie, User user) {
        this.value = value;
        this.movie = movie;
        this.user = user;
        this.dateRated = LocalDateTime.now();
    }

    public long getId() {
        return id;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public LocalDateTime getDateRated() {
        return dateRated;
    }

    public void setDateRated(LocalDateTime dateRated) {
        this.dateRated = dateRated;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
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
        Rating rating = (Rating) o;
        return id == rating.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Rating{" +
                "id=" + id +
                ", value=" + value +
                ", dateRated=" + dateRated +
                ", movie=" + movie +
                ", user=" + user +
                '}';
    }
}
