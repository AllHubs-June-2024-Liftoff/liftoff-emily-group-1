package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.data.AnswerRepository;
import com.mediawrangler.media_wrangler.data.QuestionRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.AnswerDTO;
import com.mediawrangler.media_wrangler.dto.AnswerRequest;
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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AnswerController {

    private final AnswerService answerService;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;

    public AnswerController(AnswerService answerService,
                            QuestionRepository questionRepository,
                            AnswerRepository answerRepository,
                            UserRepository userRepository) {
        this.answerService = answerService;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/response")
    public ResponseEntity<?> createAnswer(@RequestBody AnswerRequest req) {
        if (req == null || req.answerText() == null || req.answerText().isBlank()
                || req.questionId() == null || req.userId() == null) {
            return ResponseEntity.badRequest().body("answerText, questionId, and userId are required");
        }

        Question question = questionRepository.findById(req.questionId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Question ID"));
        User user = userRepository.findById(req.userId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid User ID"));

        Answer a = new Answer();
        a.setAnswerText(req.answerText().trim());
        a.setQuestion(question);
        a.setUser(user);
        a.setTimestamp(LocalDateTime.now());

        Answer saved = answerRepository.save(a);
        return ResponseEntity.ok(AnswerDTO.from(saved));  // <— return DTO, not entity
    }

    @GetMapping("/{questionId}")
    public List<AnswerDTO> getAnswersByQuestionId(@PathVariable Long questionId) {
        return answerService.getAnswersByQuestionId(questionId)
                .stream()
                .map(AnswerDTO::from)
                .toList();
    }
}


