package ca.letkeman.gyman.repository;

import ca.letkeman.gyman.model.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import  java.util.List;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {

  List<Routine> findByName(String name);
}
