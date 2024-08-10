import { PropTypes } from "prop-types";
import { useRef, useState, useEffect } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";

import { StepSingleService } from "./Service/StepSingleService.jsx";

import StepReducer from "../../reducer/stepReducer.js";

export function StepDialog({ step, visible, setVisible, fromAPI }) {
  const toast = useRef(null);

  let currentStep;
  if (fromAPI) {
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
  const [stepId, setStepId] = useState(currentStep && currentStep.id);
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
    if (currentStep && currentStep.id) {
      setStepId(currentStep.id);
    }
  }, [setName, setStepNum, setDescription, setStepId, currentStep]);

  function handleChange(value, target) {
    const item = currentStep;
    if (item) {
      if (!item.name) {
        item["name"] = activeStep["name"];
      }
      if (!item.stepNum) {
        item["stepNum"] = activeStep["stepNum"];
      }
      if (!item.description) {
        item["description"] = activeStep["description"];
      }
      if (!item.id) {
        item["id"] = activeStep["id"];
      }
    }
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
    if (activeStep) {
      setActiveStep({});
    }
    if (name) {
      setName("");
    }
    if (description) {
      setDescription("");
    }
    if (stepNum) {
      setStepNum(0);
    }
    if (stepId) {
      setStepId(-1);
    }
  }

  function saveRecord() {
    setVisible(false);
    if (activeStep) {
      console.log("activeStep");
      console.log(activeStep);
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
    let title = "New Item ";
    if (name) {
      title += " - '" + name + "'";
    }
    if (step && step.id) {
      title = "Edit '" + name + "'";
    }
    return (
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
        <Dialog
          header={title}
          visible={visible}
          style={{ width: "40vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
            destroyStep();
          }}
          footer={footerContent}
        >
          <div className="grid mt-2 align-items-center ">
            <div className="col-2">
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-6">
              <InputText
                id="name"
                value={name}
                onChange={(e) => handleChange(e.target.value, "name")}
                className="p-inputtext-sm"
                size={38}
              />
            </div>
            <div className="col-1">
              <label htmlFor="stepNum">Step</label>
            </div>
            <div className="col-3 pl-5">
              <InputNumber
                minFractionDigits={0}
                id="stepNum"
                value={stepNum}
                onValueChange={(e) => handleChange(e.target.value, "stepNum")}
                className="p-inputtext-sm"
                size={2}
                showButtons
                min={0}
                max={100}
              />
            </div>
          </div>
          <div className="grid mt-2">
            <div className="col-2">
              <label htmlFor="description">Description</label>
            </div>
            <div className="col-10">
              <InputTextarea
                rows={5}
                cols={66}
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

StepDialog.propTypes = {
  step: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  fromAPI: PropTypes.bool,
};
