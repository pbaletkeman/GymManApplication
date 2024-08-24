import { Exercise } from "./interfaces";

export default function exercisesReducer(
  exercises: Exercise[],
  action: {
    id: number | null;
    exercise: Exercise;
    data: Exercise[];
    type: string;
  }
) {
  switch (action.type) {
    case "added": {
      let tempItem: Exercise = {
        name: action.exercise.name,
        id: action.exercise.id,
        steps: action.exercise.steps,
      };
      return [...exercises, tempItem];
    }
    case "changed": {
      return exercises.map((t: Exercise) => {
        if (t.id === action.exercise.id) {
          return action.exercise;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return exercises.filter((t: Exercise) => t.id !== action.id);
    }
    case "loaded": {
      return action.data;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
