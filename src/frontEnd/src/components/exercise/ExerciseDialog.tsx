import * as PropTypes from "prop-types";

import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useReducer, useEffect, useState } from "react";
import { Exercise, FetchStatusType } from "./interfaces";

import exercisesReducer, { ExerciseReducerFunction } from "./exercisesReducer";

interface ExerciseDialogType {
  exercise: Exercise | null;
  visible: boolean;
  setVisible: (a: boolean) => void;
  setStatusObj: (a: FetchStatusType) => void;
}

export function ExerciseDialog({
  exercise,
  visible,
  setVisible,
  setStatusObj,
}: ExerciseDialogType) {
  let tempId = 0;
  let tempName = "";
  let tempDescription = "";
  if (exercise) {
    if (exercise.id) {
      tempId = exercise.id;
    }
    if (exercise.name) {
      tempName = exercise.name;
    }
    if (exercise.description) {
      tempDescription = exercise.description;
    }
  }

  const [exerciseId, setExerciseId] = useState<number>(tempId);
  const [name, setName] = useState<string>(tempName);
  const [description, setDescription] = useState<string>(tempDescription);
  const [statusItem, setStatusItem] = useState<FetchStatusType>();
  const [savedExercise, setSavedExercise] = useState<Exercise>();
  // const [statusObject, setStatusObject] = useState<FetchStatusType>();

  const [exercises, dispatch] = useReducer<ExerciseReducerFunction>(
    exercisesReducer,
    []
  );

  function handleAddExcerise(
    newExercise: Exercise,
    setStatusObject: (a: FetchStatusType) => void
  ) {
    /* need to display ok/error */
    console.log("ADD");
    dispatch({
      type: "added",
      exercise: newExercise,
      data: exercises,
      setStatusObject: setStatusObject,
      setSaved: setSavedExercise,
      batchIds: "",
    });
  }

  function handleChangeExcercise(
    exercise: Exercise,
    setStatusObject: (a: FetchStatusType) => void
  ) {
    /* need to display ok/error */
    console.log("UPDATE");

    // dispatch({
    //   type: "changed",
    //   id: exercise,
    // });
  }

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => cancelEdit()}
        className="p-button-text"
        autoFocus
      />
      <Button
        label={exerciseId && exerciseId > 0 ? "Update" : "Save"}
        icon="pi pi-check"
        onClick={() =>
          saveExercise(exerciseId, name, description, setStatusObj)
        }
      />
    </div>
  );

  function cancelEdit() {
    setExerciseId(0);
    setName("");
    setDescription("");
    setVisible(false);
  }

  function headerContent() {
    if (exerciseId && exerciseId > 0) {
      return "Edit '" + name + "'";
    } else {
      return "New";
    }
  }

  function saveExercise(
    exerciseId: number,
    name: string,
    description: string,
    setStatusObj: (a: FetchStatusType) => void
  ) {
    let updatedExercise: Exercise = {
      name: name,
      id: exerciseId,
      description: description,
      steps: [],
    };
    if (updatedExercise && updatedExercise.id && updatedExercise.id > 0) {
      handleChangeExcercise(updatedExercise, setStatusObj);
    } else {
      handleAddExcerise(updatedExercise, setStatusObj);
    }

    cancelEdit();

    setVisible(false);
  }

  useEffect(() => {
    if (exercise) {
      if (exercise.name) {
        setName(exercise.name);
      }
      if (exercise.id) {
        setExerciseId(exercise.id);
      }
      if (exercise.description) {
        setDescription(exercise.description);
      }
    }
  }, [setName, setExerciseId, setDescription, exercise]);

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header={headerContent()}
        visible={visible}
        style={{ width: "25vw" }}
        onHide={() => cancelEdit()}
        footer={footerContent}
      >
        <div>
          <p>Name</p>
        </div>
        <div>
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            size={45}
            className="p-inputtext-sm"
          />
        </div>
        <div>
          <p>Description</p>
          <InputTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={47}
            className="p-inputtext-sm"
          />
        </div>
      </Dialog>
    </div>
  );
}

ExerciseDialog.propTypes = {
  exercise: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};
