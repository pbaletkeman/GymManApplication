import { PropTypes } from "prop-types";
import { useRef } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { StepSingleService } from "./Service/StepSingleService";

export function EditDialog({ step, visible, setVisible, fromAPI }) {
  let currentStep;
  if (fromAPI) {
    // do data fetch here
    if (step && step.id) {
      currentStep = StepSingleService.getData(step.id);
    }
  } else {
    currentStep = step;
  }

  const toast = useRef(null);

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

  const headerContent = currentStep ? <div> {currentStep.name} </div> : "";

  if (!step) {
    return <div></div>;
  }

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Dialog
        header={headerContent}
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
              className="p-inputtext-sm"
              size={15}
            />
          </div>
          <div className="col-2">
            <label htmlFor="step">Step</label>
          </div>
          <div className="col-3">
            <InputText
              keyfilter="int"
              id="step"
              className="p-inputtext-sm"
              size={15}
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
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

EditDialog.propTypes = {
  step: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  fromAPI: PropTypes.bool,
};
