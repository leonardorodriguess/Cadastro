import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesServices';

import { useField } from '@unform/core';

type TAutoCompleteOption = {
  id : number,
  label: string;
}

interface IAutoCompleteCidadesProps{
  isExternalLoading?: boolean;
}

export function AutoCompleteCidades ({isExternalLoading} : IAutoCompleteCidadesProps) {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
  const {debounce} = useDebounce();
  
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);


  useEffect(() => {
    setIsLoading(true);

    debounce (() => {
      CidadesService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            // alert(result.message);
          } else {
            // console.log(result);

            setOpcoes(result.data.map(cidade => 
              ({
                id: cidade.id,
                label: cidade.nome
              })
            ));
          }
        });
    });

  }, [busca]);

  const autoCompoleteSelectedOption = useMemo(() => {
    if(!selectedId) return null;
    
    const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
    if(!selectedOption) return null;

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'

      disablePortal

      options={opcoes}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompoleteSelectedOption}
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {setSelectedId(newValue?.id); setBusca(''); clearError();} }
      popupIcon={(isLoading || isExternalLoading)? <CircularProgress size={28}/> : undefined }
      renderInput={(params) => (
        <TextField 
          {...params}
          label={'Cidade'}

          error={!!error} 
          helperText={error}
        />
      )}
    />
  );
}
