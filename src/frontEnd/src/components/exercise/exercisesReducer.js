export default function exercisesReducer(exercises, action) {
  switch (action.type) {
    case "added": {
      return [
        ...exercises,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return exercises.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return exercises.filter((t) => t.id !== action.id);
    }
    case "loaded": {
      return action.data;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
