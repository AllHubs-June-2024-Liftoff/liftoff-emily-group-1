package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.data.EventRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.models.Event;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.*;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addEvent(@RequestBody Map<String, Object> payload) {
        String title = ((String) payload.get("title")).trim();
        LocalDateTime start = LocalDateTime.parse((String) payload.get("start"));
        LocalDateTime end   = LocalDateTime.parse((String) payload.get("end"));
        Integer userId      = (Integer) payload.get("userId");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // duplicate check (same as you have)
        LocalDate day = start.toLocalDate();
        LocalDateTime dayStart = day.atStartOfDay();
        LocalDateTime dayEnd   = day.atTime(23, 59, 59);

        boolean exists = eventRepository.existsByUserAndTitleIgnoreCaseAndStartBetween(
                user, title, dayStart, dayEnd);

        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("This movie is already on your calendar for that day.");
        }

        Event event = new Event();
        event.setTitle(title);
        event.setStart(start);
        event.setEnd(end);
        event.setUser(user);

        // NEW: optional metadata for movie events
        if (payload.get("tmdbId") != null) {
            event.setTmdbId((Integer) payload.get("tmdbId"));
        }
        if (payload.get("posterPath") != null) {
            event.setPosterPath((String) payload.get("posterPath"));
        }
        if (payload.get("overview") != null) {
            event.setOverview((String) payload.get("overview"));
        }

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

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEvent(@PathVariable Long eventId) {
        return eventRepository.findById(eventId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        if (!eventRepository.existsById(eventId)) {
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(eventId);
        return ResponseEntity.noContent().build();
    }
}

