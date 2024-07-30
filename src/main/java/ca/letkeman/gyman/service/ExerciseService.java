package ca.letkeman.gyman.service;

import ca.letkeman.gyman.repository.ExerciseRepository;
import ca.letkeman.gyman.repository.StepRepository;
import ca.letkeman.gyman.model.Exercise;
import ca.letkeman.gyman.model.Step;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final StepRepository stepRepository;

    @Autowired
    public ExerciseService(ExerciseRepository exerciseRepository, StepRepository stepRepository) {
        this.exerciseRepository = exerciseRepository;
      this.stepRepository = stepRepository;
    }

    public Exercise createExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    public Exercise updateExercise(Long id, Exercise updatedExercise) {
        return updateExercise(id, updatedExercise, false);
    }

    public Exercise updateExercise(Long id, Exercise updatedExercise, boolean updateSteps) {
        Optional<Exercise> existingExercise = exerciseRepository.findById(id);
        if (existingExercise.isPresent()) {
            // Update other fields as needed
            Exercise exercise = existingExercise.get();
            exercise.setName(updatedExercise.getName());
            if (updateSteps) {
                Step step;
                for (Long i : updatedExercise.getSteps().stream().map(Step::getId).toList()) {
                    step = stepRepository.findById(i).orElse(null);
                    if (step != null) {
                        step.setExercise(exercise);
                    }
                }
            }
            return exerciseRepository.save(exercise);
        }
        return null; // Handle not found case
    }

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id).orElse(null);
    }

    public void deleteExerciseById(Long id){
        exerciseRepository.deleteById(id);
    }

    public void deleteManyExercises(String ids){
        exerciseRepository.deleteAllById(Arrays.stream(ids.split(",")).map(Long::parseLong).toList());
    }

    // Other methods (e.g., deleteExercise, getExerciseSteps) can be added as needed
}
