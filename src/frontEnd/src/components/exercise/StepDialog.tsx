import { useEffect, useState } from "react";

import * as PropTypes from "prop-types";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";

export function StepDialog({ step, visible, setVisible }) {
  let tempId = 0;
  let tempName = "";
  let tempDescription = "";
  let tempStepNum = 0;
  let tempExerciseId = 0;
  if (step) {
    if (step.id) {
      tempId = step.id;
    }
    if (step.name) {
      tempName = step.name;
    }
    if (step.description) {
      tempDescription = step.description;
    }
    if (step.stepNum) {
      tempStepNum = step.StepNum;
    }
    if (step.exerciseId) {
      tempExerciseId = step.exerciseId;
    }
  }

  const [stepId, setStepId] = useState<number | null>(tempId);
  const [name, setName] = useState<string | null>(tempName);
  const [description, setDescription] = useState<string | null>(
    tempDescription
  );
  const [stepNum, setStepNum] = useState<number | null>(tempStepNum);
  const [exerciseId, setExerciseId] = useState<number | null>(tempExerciseId);

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
        label="Accept"
        icon="pi pi-check"
        onClick={() => saveStep(stepId, name, description, stepNum, exerciseId)}
      />
    </div>
  );

  function cancelEdit() {
    setStepId(0);
    setName("");
    setDescription("");
    setStepNum(0);
    setVisible(false);
    setExerciseId(0);
  }

  function headerContent() {
    if (name) {
      return "Edit '" + name + "'";
    } else {
      return "New";
    }
  }

  function saveStep(
    stepId: number | null,
    name: string | null,
    description: string | null,
    stepNum: number | null,
    exerciseId: number | null
  ) {
    console.log("stepId");
    console.log(stepId);
    console.log("name");
    console.log(name);
    console.log("description");
    console.log(description);
    console.log("stepNum");
    console.log(stepNum);
    console.log("exerciseId");
    console.log(exerciseId);
    setVisible(false);
  }

  useEffect(() => {
    if (step) {
      if (step.name) {
        setName(step.name);
      }
      if (step.id) {
        setStepId(step.id);
      }
      if (step.description) {
        setDescription(step.description);
      }
      if (step.stepNum) {
        setStepNum(step.stepNum);
      }
      if (step.exerciseId) {
        setExerciseId(step.exerciseId);
      }
    }
  }, [setName, setStepId, setDescription, setStepNum, setExerciseId, step]);

  // console.log("step");
  // console.log(step);
  return (
    <div className="card grid justify-content-center">
      <Dialog
        header={headerContent()}
        visible={visible}
        style={{ width: "35vw" }}
        onHide={() => cancelEdit()}
        footer={footerContent}
      >
        <div className="grid gap-3 align-items-center">
          <div className="col-1">
            <p>Name</p>
          </div>
          <div className="col-4">
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              size={20}
              className="p-inputtext-sm"
            />
          </div>
          <div className="col-3">
            <p>Step Number</p>
          </div>
          <div className="col-3">
            <InputNumber
              value={stepNum}
              onValueChange={(e) => setStepNum(e.value || 0)}
              showButtons
              min={0}
              max={10}
              size={3}
              className="p-inputtext-sm"
            />
          </div>
        </div>
        <div>
          <p>Description</p>
          <InputTextarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={80}
            className="p-inputtext-sm"
          />
        </div>
      </Dialog>
    </div>
  );
}

StepDialog.propTypes = {
  step: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};
