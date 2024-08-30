import { ErrorDialogType } from "../ErrorDialog";
import { Exercise } from "./interfaces";

export function PostExerciseData(newExercise: Exercise) {
  // Set up options for the fetch request
  const options = {
    method: "POST",
    body: JSON.stringify(newExercise),
    headers: {
      "Content-Type": "application/json", // Set content type to JSON
    },
  };

  let err: ErrorDialogType = {};
  // Make the fetch request with the provided options
  fetch("http://localhost:8080/api/exercises", options)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        err.title = "Network response was not ok";
        err.message = response.statusText;
        err.dialogTimeout = 20;

        throw new Error("Network response was not ok");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Handle the JSON data
      // console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      err.title = "Network response was not ok";
      err.message = error.message;
      err.dialogTimeout = 20;
      console.error("Fetch error:", error);
    });
}

export function GetExerciseDataList(
  setErrorObject: (a: any) => void,
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
  };

  let err: ErrorDialogType = {};
  // Make the fetch request with the provided options
  fetch("http://localhost:8080/api/exercises", options)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        err.title = "Network response was not ok";
        err.message = response.statusText;
        err.dialogTimeout = 20;
        setErrorObject(err);
        setShowError(true);

        // throw new Error("Network response was not ok");
      }
      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Handle the JSON data
      // console.log(data);
      handleLoadExcerise(data);
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      err.title = "Network response was not ok";
      err.message = error.message;
      err.dialogTimeout = 20;
      setErrorObject(err);
      setShowError(true);
      // console.error("Fetch error:", error);
    });
}
