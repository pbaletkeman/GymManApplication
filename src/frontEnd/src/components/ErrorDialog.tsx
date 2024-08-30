import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export interface ErrorDialogType {
  title?: string | null | undefined;
  message?: string | null | undefined;
  dialogTimeout?: number | null | undefined;
}

export default function ErrorDialog({
  title,
  message,
  dialogTimeout,
}: ErrorDialogType) {
  let duration = 10;
  if (dialogTimeout) {
    duration = Math.abs(dialogTimeout);
  }

  const [visible, setVisible] = useState<boolean>(true);
  const [time, setTime] = useState<number>(duration);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        } else {
          return time - 1;
        }
      });
    }, 1000);
  }, []);

  const dialogHeader = (
    <div className="flex justify-content-center flex-wrap">
      {title ? title : "Error"}
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header={dialogHeader}
        visible={visible}
        style={{ width: "40vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <p className="m-0">
          {message ? message : "Sorry, a problem occurred."}
        </p>
        <div className="flex justify-content-center flex-wrap">
          <Button
            label={"Closing " + time + " seconds"}
            className="bg-red-600 border-3 border-round-3xl border-purple-900 border-double"
            onClick={() => setVisible(false)}
          />
        </div>
      </Dialog>
    </div>
  );
}
