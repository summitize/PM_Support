package com.summitize.pmsupport.model;

import jakarta.persistence.*;

@Entity
@Table(name = "raid_items")
public class RaidItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RaidType type;

    @Column(nullable = false)
    private String title;

    @Column(length = 1500)
    private String description;

    private String status;

    private String likelihood;

    private String impact;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public RaidItem() {
    }

    public RaidItem(RaidType type, String title, String description, String status) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public RaidType getType() {
        return type;
    }

    public void setType(RaidType type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLikelihood() {
        return likelihood;
    }

    public void setLikelihood(String likelihood) {
        this.likelihood = likelihood;
    }

    public String getImpact() {
        return impact;
    }

    public void setImpact(String impact) {
        this.impact = impact;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
