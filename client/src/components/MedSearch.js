import React from "react";
import { useHistory } from "react-router-dom";
import { Input, IconButton, HStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GrSearch } from "react-icons/gr";

export default function MedSearch() {
  const history = useHistory();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { query: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        reset();
        history.push(`/medications?q=${values.query}`);
      })}
    >
      <HStack>
        <Input
          id="query"
          placeholder="search meds!"
          {...register("query")}
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
