package ca.letkeman.gyman;

import ca.letkeman.gyman.model.Exercise;
import ca.letkeman.gyman.model.Routine;
import ca.letkeman.gyman.model.Step;
import ca.letkeman.gyman.repository.ExerciseRepository;
import ca.letkeman.gyman.repository.StepRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SampleDataLoader implements CommandLineRunner {

  private final ExerciseRepository exerciseRepository;
  private final StepRepository stepRepository;

  public SampleDataLoader(ExerciseRepository exerciseRepository, StepRepository stepRepository) {
    this.exerciseRepository = exerciseRepository;
    this.stepRepository = stepRepository;
  }

  @Override
  public void run(String... args) {
    Faker faker = new Faker();

    String name = "";

    Set<Routine> routines = new HashSet<>();
    Routine routine = new Routine("Sample Routine");
    routines.add(routine);

    // Create exercises
    List<Exercise> ex = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
      ex.add(new Exercise(faker.name().fullName(), routines));
    }
    // Save exercises
    exerciseRepository.saveAll(ex);
    Random rand = new Random();

    // Create Steps
    List<Step> steps = new ArrayList<>();
    String description = "";
    for (int i = 0; i < 10; i++) {
      for (long j = 1; j < rand.nextInt(7); j++) {
        name = faker.ancient().god() + " - " + faker.zodiac().sign();
        description = faker.bojackHorseman().quotes();
        steps.add(new Step(name, j, description, ex.get(i)));
      }
    }
    // Save steps
    stepRepository.saveAll(steps);
  }
}
