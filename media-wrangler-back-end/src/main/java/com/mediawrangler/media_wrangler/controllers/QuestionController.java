package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.data.QuestionRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.QuestionDTO;
import com.mediawrangler.media_wrangler.models.Question;
import com.mediawrangler.media_wrangler.models.User;
import com.mediawrangler.media_wrangler.services.QuestionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public QuestionController(QuestionRepository questionRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<QuestionDTO> list() {
        return questionRepository.findAllByOrderByIdDesc()
                .stream().map(QuestionDTO::from).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDTO> get(@PathVariable Long id) {
        return questionRepository.findById(id)
                .map(q -> ResponseEntity.ok(QuestionDTO.from(q)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<QuestionDTO> create(@RequestBody Map<String, Object> payload) {
        // expected payload fields from your form
        String questionText     = ((String) payload.get("questionText")).trim();
        String shortDescription = Optional.ofNullable((String) payload.get("shortDescription")).orElse(null);
        Integer userId          = (Integer) ((Map<?,?>)payload.get("user")).get("id");

        Integer movieId         = (Integer) payload.get("movieId");
        String movieTitle       = (String) payload.get("movieTitle");
        String moviePosterPath  = (String) payload.get("moviePosterPath");
        String movieReleaseDate = (String) payload.get("movieReleaseDate"); // "yyyy-MM-dd" or null

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Question q = new Question();
        q.setQuestionText(questionText);
        q.setShortDescription(shortDescription);
        q.setUser(user);

        if (movieId != null) {
            q.setMovieId(movieId);
            q.setMovieTitle(movieTitle);
            q.setMoviePosterPath(moviePosterPath);
            if (movieReleaseDate != null && !movieReleaseDate.isBlank()) {
                q.setMovieReleaseDate(LocalDate.parse(movieReleaseDate));
            }
        }

        Question saved = questionRepository.save(q);
        return ResponseEntity.status(HttpStatus.CREATED).body(QuestionDTO.from(saved));
    }
}

