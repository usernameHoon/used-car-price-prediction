package com.aipricing.usedcar.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PredictController {

  private final RestTemplate restTemplate = new RestTemplate();
  private final String FLASK_BASE = "http://localhost:5000";

  // 📌 1. 예측 요청
  @PostMapping("/predict")
  public ResponseEntity<?> predictFromReact(@RequestBody Map<String, Object> request) {
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

      ResponseEntity<Map> response = restTemplate.postForEntity(FLASK_BASE + "/predict_api", entity, Map.class);

      return ResponseEntity.ok(response.getBody());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Collections.singletonMap("error", e.getMessage()));
    }
  }

  // 📌 2. options 요청
  @GetMapping("/options")
  public ResponseEntity<?> getOptions() {
    try {
      ResponseEntity<Map> response = restTemplate.getForEntity(FLASK_BASE + "/options", Map.class);
      return ResponseEntity.ok(response.getBody());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Collections.singletonMap("error", e.getMessage()));
    }
  }

  // 📌 3. 제조사별 모델 요청
  @GetMapping("/models/{manufacturer}")
  public ResponseEntity<?> getModels(@PathVariable("manufacturer") String manufacturer) {
    try {
      String flaskUrl = "http://localhost:5000/models/" + manufacturer;
      ResponseEntity<String[]> response = restTemplate.getForEntity(flaskUrl, String[].class);
      return ResponseEntity.ok(response.getBody());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(Collections.singletonMap("error", e.getMessage()));
    }
  }
}
