import { PropTypes } from "prop-types";

import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";

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
  }, [setName, exercise]);

  function saveExercise(exerciseId, name, description) {
    console.log("exerciseId");
    console.log(exerciseId);
    console.log("name");
    console.log(name);
    console.log("description");
    console.log(description);
    setVisible(false);
  }
  function cancelEdit() {
    setVisible(false);
  }

  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => cancelEdit()}
        className="p-button-text"
        autoFocus
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => saveExercise(exerciseId, name, description)}
      />
    </div>
  );

  function headerContent() {
    if (name) {
      return "Edit '" + name + "'";
    } else {
      return "New";
    }
  }

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
          />
        </div>
        <div>
          <p>Description</p>
          <InputTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={47}
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
