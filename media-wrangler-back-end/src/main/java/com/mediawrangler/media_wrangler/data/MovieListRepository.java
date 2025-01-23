package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.MovieList;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieListRepository extends JpaRepository<MovieList, Integer> {
    List<MovieList> findByUserIdAndListName(int userId, String listName);
    List<MovieList> findByUser(User user);
}
