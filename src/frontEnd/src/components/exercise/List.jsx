import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ExerciseService } from "./Service/ProductService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export function ListExercise() {
  const [exercises, setExercises] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);

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

  const amountBodyTemplate = (rowData) => {
    return formatCurrency(rowData.stepNum);
  };

  const searchBodyTemplate = () => {
    return <Button icon="pi pi-search" />;
  };

  const priceBodyTemplate = (rowData) => {
    return rowData.name;
  };

  const allowExpansion = (rowData) => {
    return rowData.steps.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h5>Steps for {data.name}</h5>
        <DataTable value={data.steps}>
          <Column
            field="id"
            header="Id"
            sortable
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
          ></Column>
          <Column
            field="stepNum"
            header="Step #"
            body={amountBodyTemplate}
            sortable
          ></Column>
          <Column
            field="description"
            header="Description"
            sortable
          ></Column>
          <Column
            headerStyle={{ width: "4rem" }}
            body={searchBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
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
          sortable
        />
        <Column
          field="name"
          header="Name"
          sortable
          body={priceBodyTemplate}
        />
        <Column
          field="description"
          header="Description"
          sortable
        />
      </DataTable>
    </div>
  );
}
