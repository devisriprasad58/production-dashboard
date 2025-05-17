// src/components/LanguageSwitcher/LanguageSwitcher.tsx
import React from 'react';
import { Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange: any = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      data={[
        { value: 'en', label: 'English' },
        { value: 'ko', label: 'Korean' },
      ]}
    />
  );
};

export default LanguageSwitcher;
