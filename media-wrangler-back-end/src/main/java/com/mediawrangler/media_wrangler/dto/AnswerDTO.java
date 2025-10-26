package com.mediawrangler.media_wrangler.dto;

import com.mediawrangler.media_wrangler.models.Answer;

import java.time.LocalDateTime;

public record AnswerDTO(
        Long id,
        String answerText,
        LocalDateTime timestamp,
        Long questionId,
        Long userId,
        String username
) {
    public static AnswerDTO from(Answer a) {
        return new AnswerDTO(
                a.getId(),
                a.getAnswerText(),
                a.getTimestamp(),
                a.getQuestion().getId(),
                (long) a.getUser().getId(),
                a.getUser().getUsername()
        );
    }
}
