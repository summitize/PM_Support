package com.summitize.pmsupport.repository;

import com.summitize.pmsupport.model.ActionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ActionItemRepository extends JpaRepository<ActionItem, Long> {

    List<ActionItem> findByProjectIdOrderByDueDateAsc(Long projectId);

    List<ActionItem> findByAssignedToIdOrderByDueDateAsc(Long userId);

    List<ActionItem> findByStatus(String status);

    List<ActionItem> findByProjectIdIn(List<Long> projectIds);

    List<ActionItem> findByProjectIdAndStatus(Long projectId, String status);
}
