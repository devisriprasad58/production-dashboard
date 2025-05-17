import React, { useState } from "react";
import { Container, Title } from "@mantine/core";
import FilterSection from "./FilterSection";
import ProductionChart from "./ProductionChart";
import DataTable from "./DataTable";

const DashboardLayout: React.FC = () => {
  const [chart, setChart] = useState(false);
  const [filterValues, setFilterValues] = useState(null);

  const onSwitchChange = () => {
    setChart(!chart);
  };

  const onFilterChange = (filterValues: any) => {
    setFilterValues(filterValues);
  };

  return (
    <Container>
      <Title order={1} mb="md">
        Production Monitoring
      </Title>

      <FilterSection
        onFilterChange={onFilterChange}
        onSwitchChange={onSwitchChange}
      />

      {chart ? (
        <ProductionChart filterValues={filterValues} />
      ) : (
        <DataTable filterValues={filterValues} />
      )}
    </Container>
  );
};

export default DashboardLayout;
