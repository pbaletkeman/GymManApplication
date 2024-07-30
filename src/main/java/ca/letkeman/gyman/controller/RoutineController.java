package ca.letkeman.gyman.controller;

import ca.letkeman.gyman.model.Routine;
import ca.letkeman.gyman.service.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {
  private final RoutineService routineService;

  @Autowired
  public RoutineController(RoutineService routineService){
    this.routineService = routineService;
  }

  // Create a new Routine
  @PostMapping
  public ResponseEntity<Routine> createRoutine(@RequestBody Routine routine){
    Routine savedRoutine = routineService.createRoutine(routine);
    return ResponseEntity.ok(savedRoutine);
  }

  // Update an existing routine
  @PutMapping("/{id}")
  public ResponseEntity<Routine> updateRoutine(@PathVariable Long id, @RequestBody Routine routine){
    Routine updateRoutine = routineService.updateRoutine(id, routine);
    return  ResponseEntity.ok(updateRoutine);
  }

  // List All routines
  @GetMapping
  public ResponseEntity<List<Routine>> getAllRoutines(){
    List<Routine> routines = routineService.getAllRoutines();
    return ResponseEntity.ok(routines);
  }

  // View details of a specific routine
  @GetMapping("/{id}")
  public ResponseEntity<Routine> getRoutineById(@PathVariable Long id){
    Routine routine = routineService.getRoutineById(id);
    if (routine != null){
      return ResponseEntity.ok(routine);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{ids}")
  @ResponseStatus(value = HttpStatus.NO_CONTENT)
  public void deleteRoutine(@PathVariable String ids){
    routineService.deleteManyRoutines(ids);
  }
}
