package com.summitize.pmsupport.controller;

import com.summitize.pmsupport.model.*;
import com.summitize.pmsupport.repository.ActionItemRepository;
import com.summitize.pmsupport.repository.HandbookArticleRepository;
import com.summitize.pmsupport.repository.RaidItemRepository;
import com.summitize.pmsupport.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private RaidItemRepository raidItemRepository;

    @Autowired
    private ActionItemRepository actionItemRepository;

    @Autowired
    private HandbookArticleRepository handbookArticleRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats(@RequestParam(required = false) Long projectId) {
        Map<String, Object> stats = dashboardService.getDashboardStats(projectId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/raid-items")
    public ResponseEntity<List<RaidItem>> getRaidItems(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) RaidType type,
            @RequestParam(required = false) Long projectId) {

        List<RaidItem> items;
        if (projectId != null) {
            if (type != null) {
                items = raidItemRepository.findByProjectAndType(projectId, type.name());
            } else if (status != null) {
                items = raidItemRepository.findByStatusAndProject(status, projectId);
            } else {
                items = raidItemRepository.findByProjectIdOrderByCreatedAtDesc(projectId);
            }
        } else {
            if (type != null && status != null) {
                items = raidItemRepository.findByTypeAndStatus(type.name(), status);
            } else if (type != null) {
                items = raidItemRepository.findByType(type);
            } else if (status != null) {
                items = raidItemRepository.findByStatus(status);
            } else {
                items = raidItemRepository.findAll();
            }
        }
        return ResponseEntity.ok(items);
    }

    @GetMapping("/action-items")
    public ResponseEntity<List<ActionItem>> getActionItems(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) Long assignedToId) {

        List<ActionItem> items;
        if (projectId != null) {
            if (assignedToId != null) {
                items = actionItemRepository.findByAssignedToIdOrderByDueDateAsc(assignedToId);
            } else if (status != null) {
                items = actionItemRepository.findByProjectIdAndStatus(projectId, status);
            } else {
                items = actionItemRepository.findByProjectIdOrderByDueDateAsc(projectId);
            }
        } else {
            if (assignedToId != null) {
                items = actionItemRepository.findByAssignedToIdOrderByDueDateAsc(assignedToId);
            } else if (status != null) {
                items = actionItemRepository.findByStatus(status);
            } else {
                items = actionItemRepository.findAll();
            }
        }
        return ResponseEntity.ok(items);
    }

    @PostMapping("/action-items")
    public ResponseEntity<ActionItem> createActionItem(@RequestBody ActionItem actionItem) {
        // Set default status if not provided
        if (actionItem.getStatus() == null || actionItem.getStatus().isEmpty()) {
            actionItem.setStatus("Pending");
        }
        ActionItem saved = actionItemRepository.save(actionItem);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/handbook-articles")
    public ResponseEntity<List<HandbookArticle>> getHandbookArticles(
            @RequestParam(required = false) Long projectId) {

        List<HandbookArticle> articles;
        if (projectId != null) {
            articles = handbookArticleRepository.findByProjectIdOrderByCreatedAtDesc(projectId);
        } else {
            articles = handbookArticleRepository.findAll();
        }
        return ResponseEntity.ok(articles);
    }

    @PostMapping("/handbook-articles")
    public ResponseEntity<HandbookArticle> createHandbookArticle(@RequestBody HandbookArticle article) {
        if (article.getCreatedAt() == null) {
            article.setCreatedAt(new java.time.Instant());
        }
        HandbookArticle saved = handbookArticleRepository.save(article);
        return ResponseEntity.ok(saved);
    }
}