import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ExerciseService } from "./Service/ProductService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { ConfirmDialog } from "primereact/confirmdialog";

import { ExerciseDialog } from "./ExerciseDialog";

export function ListExercise() {
  const toast = useRef(null);

  const [expandedRows, setExpandedRows] = useState(null);

  const [exercises, setExercises] = useState([]);
  const [visibleExercise, setVisibleExercise] = useState(false);
  const [currentEx, setCurrentEx] = useState({});
  const [selectedExercises, setSelectedExercises] = useState(null);
  const [selectedSteps, setSelectedSteps] = useState(null);

  useEffect(() => {
    ExerciseService.getExercisesWithStepsSmall().then((data) =>
      setExercises(data)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Exercise Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Exercise Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};

    exercises.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const formatCurrency = (value) => {
    return value;
  };

  const stepNumBodyTemplate = (rowData) => {
    return formatCurrency(rowData.stepNum);
  };

  const exerciseNameBodyTemplate = (rowData) => {
    const toolClass = "exercise" + rowData.id;
    return (
      <>
        <Tooltip target={"." + toolClass} />
        <p
          className={toolClass}
          data-pr-tooltip={rowData.description}
          data-pr-position="left"
          data-pr-at="right-250 top"
          data-pr-my="left center-2"
        >
          {rowData.name}
        </p>
      </>
    );
  };

  const allowExpansion = (rowData) => {
    return rowData.steps.length > 0;
  };

  const stepEditTemplateBody = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        onClick={() => console.log("Step " + rowData.id)}
        outlined
        raised
        size="small"
        className="p-2 border-3"
      >
        Edit
      </Button>
    );
  };

  function loadExercise(rowData) {
    // copy the element
    let x = structuredClone(rowData);
    // remove the steps property, not needed for editing exercises
    delete x.steps;
    setVisibleExercise(true);
    setCurrentEx(x);
  }

  const exerciseBodyEditTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        onClick={() => loadExercise(rowData)}
        rounded
        raised
        className="p-2 border-3 border-white"
        tooltip={rowData.description}
      >
        Edit
      </Button>
    );
  };

  const stepAddBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-plus"
        onClick={() => loadExercise(rowData)}
        rounded
        raised
        className="p-2 border-3 border-white"
      >
        Add Step
      </Button>
    );
  };

  const deleteTemplate = (selected, bgColor) => {
    if (selected && selected.length > 0) {
      return (
        <Button
          icon="pi pi-times"
          onClick={() => confirmDelete(selected.length)}
          className="p-2 border-white-alpha-20 text-color bg-red-800"
        >
          &nbsp;Delete Selected
        </Button>
      );
    } else {
      return (
        <Button
          className={"p-2 border-none text-color " + bgColor + " cursor-auto	"}
        >
          &nbsp;
        </Button>
      );
    }
  };

  const tallyTemplate = (selected, total, bgColor) => {
    return (
      <Button
        className={"p-2 border-none text-color " + bgColor + " cursor-auto	"}
      >
        {selected ? selected.length : 0} / {total ? total.length : 0} selected
      </Button>
    );
  };

  const rowExpansionTemplate = (data) => {
    console.log("setSelectedSteps");
    console.log(selectedSteps);
    return (
      <div className="p-3">
        <h5>Steps for {data.name}</h5>
        <h5>{data.description}</h5>
        <DataTable
          value={data.steps}
          selectionMode={"checkbox"}
          selection={selectedSteps}
          onSelectionChange={(e) => setSelectedSteps(e.value)}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="id"
            header="Id"
            sortable
            body={stepEditTemplateBody}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
          ></Column>
          <Column
            field="stepNum"
            header="Step #"
            body={stepNumBodyTemplate}
            sortable
          ></Column>
          <Column
            field="description"
            header="Description"
            sortable
          ></Column>
        </DataTable>
        <div className="flex justify-content-start flex-wrap align-items-center gap-2 pt-4">
          {tallyTemplate(selectedSteps, data.steps, "surface-50")}
          {deleteTemplate(selectedSteps, "surface-50")}
        </div>
      </div>
    );
  };

  const header = (
    <div className="grid">
      <div className="col-2">
        <Button label="New Exercise" />
      </div>
      <div className="col-10 flex justify-content-end align-items-center">
        <Button
          icon="pi pi-plus"
          label="Expand All"
          onClick={expandAll}
          text
        />
        <Button
          icon="pi pi-minus"
          label="Collapse All"
          onClick={collapseAll}
          text
        />
      </div>
    </div>
  );

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirmDelete = (recordCount) => {
    let message = "Do you want to delete " + recordCount + " record(s)?";
    confirmDialog({
      message: message,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        value={exercises}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        onRowExpand={onRowExpand}
        onRowCollapse={onRowCollapse}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        header={header}
        selectionMode={"checkbox"}
        selection={selectedExercises}
        onSelectionChange={(e) => setSelectedExercises(e.value)}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column
          expander={allowExpansion}
          style={{ width: "5rem" }}
        />
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>

        <Column
          field="id"
          header="id"
          body={exerciseBodyEditTemplate}
          sortable
        />
        <Column
          field="name"
          header="Name"
          sortable
          body={exerciseNameBodyTemplate}
        />
        <Column
          style={{ width: "10rem" }}
          body={stepAddBodyTemplate}
        />
      </DataTable>
      <div className="flex justify-content-start flex-wrap align-items-center gap-2 pt-4">
        {tallyTemplate(selectedExercises, exercises, "surface-ground")}
        {deleteTemplate(selectedExercises, "surface-ground")}
      </div>

      <ExerciseDialog
        exercise={currentEx}
        visible={visibleExercise}
        setVisible={setVisibleExercise}
      />
      <ConfirmDialog />
    </div>
  );
}
