export default function StepReducer(steps, action) {
  console.log("reducer");
  // console.log(steps);
  // console.log(action);
  return;
  /*
  switch (action.type) {
    case "added": {
      return [
        ...steps,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return steps.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return steps.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  } */
}
