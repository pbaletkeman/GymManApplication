import * as PropTypes from "prop-types";

import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import React from "react";
import { Exercise } from "./interfaces";

export function ExerciseDialog({ exercise, visible, setVisible }) {
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

  const [exerciseId, setExerciseId] = useState(tempId);
  const [name, setName] = useState(tempName);
  const [description, setDescription] = useState(tempDescription);

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
        label="Update"
        icon="pi pi-check"
        onClick={() => saveExercise(exerciseId, name, description)}
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
    if (name) {
      return "Edit '" + name + "'";
    } else {
      return "New";
    }
  }

  function saveExercise(exerciseId, name, description) {
    let updatedExercise: Exercise = { name: "", id: -1, steps: [] };
    console.log("-------------");
    console.log("save");
    updatedExercise.id = exerciseId;
    updatedExercise.name = name;
    updatedExercise.description = description;
    console.log(updatedExercise);
    console.log("-------------");
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

  console.log("exercise");
  console.log(exercise);
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
