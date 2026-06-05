package com.summitize.pmsupport.repository;

import com.summitize.pmsupport.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
