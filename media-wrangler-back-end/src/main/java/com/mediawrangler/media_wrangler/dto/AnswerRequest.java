package com.mediawrangler.media_wrangler.dto;

public record AnswerRequest(
        String answerText,
        Long questionId,
        Integer userId
) {}