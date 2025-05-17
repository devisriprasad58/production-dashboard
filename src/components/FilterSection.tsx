import React from "react";
import "./SwitchStyles.css";
import {
  Button,
  Group,
  Autocomplete,
  Stack,
  Paper,
  Title,
  Switch,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import tableData from "../data/data.json"; // adjust path as needed

const FilterSection: React.FC<any> = ({ onFilterChange, onSwitchChange }) => {
  const form = useForm<any>({
    initialValues: {
      machineName: "",
      status: "",
      output: "",
      dateRange: [null, null],
    },
  });

  // Prepare autocomplete data arrays from your JSON data
  const machineNames = Array.from(
    new Set(tableData.map((item: any) => item.machineName))
  );
  const statuses = Array.from(
    new Set(tableData.map((item: any) => item.status))
  );
  const outputs = Array.from(
    new Set(tableData.map((item: any) => String(item.output)))
  ); // convert outputs to strings for autocomplete

  const handleSubmit = (values: any) => {
    onFilterChange(values);
  };

  return (
    <Paper shadow="sm" p="md" withBorder radius="md">
      <Title order={4} mb="md">
        Filters
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Group grow align="flex-end" wrap="wrap">
            {/* Machine Name Autocomplete */}
            <Autocomplete
              label="Machine Name"
              placeholder="Select or type machine name"
              data={machineNames}
              {...form.getInputProps("machineName")}
              clearable
            />

            {/* Status Autocomplete */}
            <Autocomplete
              label="Status"
              placeholder="Select or type status"
              data={statuses}
              {...form.getInputProps("status")}
              clearable
            />

            {/* Output Autocomplete */}
            <Autocomplete
              label="Output"
              placeholder="Select or type output"
              data={outputs}
              {...form.getInputProps("output")}
              clearable
            />

            {/* Date Range */}
            <DatePickerInput
              type="range"
              label="Date Range"
              placeholder="Select date range"
              {...form.getInputProps("dateRange")}
            />

            <Group style={{ marginTop: "auto" }}>
              <Button type="submit" variant="filled">
                Apply Filters
              </Button>
            </Group>
          </Group>
        </Stack>

        <Group mt="md">
          <Switch
            onLabel="Chart"
            offLabel="Table"
            onChange={onSwitchChange}
            classNames={{
              track: "custom-switch-track",
              thumb: "custom-switch-thumb",
            }}
            styles={{
              track: {
                width: 120,
                height: 40,
              },
            }}
          />
        </Group>
      </form>
    </Paper>
  );
};

export default FilterSection;
