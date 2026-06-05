package com.summitize.pmsupport.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ContentApiController {

    @GetMapping(value = "/templates", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<MarkdownDocument> templates() throws IOException {
        return loadMarkdownDocuments(Path.of("templates"));
    }

    @GetMapping(value = "/agents", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<MarkdownDocument> agents() throws IOException {
        return loadMarkdownDocuments(Path.of("agents"));
    }

    private List<MarkdownDocument> loadMarkdownDocuments(Path root) throws IOException {
        Path directory = root.toAbsolutePath().normalize();
        if (!Files.isDirectory(directory)) {
            return List.of();
        }
        return Files.list(directory)
                .filter(path -> path.getFileName().toString().endsWith(".md"))
                .sorted(Comparator.comparing(path -> path.getFileName().toString()))
                .map(this::toDocument)
                .collect(Collectors.toList());
    }

    private MarkdownDocument toDocument(Path path) {
        try {
            String fileName = path.getFileName().toString();
            String content = Files.readString(path, StandardCharsets.UTF_8);
            return new MarkdownDocument(
                    fileName.replaceFirst("\\.md$", ""),
                    toTitle(fileName),
                    content
            );
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to read markdown file: " + path, exception);
        }
    }

    private String toTitle(String fileName) {
        String withoutExtension = fileName.replaceFirst("\\.md$", "");
        String[] parts = withoutExtension.split("-");
        StringBuilder title = new StringBuilder();
        for (String part : parts) {
            if (part.isBlank()) {
                continue;
            }
            if (title.length() > 0) {
                title.append(' ');
            }
            title.append(part.substring(0, 1).toUpperCase());
            title.append(part.substring(1));
        }
        return title.toString();
    }

    public static final class MarkdownDocument {
        private final String slug;
        private final String title;
        private final String content;

        public MarkdownDocument(String slug, String title, String content) {
            this.slug = slug;
            this.title = title;
            this.content = content;
        }

        public String getSlug() {
            return slug;
        }

        public String getTitle() {
            return title;
        }

        public String getContent() {
            return content;
        }
    }
}
