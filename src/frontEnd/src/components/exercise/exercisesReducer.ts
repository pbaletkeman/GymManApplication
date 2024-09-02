import { DeleteExerciseData, PostExerciseData } from "./API";
import { Exercise, FetchStatusType } from "./interfaces";

export interface ExerciseReducerFunction {
  (state: Exercise[], actions: any): Exercise[];
}

export default function exercisesReducer(
  data: Exercise[] | undefined,
  action: {
    type: string;
    exercise?: Exercise | undefined;
    data?: Exercise[] | undefined;
    setStatusObject: (a: FetchStatusType) => void | undefined;
    setSaved: (a: Exercise) => void;
    batchIds?: string;
  }
): Exercise[] {
  console.log("Action");
  console.log(action);
  switch (action.type) {
    case "added": {
      let tempItem: Exercise = {
        name: action.exercise?.name,
        description: action.exercise?.description,
      };
      PostExerciseData(action.setSaved, tempItem, action.setStatusObject);
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
      if (action.batchIds && action.batchIds.length > 0) {
        const splitIds = action.batchIds.split(",").map((a) => parseInt(a));
        DeleteExerciseData(action.batchIds, action.setStatusObject);
        // return (
        //   (action.data || []).filter(
        //     (x) => !splitIds.includes(x.id as number)
        //   ) || []
        // );
      }
    }
    case "loaded": {
      return action.data ?? [{} as Exercise];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
