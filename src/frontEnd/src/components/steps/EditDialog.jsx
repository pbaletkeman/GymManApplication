import { PropTypes } from "prop-types";
import { useRef, useState, useEffect } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";

import { StepSingleService } from "./Service/StepSingleService";

import StepReducer from "./../../reducer/stepReducer.js";

export function EditDialog({ step, visible, setVisible, fromAPI }) {
  const toast = useRef(null);

  let currentStep;
  if (fromAPI) {
    // do data fetch here
    // do data fetch here
    if (step && step.id) {
      currentStep = StepSingleService.getData(step.id);
    } else {
      currentStep = {};
    }
  } else {
    currentStep = step;
  }

  const [name, setName] = useState(currentStep && currentStep.name);
  const [stepNum, setStepNum] = useState(currentStep && currentStep.stepNum);
  const [description, setDescription] = useState(
    currentStep && currentStep.description
  );
  const [activeStep, setActiveStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep && currentStep.name) {
      setName(currentStep.name);
    }
    if (currentStep && currentStep.stepNum) {
      setStepNum(currentStep.stepNum);
    }
    if (currentStep && currentStep.description) {
      setDescription(currentStep.description);
    }
  }, [setName, setStepNum, setDescription, currentStep]);

  function handleChange(value, target) {
    const item = currentStep;
    switch (target) {
      case "name":
        setName(value);
        item.name = value;
        break;
      case "stepNum":
        setStepNum(value);
        item.stepNum = value;
        break;
      case "description":
        setDescription(value);
        item.description = value;
        break;
      default:
        throw new Error("Invalid Step  > HandleChange > Option");
    }
    setActiveStep(item);
    console.log("handleChange");
    console.log(item);
  }

  function destroyStep() {
    setActiveStep({});
  }

  function saveRecord() {
    setVisible(false);
    if (
      activeStep.name === activeStep.description &&
      activeStep.description === activeStep.stepNum
    ) {
      console.log("no changes");
      return;
    }

    StepReducer(activeStep, "action");
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "Saving Record",
    });
    console.log(JSON.stringify(activeStep));
    destroyStep();
  }

  function cancelEdit() {
    setVisible(false);
    destroyStep();
  }

  if (currentStep) {
    const footerContent = (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => cancelEdit()}
          className="p-button-text"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={() => saveRecord()}
          autoFocus
        />
      </div>
    );

    return (
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
        <Dialog
          header={name}
          visible={visible}
          style={{ width: "40vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          footer={footerContent}
        >
          <div className="grid justify-content-center">
            <div className="col-2">
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-3">
              <InputText
                id="name"
                value={name}
                onChange={(e) => handleChange(e.target.value, "name")}
                className="p-inputtext-sm"
                size={15}
              />
            </div>
            <div className="col-2">
              <label htmlFor="stepNum">Step</label>
            </div>
            <div className="col-3">
              <InputNumber
                minFractionDigits={0}
                id="stepNum"
                value={stepNum}
                onValueChange={(e) => handleChange(e.target.value, "stepNum")}
                className="p-inputtext-sm"
                size={15}
                showButtons
                min={0}
                max={100}
              />
            </div>
          </div>
          <div className="grid justify-content-center">
            <div className="col-2">
              <label htmlFor="description">Description</label>
            </div>
            <div className="col-8">
              <InputTextarea
                rows={5}
                cols={52}
                id="description"
                value={description}
                onChange={(e) => handleChange(e.target.value, "description")}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  } else {
    return <div></div>;
  }
}

EditDialog.propTypes = {
  step: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  fromAPI: PropTypes.bool,
};
