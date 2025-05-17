import React from "react";
import { Table, Paper, Title, Loader, Text } from "@mantine/core";
import { useFetchData } from "../Hooks/useFetchData";  

const DataTable: React.FC<{ filterValues: any }> = ({ filterValues }) => {
  const { data = [], isLoading, error } = useFetchData();

  if (isLoading) return <Loader />;
  if (error) return <Text color="red">Failed to load table data</Text>;

  const filteredData = data.filter((item: any) => {
    if (!item) return false;

    const matchesMachineName =
      !filterValues?.machineName || item.machineName === filterValues.machineName;

    const matchesStatus =
      !filterValues?.status || item.status === filterValues.status;

    const matchesOutput =
      !filterValues?.output || item.output === Number(filterValues.output);

    const matchesDateRange = (() => {
      const [start, end] = filterValues?.dateRange || [null, null];
      if (!start && !end) return true;

      const itemDate = item.lastUpdated ? new Date(item.lastUpdated) : null;
      if (!itemDate) return false;

      if (start && new Date(start) > itemDate) return false;
      if (end && new Date(end) < itemDate) return false;

      return true;
    })();

    return matchesMachineName && matchesStatus && matchesOutput && matchesDateRange;
  });

  return (
    <Paper p="md" radius="md" shadow="md" withBorder>
      <Title order={4} mb="md" style={{ color: "#1c1c1c" }}>
        Machine Status Table
      </Title>

      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr style={{ backgroundColor: "#f1f3f5" }}>
            <th style={{ textAlign: "left", padding: "0.75rem" }}>Machine Name</th>
            <th style={{ textAlign: "center", padding: "0.75rem" }}>Status</th>
            <th style={{ textAlign: "right", padding: "0.75rem" }}>Output</th>
            <th style={{ textAlign: "center", padding: "0.75rem" }}>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row: any, index: number) => (
              <tr key={index} style={{ fontSize: "0.95rem" }}>
                <td style={{ textAlign: "left", padding: "0.6rem" }}>{row.machineName}</td>
                <td
                  style={{
                    textAlign: "center",
                    padding: "0.6rem",
                    color: row.status === "Active" ? "#2f9e44" : "#fa5252",
                    fontWeight: 500,
                  }}
                >
                  {row.status}
                </td>
                <td style={{ textAlign: "right", padding: "0.6rem" }}>{row.output}</td>
                <td style={{ textAlign: "center", padding: "0.6rem" }}>
                  {new Date(row.lastUpdated).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "1rem", color: "#868e96" }}>
                No data found for the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Paper>
  );
};

export default DataTable;
