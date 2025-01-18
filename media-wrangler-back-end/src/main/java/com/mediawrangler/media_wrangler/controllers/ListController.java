package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.data.MovieListRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.models.Movie;
import com.mediawrangler.media_wrangler.models.MovieList;
import com.mediawrangler.media_wrangler.models.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("lists")
@CrossOrigin(origins = "http://localhost:5173")
public class ListController {

    @Autowired
    private MovieListRepository movieListRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addMovieToList(@RequestBody Map<String, Object> payload, HttpSession session) {
        int userId = (int) session.getAttribute("user");
        User user = userRepository.getById(userId);
        String listName = (String) payload.get("listName");
        int movieId = (int) payload.get("movieId");

        MovieList list = movieListRepository.findByUserId(userId)
                .stream()
                .filter(l -> l.getName().equals(listName))
                .findFirst()
                .orElseGet(() -> {
                    MovieList newList = new MovieList();
                    newList.setName(listName);
                    newList.setUser(user);
                    return movieListRepository.save(newList);
                });

        Movie movie = new Movie();
        movie.setId(movieId);
        list.getMovies().add(movie);
        movieListRepository.save(list);

        return ResponseEntity.ok("Movie added to list.");
    }

    @GetMapping("/user")
    public List<MovieList> getUserLists(HttpSession session) {
        int userId = (int) session.getAttribute("user");
        return movieListRepository.findByUserId(userId);
    }
}

