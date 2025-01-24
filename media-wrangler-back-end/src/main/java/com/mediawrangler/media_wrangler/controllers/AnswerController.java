package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.data.AnswerRepository;
import com.mediawrangler.media_wrangler.data.QuestionRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.models.Answer;
import com.mediawrangler.media_wrangler.models.Question;
import com.mediawrangler.media_wrangler.models.User;
import com.mediawrangler.media_wrangler.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/answers")
@CrossOrigin(origins = "http://localhost:5173")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/response")
    public ResponseEntity<Answer> createAnswer(@RequestBody Map<String, Object> payload) {
        String answerText = (String) payload.get("answerText");
        Long questionId = ((Map<String, Integer>) payload.get("question")).get("id").longValue();
        int userId = ((Map<String, Integer>) payload.get("user")).get("id");

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Question ID"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));

        Answer answer = new Answer();
        answer.setAnswerText(answerText);
        answer.setQuestion(question);
        answer.setUser(user);
        answer.setTimestamp(LocalDateTime.now());

        Answer savedAnswer = answerRepository.save(answer);

        return ResponseEntity.ok(savedAnswer);
    }

    @GetMapping("/{questionId}")
    public List<Answer> getAnswersByQuestionId(@PathVariable Long questionId) {
        return answerService.getAnswersByQuestionId(questionId);
    }
}
