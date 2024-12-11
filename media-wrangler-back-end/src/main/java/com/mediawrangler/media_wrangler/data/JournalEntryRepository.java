package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.JournalEntry;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JournalEntryRepository extends CrudRepository<JournalEntry, Integer> {
}