import { PropTypes } from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

export function EditDialog({ step, visible, setVisible, fromAPI }) {
  const [headerTitle, setHeaderTitle] = useState("");
  const toast = useRef(null);

  const saveStep = () => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "Saving Record",
    });
  };

  useEffect(
    (fromAPI) => {
      if (fromAPI) {
        // do data fect here
        console.log("from API");
      } else {
        console.log("from memory");
      }
      if (step && step.name) {
        setHeaderTitle(step.name);
      }
    },
    [fromAPI, setHeaderTitle, step]
  );

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
        label="No"
        icon="pi pi-times"
        onClick={() => cancelEdit()}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => saveRecord(step)}
        autoFocus
      />
    </div>
  );

  const headerContent = <div> {headerTitle} </div>;

  if (!step) {
    return <div></div>;
  }
  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Dialog
        header={headerContent}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
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
