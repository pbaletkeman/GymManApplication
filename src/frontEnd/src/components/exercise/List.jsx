import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ExerciseService } from "./Service/ProductService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { ExerciseDialog } from "./ExerciseDialog";

export function ListExercise() {
  const toast = useRef(null);

  const [expandedRows, setExpandedRows] = useState(null);

  const [exercises, setExercises] = useState([]);
  const [visibleExercise, setVisibleExercise] = useState(false);
  const [currentEx, setCurrentEx] = useState({});

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

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h5>Steps for {data.name}</h5>
        <h5>{data.description}</h5>
        <DataTable value={data.steps}>
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
      </div>
    );
  };

  const header = (
    <div className="grid ">
      <div className="col-2 ">
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
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column
          expander={allowExpansion}
          style={{ width: "5rem" }}
        />
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
      </DataTable>

      <ExerciseDialog
        exercise={currentEx}
        visible={visibleExercise}
        setVisible={setVisibleExercise}
      />
    </div>
  );
}
