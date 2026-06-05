package com.summitize.pmsupport.repository;

import com.summitize.pmsupport.model.RaidItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RaidItemRepository extends JpaRepository<RaidItem, Long> {
}
