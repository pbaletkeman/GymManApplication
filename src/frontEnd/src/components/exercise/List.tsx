import React, { useState, useEffect, useRef, useReducer } from "react";
import { DataTable, DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { ExerciseDialog } from "./ExerciseDialog";
import { StepDialog } from "./StepDialog";

import exercisesReducer, { ExerciseReducerFunction } from "./exercisesReducer";
import { Exercise, FetchStatusType, Step } from "./interfaces";
import ErrorDialog from "../ErrorDialog";
import { GetExerciseDataList } from "./API";

export function ListExercise() {
  const toast = useRef<Toast>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const [expandedRows, setExpandedRows] = useState<any[]>([]);

  const [exercises, dispatch] = useReducer<ExerciseReducerFunction>(
    exercisesReducer,
    []
  );

  const [visibleExercise, setVisibleExercise] = useState<boolean>(false);
  const [visibleStep, setVisibleStep] = useState<boolean>(false);
  const [currentEx, setCurrentEx] = useState<Exercise | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>({
    name: null,
    id: null,
    description: null,
    stepNum: null,
    exerciseId: null,
  });
  const [selectedExercises, setSelectedExercises] = useState<DataTableValue>();
  const [selectedSteps, setSelectedSteps] = useState<DataTableValue>();
  const [statusObj, setStatusObj] = useState<FetchStatusType>();

  const acceptDelete = () => {
    toast.current?.show({
      severity: "info",
      summary: "Deleting",
      detail: "Deleting Selected Records",
      life: 3000,
    });

    if (selectedExercises) {
      const deleteIDs = selectedExercises.flatMap((x: Exercise) => x.id);
      // console.log("deleteIDs");
      // console.log(deleteIDs);

      handleDeleteExcercise(deleteIDs.join(), setStatusObj);
      // setSelectedExercises([]);
    }
  };

  const allowExpansion = (rowData: { steps: Step[] }) => {
    return rowData.steps.length > 0;
  };
  ``;
  const collapseAll = () => {
    setExpandedRows([]);
  };

  const confirmDelete = (recordCount: number) => {
    let message = "Do you want to delete " + recordCount + " record(s)?";
    confirmDialog({
      message: message,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: acceptDelete,
      reject: rejectDelete,
    });
  };

  const deleteTemplate = (selected?: DataTableValue, bgColor?: string) => {
    if (selected && Array.isArray(selected) && selected.length > 0) {
      return (
        <Button
          icon="pi pi-times"
          onClick={() => {
            confirmDelete(selected.length);
          }}
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

  const exerciseBodyEditTemplate = (rowData: Exercise) => {
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

  const exerciseNameBodyTemplate = (rowData: Exercise) => {
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

  const expandAll = () => {
    let _expandedRows: any = {};

    exercises.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const formatCurrency = (value: any) => {
    return value;
  };

  const header = (
    <div className="grid">
      <div className="col-2">
        <Button
          label="New Exercise"
          onClick={() => loadExercise({ name: "", id: -1, steps: [] })}
          rounded
          raised
          className="p-2 border-3 border-white"
        />
      </div>
      <div className="col-8 flex justify-content-end align-items-center">
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
      <div className="col-2 flex justify-content-end align-items-center">
        {showError ? (
          <>
            <Tooltip target=".custom-target-icon" />
            <i
              className="custom-target-icon pi pi-circle-fill text-red-600"
              data-pr-tooltip="Offline"
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
              style={{ fontSize: "2rem" }}
            ></i>
          </>
        ) : (
          <>
            <Tooltip target=".custom-target-icon" />
            <i
              className="custom-target-icon pi pi-circle-fill text-cyan-700"
              data-pr-tooltip="Online"
              data-pr-position="right"
              data-pr-at="right+5 top"
              data-pr-my="left center-2"
              style={{ fontSize: "2rem" }}
            ></i>
          </>
        )}
      </div>
    </div>
  );

  const onRowCollapse = (event: { data: { name: any } }) => {
    toast.current?.show({
      severity: "success",
      summary: "Exercise Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowExpand = (event: { data: { name: any } }) => {
    toast.current?.show({
      severity: "info",
      summary: "Exercise Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const stepAddBodyTemplate = (rowData: Exercise) => {
    const step: Step = {
      exerciseId: rowData.id,
      name: null,
      id: null,
      description: null,
      stepNum: null,
    };
    return (
      <Button
        icon="pi pi-plus"
        onClick={() => loadStep(step)}
        rounded
        raised
        className="p-2 border-3 border-white"
      >
        Add Step
      </Button>
    );
  };

  const stepEditTemplateBody = (rowData: Step) => {
    return (
      <Button
        icon="pi pi-pencil"
        onClick={() => loadStep(rowData)}
        outlined
        raised
        size="small"
        className="p-2 border-3"
      >
        Edit
      </Button>
    );
  };

  const stepNumBodyTemplate = (rowData: Step) => {
    return formatCurrency(rowData.stepNum);
  };

  const tallyTemplate = (
    selected?: DataTableValue,
    total?: any[] | null,
    bgColor?: string
  ) => {
    return (
      <Button
        className={"p-2 border-none text-color " + bgColor + " cursor-auto	"}
      >
        {selected ? selected.length : 0} / {total ? total.length : 0} selected
      </Button>
    );
  };

  const rejectDelete = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "Canceling Action",
      life: 3000,
    });
    setSelectedExercises([]);
  };

  const rowExpansionTemplate = (data: Exercise) => {
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
          {tallyTemplate(selectedSteps, data.steps || null, "surface-50")}
          {deleteTemplate(selectedSteps, "surface-50")}
        </div>
      </div>
    );
  };

  // function handleAddExcerise(newExercise: Exercise) {
  //   console.log("AAAADDDD");
  //   // dispatch({
  //   //   type: "added",
  //   //   exercise: newExercise,
  //   // });
  // }

  // function handleChangeExcercise(exercise: Exercise) {
  //   dispatch({
  //     type: "changed",
  //     id: exercise,
  //   });
  // }

  function handleDeleteExcercise(
    exerciseIds: string,
    setStatusObj: (a: FetchStatusType) => void
  ) {
    dispatch({
      type: "deleted",
      batchIds: exerciseIds,
      data: exercises,
      setStatusObject: setStatusObj,
    });
  }

  function handleLoadExcerise(data: Exercise[]) {
    dispatch({
      type: "loaded",
      data: data,
    });
  }

  function loadExercise(rowData: Exercise) {
    if (rowData) {
      // copy the element
      let x = structuredClone(rowData);
      if (x.steps) {
        // remove the steps property, not needed for editing exercises
        x.steps = [];
      }
      setVisibleExercise(true);
      setCurrentEx(x);
    }
  }

  function loadStep(rowData: React.SetStateAction<Step>) {
    // copy the element
    setVisibleStep(true);
    if (rowData) {
      setCurrentStep(rowData);
    }
  }

  useEffect(() => {
    console.log("use effect");
    GetExerciseDataList(
      setStatusObj,
      setShowError,
      handleLoadExcerise,
      exercises
    );
  }, []);

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
          field="id"
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
        setStatusObj={setStatusObj}
      />
      <StepDialog
        step={currentStep}
        visible={visibleStep}
        setVisible={setVisibleStep}
      />
      <ConfirmDialog />
      {showError ? (
        <ErrorDialog
          title={statusObj?.title}
          message={statusObj?.message}
          dialogTimeout={statusObj?.dialogTimeout}
          status={statusObj?.status}
        />
      ) : (
        ""
      )}
    </div>
  );
}
