import React from "react";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  IconButton,
  ButtonGroup,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GrSearch } from "react-icons/gr";

export default function MedSearch() {
  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { query: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
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
