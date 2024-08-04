import { PropTypes } from "prop-types";
import { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { StepService } from "./Service/StepService";
import { EditDialog } from "./EditDialog";

export default function ListAllSteps() {
  const [steps, setSteps] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [fromAPI, setFromAPI] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [editStep, setEditStep] = useState(null);

  useEffect(() => {
    StepService.getStepsMedium().then((data) => {
      setSteps(getSteps(data));
      setLoading(false);
    });
    initFilters();
  }, []);

  const getSteps = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      id: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      name: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      stepNum: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      description: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
    });
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  function GetSelectedCount({ selectedLength, totalLength }) {
    if (totalLength && totalLength.length) {
      if (selectedLength && selectedLength.length) {
        return selectedLength.length + "/" + totalLength.length;
      } else {
        return "0/" + totalLength.length;
      }
    } else {
      return "error";
    }
  }
  const toast = useRef(null);

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
    confirmDialog({
      message: "Do you want to delete this " + recordCount + " record(s)?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  function DeleteButton({ selectedLength }) {
    if (selectedLength && selectedLength.length && selectedLength.length > 0) {
      return (
        <>
          <Toast ref={toast} />
          <ConfirmDialog />
          <Button
            label="Delete"
            className="text-xs bg-red-500 border-round-1g border-white border-1 text-white"
            onClick={() => confirmDelete(selectedLength.length)}
            icon="pi pi-times"
          />
        </>
      );
    } else {
      return <></>;
    }
  }

  DeleteButton.propTypes = {
    selectedLength: PropTypes.array,
  };

  const paginatorLeft = (selectedLength, totalLength) => {
    return (
      <div className="grid align-items-center">
        <div className="text-xs col">
          <GetSelectedCount
            selectedLength={selectedLength}
            totalLength={totalLength}
          />
        </div>
        <div className="col">
          <DeleteButton selectedLength={selectedLength} />
        </div>
      </div>
    );
  };

  const paginatorRight = () => {
    // empty element so that layout is balanced, otherwise things are not centered
    return <div></div>;
  };

  function showEditDialog(step) {
    setEditStep(step);
    setShowEdit(true);
  }

  const editTemplate = (step) => {
    return (
      <Button
        label="Edit"
        className="text-xs border-round-1g"
        onClick={() => showEditDialog(step)}
      />
    );
  };

  return (
    <div className="card">
      <DataTable
        value={steps}
        showGridlines
        stripedRows
        size={"small"}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={["name", "id", "stepNum", "description"]}
        header={header}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        paginatorLeft={() => paginatorLeft(selectedProducts, steps)}
        paginatorRight={() => paginatorRight(selectedProducts, steps)}
        emptyMessage="No steps found."
        selectionMode="checkbox"
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        scrollable
        scrollHeight="400px"
        className="mt-4"
        style={{ background: "blue" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          body={editTemplate}
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="id"
          header="ID"
          filter
          filterPlaceholder="Search by id"
          style={{ minWidth: "5rem" }}
          sortable
          frozen
        />
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "20rem" }}
          sortable
          frozen
        />
        <Column
          field="stepNum"
          header="Step Number"
          filter
          filterPlaceholder="Search by step number"
          style={{ minWidth: "12rem" }}
          sortable
          frozen
        />
        <Column
          field="description"
          header="Description"
          filter
          filterPlaceholder="Search by description"
          style={{ minWidth: "12rem" }}
          sortable
          frozen
        />
      </DataTable>
      <EditDialog
        step={editStep}
        visible={showEdit}
        setVisible={setShowEdit}
        fromAPI={fromAPI}
      />
      ;
    </div>
  );
}
