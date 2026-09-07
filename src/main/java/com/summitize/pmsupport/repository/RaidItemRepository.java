package com.summitize.pmsupport.repository;

import com.summitize.pmsupport.model.RaidItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface RaidItemRepository extends JpaRepository<RaidItem, Long> {

    List<RaidItem> findByType(RaidType type);

    List<RaidItem> findByStatus(String status);

    List<RaidItem> findByProjectIdOrderByCreatedAtDesc(Long projectId);

    @Query("SELECT r FROM RaidItem r WHERE r.project.id = :projectId AND r.type = :type")
    List<RaidItem> findByProjectAndType(@Param("projectId") Long projectId, @Param("type") String type);
}
