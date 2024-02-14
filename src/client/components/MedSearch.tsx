import React from 'react';

import { HStack, IconButton, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { GrSearch } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  query: string;
};

export default function MedSearch() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { query: '' },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        reset();
        navigate(`/medications?q=${values.query}`);
      })}
    >
      <HStack>
        <Input
          id="query"
          placeholder="search meds!"
          {...register('query')}
          size="sm"
          width="120px"
        />
        <IconButton
          aria-label="Search database"
          icon={<GrSearch />}
          isLoading={isSubmitting}
          type="submit"
          size="sm"
        >
          Search
        </IconButton>
      </HStack>
    </form>
  );
}
