import { PropTypes } from "prop-types";
import { useRef, useState, useEffect } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";

import { StepSingleService } from "./Service/StepSingleService";

export function EditDialog({ step, visible, setVisible, fromAPI }) {
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
  const [description, setDescription] = useState(
    currentStep && currentStep.description
  );

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
  }, [setName, currentStep]);

  function handleChange(value, target) {
    switch (target) {
      case "name":
        setName(value);
        break;
      case "stepNum":
        setStepNum(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        throw new Error("Invalid Step  > HandleChange > Option");
    }
  }

  const saveStep = () => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "Saving Record",
    });
  };

  function saveRecord(step) {
    setVisible(false);
    console.log(JSON.stringify(step));
    saveStep();
  }

  function cancelEdit() {
    setVisible(false);
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
          onClick={() => saveRecord(step)}
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
