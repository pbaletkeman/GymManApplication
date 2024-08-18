import { useEffect, useState } from "react";

import { PropTypes } from "prop-types";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export function StepDialog({ step, visible, setVisible }) {
  let tempId = 0;
  let tempName = "";
  let tempDescription = "";
  let tempStepNum = 0;
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
  }

  const [stepId, setStepId] = useState(tempId);
  const [name, setName] = useState(tempName);
  const [description, setDescription] = useState(tempDescription);
  const [stepNum, setStepNum] = useState(tempStepNum);

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
    }
  }, [setName, step]);

  function saveStep(stepId, name, description, stepNum) {
    console.log("stepId");
    console.log(stepId);
    console.log("name");
    console.log(name);
    console.log("description");
    console.log(description);
    console.log("stepNum");
    console.log(stepNum);
    setVisible(false);
  }
  function cancelEdit() {
    setStepId(0);
    setName("");
    setDescription("");
    setStepNum(0);
    setVisible(false);
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
        label="Accept"
        icon="pi pi-check"
        onClick={() => saveStep(stepId, name, description)}
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

  console.log("step");
  console.log(step);
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
              onValueChange={(e) => setStepNum(e.value)}
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
            value={description}
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
