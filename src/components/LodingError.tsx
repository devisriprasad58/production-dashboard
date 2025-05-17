// src/components/LoadingError/LoadingError.tsx
import React from 'react';
import { Loader, Alert } from '@mantine/core';

interface LoadingErrorProps {
  isLoading: boolean;
  error: string | null;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ isLoading, error }) => {
  if (isLoading) return <Loader />;
  if (error) return <Alert color="red">{error}</Alert>;
  return null;
};

export default LoadingError;
