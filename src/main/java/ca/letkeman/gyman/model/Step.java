package ca.letkeman.gyman.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
public class Step {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "stepNum")
  private Long stepNum;

  @Column(name = "description")
  private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "exercise_id")
  @JsonBackReference
  private Exercise exercise;

  public Step(String name, Exercise exercise) {
    this.name = name;
    this.exercise = exercise;
  }

  public Step(String name) {
    this.name = name;
  }


  public Step() {
  }

  public Step(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public Step(Long id, String name, Exercise exercise) {
    this.id = id;
    this.name = name;
    this.exercise = exercise;
  }

  public Step(String name, Long stepNum, String description, Exercise exercise) {
    this.name = name;
    this.stepNum = stepNum;
    this.description = description;
    this.exercise = exercise;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Exercise getExercise() {
    return exercise;
  }

  public Long getStepNum() {
    return stepNum;
  }

  public void setStepNum(Long stepNum) {
    this.stepNum = stepNum;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setExercise(Exercise exercise) {
    this.exercise = exercise;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Step step = (Step) o;
    return Objects.equals(getId(), step.getId()) && Objects.equals(getName(), step.getName())
        && Objects.equals(stepNum, step.stepNum) && Objects.equals(description, step.description)
        && Objects.equals(getExercise(), step.getExercise());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getName(), stepNum, description, getExercise());
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", Step.class.getSimpleName() + "[", "]")
        .add("id=" + id)
        .add("name='" + name + "'")
        .add("stepNum=" + stepNum)
        .add("description='" + description + "'")
//        .add("exercise=" + exercise)
        .toString();
  }
}
