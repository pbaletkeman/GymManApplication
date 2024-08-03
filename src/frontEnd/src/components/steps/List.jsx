import { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { StepService } from "./Service/StepService";

export default function ListAllSteps() {
  const [steps, setSteps] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(null);

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
        emptyMessage="No steps found."
        selectionMode="checkbox"
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        scrollable
        scrollHeight="400px"
        className="mt-4"
      >
        <Column
          selectionMode="multiple"
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
    </div>
  );
}
