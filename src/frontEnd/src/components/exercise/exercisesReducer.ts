import { Exercise } from "./interfaces";

export default function exercisesReducer(
  data: Exercise[] | undefined,
  action: {
    exercise?: Exercise | undefined;
    type: string;
    data?: Exercise[] | undefined;
  }
): Exercise[] {
  switch (action.type) {
    case "added": {
      let tempItem: Exercise = {
        name: action.exercise?.name,
        id: action.exercise?.id,
        steps: action.exercise?.steps,
      };
      return [...data, tempItem];
    }
    case "changed": {
      return data.map((t: Exercise) => {
        if (t.id === action.exercise?.id) {
          return action.exercise;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return action.data.filter((t: Exercise) => t.id !== action.exercise?.id);
    }
    case "loaded": {
      console.log(action);
      return action.data;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
