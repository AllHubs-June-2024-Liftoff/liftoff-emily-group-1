package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
