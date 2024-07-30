package ca.letkeman.gyman.controller;

import ca.letkeman.gyman.model.Step;
import ca.letkeman.gyman.service.StepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/steps")
public class StepController {
    private final StepService stepService;

    @Autowired
    public StepController(StepService stepService) {
        this.stepService = stepService;
    }

    // Create a new Step
    @PostMapping
    public ResponseEntity<Step> createStep(@RequestBody Step step) {
        Step savedStep = stepService.createStep(step);
        return ResponseEntity.ok(savedStep);
    }

    // Update an existing Steps
    @PutMapping("/{id}")
    public ResponseEntity<Step> updateStep(@PathVariable Long id, @RequestBody Step step) {
        Step updatedStep = stepService.updateStep(id, step);
        return ResponseEntity.ok(updatedStep);
    }

    // List all Steps
    @GetMapping
    public ResponseEntity<List<Step>> getAllSteps() {
        List<Step> steps = stepService.getAllSteps();
        return ResponseEntity.ok(steps);
    }

    // View details of a specific Step
    @GetMapping("/{id}")
    public ResponseEntity<Step> getStepById(@PathVariable Long id) {
        Step step = stepService.getStepById(id);
        if (step != null) {
            return ResponseEntity.ok(step);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{ids}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteStep(@PathVariable String ids) {
        stepService.deleteManySteps(ids);
    }

    // List all Steps
    @GetMapping("/exercise/{id}")
    public ResponseEntity<List<Step>> getExerciseSteps(@PathVariable long id) {
        List<Step> steps = stepService.getStepByExercise(id);
        return ResponseEntity.ok(steps);
    }
    // Other endpoints (e.g., delete, additional queries) can be added as needed
}
