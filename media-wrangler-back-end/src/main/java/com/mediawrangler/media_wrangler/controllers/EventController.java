package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.data.EventRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.models.Event;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addEvent(@RequestBody Map<String, Object> payload) {
        String title = (String) payload.get("title");
        LocalDateTime start = LocalDateTime.parse((String) payload.get("start"));
        LocalDateTime end = LocalDateTime.parse((String) payload.get("end"));
        Integer userId = (Integer) payload.get("userId");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = new Event();
        event.setTitle(title);
        event.setStart(start);
        event.setEnd(end);
        event.setUser(user);

        eventRepository.save(event);
        return ResponseEntity.ok("Event added successfully!");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> getUserEvents(@PathVariable int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Event> events = eventRepository.findByUser(user);
        return ResponseEntity.ok(events);
    }
}
