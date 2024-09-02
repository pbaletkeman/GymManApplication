import { Exercise, FetchStatusType } from "./interfaces";

const ExerciseAPIConfig = {
  URL: "http://localhost:8080/api/exercises",
  Timeout: 10000, // time out in milliseconds
};

export function DeleteExerciseData(
  ids: string,
  setStatusObj: (a: FetchStatusType) => void
) {
  // Set up options for the fetch request
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    signal: AbortSignal.timeout(ExerciseAPIConfig.Timeout),
  };

  // let status: FetchStatusType = { status: 0 };
  // // Make the fetch request with the provided options
  // fetch(ExerciseAPIConfig.URL + "/" + ids, options)
  //   .then((response) => {
  //     // Check if the request was successful
  //     if (!response.ok) {
  //       status.title = "Network response was not ok";
  //       status.message = response.statusText;
  //       status.dialogTimeout = 20;
  //       status.status = 1;
  //       setStatusObj(status);
  //       throw new Error("Network response was not ok");
  //     }
  //     // Parse the response as JSON
  //     return response.json();
  //   })
  //   .then((data) => {
  //     setStatusObj({ status: 0 });
  //     // Handle the JSON data
  //     // console.log(data);
  //   })
  //   .catch((error) => {
  //     // Handle any errors that occurred during the fetch
  //     status.title = "Network response was not ok";
  //     status.message = error.message;
  //     status.dialogTimeout = 20;
  //     status.status = 1;
  //     setStatusObj(status);
  //     console.error("Fetch error:", error);
  //   });
}

export function PutExerciseData(
  setSaveDExercise: (a: Exercise) => void,
  newExercise: Exercise,
  setStatusObj: (a: FetchStatusType) => void
) {
  // Set up options for the fetch request
  const options = {
    method: "PUT",
    body: JSON.stringify(newExercise),
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    signal: AbortSignal.timeout(ExerciseAPIConfig.Timeout),
  };

  let status: FetchStatusType = { status: 0 };
  // Make the fetch request with the provided options
  fetch(ExerciseAPIConfig.URL + "/" + newExercise.id, options)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        status.title = "Network response was not ok";
        status.message = response.statusText;
        status.dialogTimeout = 20;
        status.status = 1;
        setStatusObj(status);
        throw new Error("Network response was not ok");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      setStatusObj({ status: 0 });
      setSaveDExercise({
        id: data.id,
        description: data.description,
        name: data.name,
        steps: data.steps,
      });

      // Handle the JSON data
      // console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      status.title = "Network response was not ok";
      status.message = error.message;
      status.dialogTimeout = 20;
      status.status = 1;
      setStatusObj(status);
      console.error("Fetch error:", error);
    });
}

export function GetExerciseById(
  id: number,
  setStatusObj: (a: FetchStatusType) => void,
  setExercise: (a: Exercise) => void
) {
  // Set up options for the fetch request
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    signal: AbortSignal.timeout(ExerciseAPIConfig.Timeout),
  };
  let status: FetchStatusType = { status: 0 };
  // Make the fetch request with the provided options
  fetch(ExerciseAPIConfig.URL + "/" + id, options)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        status.title = "Network response was not ok";
        status.message = response.statusText;
        status.dialogTimeout = 20;
        status.status = 1;
        setStatusObj(status);
        throw new Error("Network response was not ok");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      setStatusObj({ status: 0 });
      setExercise({
        id: data.id,
        description: data.description,
        name: data.name,
        steps: data.steps,
      });
      // Handle the JSON data
      // console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      status.title = "Network response was not ok";
      status.message = error.message;
      status.dialogTimeout = 20;
      status.status = 1;
      setStatusObj(status);
      console.error("Fetch error:", error);
    });
}

export function PostExerciseData(
  setSavedExercise: (a: Exercise) => void,
  newExercise: Exercise,
  setStatusObj: (a: FetchStatusType) => void
) {
  // Set up options for the fetch request
  const options = {
    method: "POST",
    body: JSON.stringify(newExercise),
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    signal: AbortSignal.timeout(ExerciseAPIConfig.Timeout),
  };

  let status: FetchStatusType = { status: 0 };
  // Make the fetch request with the provided options
  fetch(ExerciseAPIConfig.URL, options)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        status.title = "Network response was not ok";
        status.message = response.statusText;
        status.dialogTimeout = 20;
        status.status = 1;
        setStatusObj(status);
        throw new Error("Network response was not ok");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      setStatusObj({ status: 0 });

      setSavedExercise({
        id: data.id,
        description: data.description,
        name: data.name,
        steps: data.steps,
      });

      // Handle the JSON data
      // console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      status.title = "Network response was not ok";
      status.message = error.message;
      status.dialogTimeout = 20;
      status.status = 1;
      setStatusObj(status);
      console.error("Fetch error:", error);
    });
}

export function GetExerciseDataList(
  setStatusObject: (a: FetchStatusType) => void,
  setShowError: (a: boolean) => void,
  handleLoadExcerise: (a: Exercise[]) => void,
  data: Exercise[]
) {
  // Set up options for the fetch request
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
    signal: AbortSignal.timeout(ExerciseAPIConfig.Timeout),
  };

  let status: FetchStatusType = { status: 0 };
  // Make the fetch request with the provided options
  fetch(ExerciseAPIConfig.URL, options)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        status.title = "Network response was not ok";
        status.message = response.statusText;
        status.dialogTimeout = 20;
        status.status = 1;
        setStatusObject(status);
        setShowError(true);

        // throw new Error("Network response was not ok");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Handle the JSON data
      // console.log(data);
      setStatusObject({ status: 0 });
      handleLoadExcerise(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      status.title = "Network response was not ok";
      status.message = error.message;
      status.dialogTimeout = 20;
      status.status = 1;
      setStatusObject(status);
      setShowError(true);
      // console.error("Fetch error:", error);
    });
}
