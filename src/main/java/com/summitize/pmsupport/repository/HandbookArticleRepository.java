package com.summitize.pmsupport.repository;

import com.summitize.pmsupport.model.HandbookArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HandbookArticleRepository extends JpaRepository<HandbookArticle, Long> {

    List<HandbookArticle> findByProjectIdOrderByCreatedAtDesc(Long projectId);

    long countByProjectId(Long projectId);
}
