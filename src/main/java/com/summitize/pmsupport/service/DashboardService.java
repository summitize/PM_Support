package com.summitize.pmsupport.service;

import com.summitize.pmsupport.model.*;
import com.summitize.pmsupport.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private RaidItemRepository raidItemRepository;

    @Autowired
    private ActionItemRepository actionItemRepository;

    @Autowired
    private HandbookArticleRepository handbookArticleRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> getDashboardStats(Long projectId) {
        Map<String, Object> stats = new HashMap<>();

        // Project count and info
        if (projectId != null) {
            Project project = projectRepository.findById(projectId).orElse(null);
            stats.put("projectName", project != null ? project.getName() : "N/A");
            stats.put("projectStatus", project != null ? project.getStatus() : "N/A");
        } else {
            long totalProjects = projectRepository.count();
            stats.put("totalProjects", totalProjects);
            stats.put("projectName", "All Projects");
        }

        // RAID stats
        long totalRisks = 0, totalIssues = 0, totalAssumptions = 0, totalDependencies = 0;
        if (projectId != null) {
            totalRisks = raidItemRepository.countByTypeAndStatus(RaidType.RISK, "Open");
            totalIssues = raidItemRepository.countByTypeAndStatus(RaidType.ISSUE, "Open");
            totalAssumptions = raidItemRepository.countByTypeAndStatus(RaidType.ASSUMPTION, "Open");
            totalDependencies = raidItemRepository.countByTypeAndStatus(RaidType.DEPENDENCY, "Open");
        } else {
            totalRisks = countAllOpenRisks();
            totalIssues = countAllOpenIssues();
            totalAssumptions = countAllOpenAssumptions();
            totalDependencies = countAllOpenDependencies();
        }
        stats.put("totalRisks", totalRisks);
        stats.put("totalIssues", totalIssues);
        stats.put("totalAssumptions", totalAssumptions);
        stats.put("totalDependencies", totalDependencies);

        // Action Item stats
        long totalActionItems = 0, completedActionItems = 0;
        if (projectId != null) {
            totalActionItems = actionItemRepository.countByProjectId(projectId);
            completedActionItems = actionItemRepository.countByProjectIdAndStatus(projectId, "Completed");
        } else {
            totalActionItems = actionItemRepository.count();
            completedActionItems = actionItemRepository.countByStatus("Completed");
        }
        stats.put("totalActionItems", totalActionItems);
        stats.put("completedActionItems", completedActionItems);
        long pendingActionItems = totalActionItems - completedActionItems;
        stats.put("pendingActionItems", pendingActionItems);

        // Handbook stats
        long totalArticles = 0;
        if (projectId != null) {
            totalArticles = handbookArticleRepository.countByProjectId(projectId);
        } else {
            totalArticles = handbookArticleRepository.count();
        }
        stats.put("totalHandbookArticles", totalArticles);

        // Timeline info
        if (projectId != null) {
            Project project = projectRepository.findById(projectId).orElse(null);
            if (project != null) {
                stats.put("startDate", project.getStartDate() != null ? 
                    project.getStartDate().format(DateTimeFormatter.ISO_LOCAL_DATE) : "N/A");
                stats.put("endDate", project.getEndDate() != null ? 
                    project.getEndDate().format(DateTimeFormatter.ISO_LOCAL_DATE) : "N/A");
            }
        }

        // User stats
        stats.put("totalTeamMembers", userRepository.count());

        return stats;
    }

    // Helper methods for non-project-specific stats
    private long countAllOpenRisks() {
        return raidItemRepository.countByTypeAndStatus(RaidType.RISK, "Open");
    }

    private long countAllOpenIssues() {
        return raidItemRepository.countByTypeAndStatus(RaidType.ISSUE, "Open");
    }

    private long countAllOpenAssumptions() {
        return raidItemRepository.countByTypeAndStatus(RaidType.ASSUMPTION, "Open");
    }

    private long countAllOpenDependencies() {
        return raidItemRepository.countByTypeAndStatus(RaidType.DEPENDENCY, "Open");
    }
}