package com.summitize.pmsupport.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private final String jwtSecret;
    private final long jwtExpirationMs;

    private final Key signingKey;

    public JwtUtils(@Value("${jwt.secret:}") String jwtSecret,
                    @Value("${jwt.expiration-ms:0}") long jwtExpirationMs) {
        this.jwtSecret = jwtSecret;
        this.jwtExpirationMs = jwtExpirationMs;
        validateJwtConfig();
        try {
            this.signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        } catch (WeakKeyException | IllegalArgumentException ex) {
            throw new IllegalArgumentException("Invalid JWT secret configured in jwt.secret. " +
                    "Use a secure secret at least 32 characters long for HS256.", ex);
        }
    }

    private void validateJwtConfig() {
        if (jwtSecret == null || jwtSecret.trim().isEmpty()) {
            throw new IllegalArgumentException("Missing JWT secret. Please configure jwt.secret in application.properties.");
        }
        if (jwtSecret.length() < 32) {
            throw new IllegalArgumentException("JWT secret is too short. Use a secret with at least 32 characters for HS256.");
        }
        if (jwtExpirationMs <= 0) {
            throw new IllegalArgumentException("Invalid JWT expiration time. Please configure jwt.expiration-ms with a positive value.");
        }
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsernameFromJwt(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(signingKey).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }
}
