import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import TextField from '../ui/TextField';

export default function Input({ name, type = 'text', ...rest }) {
  const inputRef = useRef(null);
  const {
    fieldName, defaultValue, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <TextField
        ref={inputRef}
        defaultValue={defaultValue}
        hasError={error}
        type={type}
        {...rest}
      />
      { error && <span style={{ color: '#f93c3c', fontSize: '0.9em', marginTop: 8 }}>{error}</span> }
    </>
  );
}
