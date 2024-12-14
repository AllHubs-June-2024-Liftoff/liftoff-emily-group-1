package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.MovieList;
import org.springframework.data.repository.CrudRepository;

public interface MovieListRepository extends CrudRepository <MovieList,Integer> {
}
