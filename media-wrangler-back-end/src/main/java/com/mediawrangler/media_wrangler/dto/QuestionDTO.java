package com.mediawrangler.media_wrangler.dto;

import com.mediawrangler.media_wrangler.models.Question;

import java.time.LocalDateTime;
import java.time.LocalDate;

public record QuestionDTO(
        Long id,
        String questionText,
        String shortDescription,
        Integer movieId,
        String movieTitle,
        String moviePosterPath,
        LocalDate movieReleaseDate,
        Long userId,
        String username,
        LocalDateTime createdAt
) {
    public static QuestionDTO from(Question q) {
        return new QuestionDTO(
                q.getId(),
                q.getQuestionText(),
                q.getShortDescription(),
                q.getMovieId(),
                q.getMovieTitle(),
                q.getMoviePosterPath(),
                q.getMovieReleaseDate(),
                Long.valueOf(q.getUser().getId()),
                q.getUser().getUsername(),
                q.getCreatedAt()
        );
    }
}
