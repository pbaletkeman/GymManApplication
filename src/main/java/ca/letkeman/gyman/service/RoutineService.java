package ca.letkeman.gyman.service;

import ca.letkeman.gyman.model.Routine;
import ca.letkeman.gyman.repository.RoutineRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoutineService {

  private final RoutineRepository routineRepository;

  @Autowired
  public RoutineService(RoutineRepository routineRepository) {
    this.routineRepository = routineRepository;
  }

  public Routine createRoutine(Routine routine) {
    return routineRepository.save(routine);
  }

  public Routine updateRoutine(Long id, Routine updateRoutine) {
    Optional<Routine> existingRoutine = routineRepository.findById(id);
    if (existingRoutine.isPresent()) {
      // Update other fields as needed
      Routine routine = existingRoutine.get();
      routine.setName((updateRoutine.getName()));
      return routineRepository.save(routine);
    }
    return null; // handle not found case
  }

  public List<Routine> getAllRoutines() {
    return routineRepository.findAll();
  }

  public Routine getRoutineById(Long id) {
    return routineRepository.findById(id).orElse(null);
  }

  public void deleteRoutineById(Long id) {
    routineRepository.deleteById(id);
  }

  public void deleteManyRoutines(String ids){
    routineRepository.deleteAllById(Arrays.stream(ids.split(",")).map(Long::parseLong).toList());
  }
}

