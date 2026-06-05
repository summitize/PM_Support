package com.summitize.pmsupport.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "handbook_articles")
public class HandbookArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String summary;

    @Lob
    @Column(nullable = false)
    private String content;

    private String tags;

    private Instant createdAt;

    public HandbookArticle() {
        this.createdAt = Instant.now();
    }

    public HandbookArticle(String title, String summary, String content, String tags) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.tags = tags;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
