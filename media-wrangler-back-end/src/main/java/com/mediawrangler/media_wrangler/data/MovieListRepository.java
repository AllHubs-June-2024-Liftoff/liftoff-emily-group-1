package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.MovieList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieListRepository extends JpaRepository<MovieList, Integer> {
    List<MovieList> findByUserId(int userId);
}
