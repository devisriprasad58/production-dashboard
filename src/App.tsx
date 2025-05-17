// src/App.tsx
import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import DashboardLayout from './components/DashboardLayout';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <DashboardLayout />
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
