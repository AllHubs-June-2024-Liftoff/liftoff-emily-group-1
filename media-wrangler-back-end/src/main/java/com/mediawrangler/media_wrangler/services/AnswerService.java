package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.AnswerRepository;
import com.mediawrangler.media_wrangler.models.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public List<Answer> getAnswersByQuestionId(Long questionId) {
        return answerRepository.findAll()
                .stream()
                .filter(answer -> answer.getQuestion().getId().equals(questionId))
                .toList();
    }
}