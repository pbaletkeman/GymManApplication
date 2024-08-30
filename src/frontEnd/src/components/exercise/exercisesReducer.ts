import { Exercise } from "./interfaces";

export interface ExerciseReducerFunction {
  (state: Exercise[], actions: any): Exercise[];
}

export default function exercisesReducer(
  data: Exercise[] | undefined,
  action: {
    exercise?: Exercise | undefined;
    type: string;
    data?: Exercise[] | undefined;
  }
): Exercise[] {
  console.log("Action");
  console.log(action);
  switch (action.type) {
    case "added": {
      let tempItem: Exercise = {
        name: action.exercise?.name,
        id: action.exercise?.id,
        steps: action.exercise?.steps,
      };
      if (data) {
        return [...data, tempItem];
      } else {
        return [tempItem];
      }
    }
    case "changed": {
      if (data) {
        return data.map((t: Exercise) => {
          if (t?.id === action.exercise?.id) {
            return action.exercise ?? t;
          } else {
            return t;
          }
        });
      } else {
        return [action?.exercise ?? ({} as Exercise)];
      }
    }
    case "deleted": {
      return (
        action.data?.filter((t: Exercise) => t?.id !== action.exercise?.id) ?? [
          {} as Exercise,
        ]
      );
    }
    case "loaded": {
      return action.data ?? [{} as Exercise];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
