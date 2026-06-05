package com.summitize.pmsupport;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Stream;

public final class PmSupportApplication {
    private static final int DEFAULT_PORT = 8080;

    private PmSupportApplication() {
    }

    public static void main(String[] args) throws IOException {
        int port = Integer.parseInt(System.getenv().getOrDefault("PORT", String.valueOf(DEFAULT_PORT)));
        Path siteRoot = Path.of(".").toAbsolutePath().normalize();

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/api/templates", new MarkdownDirectoryHandler(siteRoot.resolve("templates")));
        server.createContext("/api/agents", new MarkdownDirectoryHandler(siteRoot.resolve("agents")));
        server.createContext("/health", exchange -> sendText(exchange, 200, "OK " + Instant.now()));
        server.createContext("/", new StaticFileHandler(siteRoot));
        server.setExecutor(null);
        server.start();

        System.out.println("PM Support is running at http://localhost:" + port);
    }

    private static final class StaticFileHandler implements HttpHandler {
        private final Path siteRoot;

        private StaticFileHandler(Path siteRoot) {
            this.siteRoot = siteRoot;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendText(exchange, 405, "Method not allowed");
                return;
            }

            URI uri = exchange.getRequestURI();
            String requestedPath = URLDecoder.decode(uri.getPath(), StandardCharsets.UTF_8);
            if (requestedPath.equals("/")) {
                requestedPath = "/index.html";
            }

            Path file = siteRoot.resolve(requestedPath.substring(1)).normalize();
            if (!file.startsWith(siteRoot) || Files.isDirectory(file) || !Files.exists(file)) {
                sendText(exchange, 404, "Not found");
                return;
            }

            Headers headers = exchange.getResponseHeaders();
            headers.set("Content-Type", contentType(file));
            byte[] body = Files.readAllBytes(file);
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream output = exchange.getResponseBody()) {
                output.write(body);
            }
        }
    }

    private static final class MarkdownDirectoryHandler implements HttpHandler {
        private final Path directory;

        private MarkdownDirectoryHandler(Path directory) {
            this.directory = directory;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
                return;
            }

            if (!Files.isDirectory(directory)) {
                sendJson(exchange, 200, "[]");
                return;
            }

            List<Path> files;
            try (Stream<Path> stream = Files.list(directory)) {
                files = stream
                        .filter(path -> path.getFileName().toString().endsWith(".md"))
                        .sorted(Comparator.comparing(path -> path.getFileName().toString()))
                        .toList();
            }

            StringBuilder json = new StringBuilder("[");
            for (int i = 0; i < files.size(); i++) {
                Path file = files.get(i);
                if (i > 0) {
                    json.append(',');
                }
                String fileName = file.getFileName().toString();
                String content = Files.readString(file);
                json.append("{\"slug\":\"")
                        .append(escapeJson(fileName.replaceFirst("\\.md$", "")))
                        .append("\",\"title\":\"")
                        .append(escapeJson(toTitle(fileName)))
                        .append("\",\"content\":\"")
                        .append(escapeJson(content))
                        .append("\"}");
            }
            json.append(']');

            sendJson(exchange, 200, json.toString());
        }
    }

    private static String toTitle(String fileName) {
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
            title.append(part.substring(0, 1).toUpperCase(Locale.ROOT));
            title.append(part.substring(1));
        }
        return title.toString();
    }

    private static String contentType(Path file) {
        String name = file.getFileName().toString().toLowerCase(Locale.ROOT);
        if (name.endsWith(".html")) {
            return "text/html; charset=utf-8";
        }
        if (name.endsWith(".css")) {
            return "text/css; charset=utf-8";
        }
        if (name.endsWith(".js")) {
            return "text/javascript; charset=utf-8";
        }
        if (name.endsWith(".md")) {
            return "text/markdown; charset=utf-8";
        }
        return "application/octet-stream";
    }

    private static void sendJson(HttpExchange exchange, int statusCode, String body) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        send(exchange, statusCode, body);
    }

    private static void sendText(HttpExchange exchange, int statusCode, String body) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=utf-8");
        send(exchange, statusCode, body);
    }

    private static void send(HttpExchange exchange, int statusCode, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(bytes);
        }
    }

    private static String escapeJson(String value) {
        StringBuilder escaped = new StringBuilder(value.length());
        for (int i = 0; i < value.length(); i++) {
            char ch = value.charAt(i);
            switch (ch) {
                case '"' -> escaped.append("\\\"");
                case '\\' -> escaped.append("\\\\");
                case '\b' -> escaped.append("\\b");
                case '\f' -> escaped.append("\\f");
                case '\n' -> escaped.append("\\n");
                case '\r' -> escaped.append("\\r");
                case '\t' -> escaped.append("\\t");
                default -> {
                    if (ch < 0x20) {
                        escaped.append(String.format("\\u%04x", (int) ch));
                    } else {
                        escaped.append(ch);
                    }
                }
            }
        }
        return escaped.toString();
    }
}
