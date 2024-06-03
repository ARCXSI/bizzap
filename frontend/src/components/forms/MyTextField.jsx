import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function MyTextField(props) {
  const { label, name, control } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          id="standard-basic"
          onChange={onChange}
          value={value}
          label={label}
          variant="standard"
          className='formsFields'
          error={!!error} // explicação abaixo
          helperText={error?.message}
        />
      )}
    />

    // Dupla Negação (!!):

    // A expressão!!error converte o valor de error em um booleano.
    // error pode ser um objeto(se houver um erro) ou undefined / null(se não houver erro).
    // A primeira negação!error converte o valor para seu valor booleano inverso.Ou seja, se error for um objeto, !error se torna false.Se error for undefined ou null, !error se torna true.
    // A segunda negação!(!error) inverte o valor novamente, resultando em true se error for um objeto(há erro) e false se error for undefined ou null(não há erro).
  );
}