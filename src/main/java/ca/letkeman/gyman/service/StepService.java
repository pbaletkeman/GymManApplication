package ca.letkeman.gyman.service;

import ca.letkeman.gyman.model.Step;
import ca.letkeman.gyman.repository.StepRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StepService {

  private final StepRepository stepRepository;

  @Autowired
  public StepService(StepRepository stepRepository) {
    this.stepRepository = stepRepository;
  }

  public Step createStep(Step step) {
    return stepRepository.save(step);
  }

  public Step updateStep(Long id, Step updatedStep) {
    Optional<Step> existingStep = stepRepository.findById(id);
    if (existingStep.isPresent()) {
      Step step = existingStep.get();
      // Update other fields as needed
      step.setName(updatedStep.getName());
      step.setExercise(updatedStep.getExercise());
      step.setStepNum(updatedStep.getStepNum());
      step.setDescription(updatedStep.getDescription());
      return stepRepository.save(step);
    }
    return null; // Handle not found case
  }

  public List<Step> getAllSteps() {

    return stepRepository.findAll();
  }

  public Step getStepById(Long id) {
    return stepRepository.findById(id).orElse(null);
  }

  public void deleteStepById(Long id) {
    if (id != null) {
      stepRepository.deleteById(id);
    }
  }

  public void deleteManySteps(String ids) {
    if (!ids.isEmpty()) {
      stepRepository.deleteAllById(Arrays.stream(ids.split(",")).map(Long::parseLong).toList());
    }
  }

  public List<Step> getStepByExercise(Long exerciseId){
    return stepRepository.findByExerciseId(exerciseId);
  }
  // Other methods (e.g., deleteStep, getStepByExercise) can be added as needed
}
