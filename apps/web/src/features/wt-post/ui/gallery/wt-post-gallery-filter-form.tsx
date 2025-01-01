"use client";

import { ComponentProps, useMemo } from "react";
import { Box, Button, Collapse, IconButton, NoSsr, Stack, Typography, useTheme } from "@mui/material";
import { z } from "zod";
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectEntries, zodObjectKeys } from "@pency/util";
import { CheckboxButton, IcRoundRefreshIcon } from "@pency/ui/components";
import { hideScrollX } from "@pency/ui/util";
import { CREATION_TYPE_LABEL, PAIR_LABEL } from "@/shared/config/webtoon/const";
import { useCreationTypes } from "../../model/creation-types-provider";
import { FilterFormToggleProvider, useFilterFormToggle } from "../../model/filter-form-toggle-provider";
import { usePairs } from "../../model/pairs-provider";

// ----------------------------------------------------------------------

const schema = z.object({
  creationTypes: z.enum(zodObjectKeys(CREATION_TYPE_LABEL)).array(),
  pairs: z.enum(zodObjectKeys(PAIR_LABEL)).array(),
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

const useFilterFormContext = () => useFormContext<Schema>();

// ----------------------------------------------------------------------

type FilterFormProps = {
  defaultValue?: Partial<Schema>;
  onSubmit: SubmitHandler<Schema>;
  children?: React.ReactNode;
};

const FilterForm = ({ defaultValue, onSubmit, children }: FilterFormProps) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      creationTypes: defaultValue?.creationTypes ?? [],
      pairs: defaultValue?.pairs ?? [],
    },
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

// ----------------------------------------------------------------------

const SaveSubmit = () => {
  return (
    <Button type="submit" variant="contained" size="small">
      저장
    </Button>
  );
};

// ----------------------------------------------------------------------

type ResetProps = {
  onReset: SubmitHandler<Schema>;
};

const Reset = ({ onReset }: ResetProps) => {
  const { handleSubmit, setValue } = useFilterFormContext();

  return (
    <IconButton
      size="small"
      onClick={() => {
        setValue("creationTypes", []);
        setValue("pairs", []);

        handleSubmit((data) => {
          onReset?.(data);
        })();
      }}
    >
      <IcRoundRefreshIcon />
    </IconButton>
  );
};

// ----------------------------------------------------------------------

const CreationTypesField = () => {
  const { control } = useFilterFormContext();

  const creationTypeEntries = useMemo(() => objectEntries(CREATION_TYPE_LABEL), []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2" sx={{ width: "4rem", flexShrink: 0, fontWeight: 600 }}>
        창작유형
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}>
        <Controller
          control={control}
          name="creationTypes"
          render={({ field }) => (
            <>
              {creationTypeEntries.map(([value, label]) => (
                <CheckboxButton
                  key={value}
                  checked={field.value.includes(value)}
                  onChange={() => {
                    field.onChange(
                      field.value.includes(value) ? field.value.filter((v) => v !== value) : [...field.value, value],
                    );
                  }}
                  slotProps={{ button: { size: "small", sx: { flexShrink: 0 } } }}
                >
                  {label}
                </CheckboxButton>
              ))}
            </>
          )}
        />
      </Box>
    </Box>
  );
};

// ----------------------------------------------------------------------

const PairsField = () => {
  const { control } = useFilterFormContext();

  const pairEntries = useMemo(() => objectEntries(PAIR_LABEL), []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2" sx={{ width: "4rem", flexShrink: 0, fontWeight: 600 }}>
        페어
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}>
        <Controller
          control={control}
          name="pairs"
          render={({ field }) => (
            <>
              {pairEntries.map(([value, label]) => (
                <CheckboxButton
                  key={value}
                  checked={field.value.includes(value)}
                  onChange={() => {
                    field.onChange(
                      field.value.includes(value) ? field.value.filter((v) => v !== value) : [...field.value, value],
                    );
                  }}
                  slotProps={{ button: { size: "small", sx: { flexShrink: 0 } } }}
                >
                  {label}
                </CheckboxButton>
              ))}
            </>
          )}
        />
      </Box>
    </Box>
  );
};

// ----------------------------------------------------------------------

const WtPostGalleryFilterFormFn = (rest: ComponentProps<typeof FilterFormToggleProvider>) => {
  return <FilterFormToggleProvider {...rest} />;
};

const CollapseFormFn = () => {
  const { creationTypes, setCreationTypes } = useCreationTypes();
  const { pairs, setPairs } = usePairs();

  if (!creationTypes || !setCreationTypes) {
    throw new Error(`<부모로 <WtPostCreationTypes /> 컴포넌트가 있어야 합니다.`);
  }

  if (!pairs || !setPairs) {
    throw new Error(`<부모로 <WtPostPairs /> 컴포넌트가 있어야 합니다.`);
  }

  const isOpen = useFilterFormToggle((s) => s.isOpen);
  const close = useFilterFormToggle((s) => s.close);

  const theme = useTheme();

  const saveFilter: SubmitHandler<Schema> = (data) => {
    setCreationTypes(data.creationTypes);
    setPairs(data.pairs);
    close();
  };

  const resetFilter: SubmitHandler<Schema> = (data) => {
    setCreationTypes(data.creationTypes);
    setPairs(data.pairs);
    close();
  };

  return (
    <NoSsr>
      <Collapse in={isOpen} unmountOnExit>
        <FilterForm
          defaultValue={{
            creationTypes,
            pairs,
          }}
          onSubmit={saveFilter}
        >
          <Stack
            spacing={2}
            sx={{ bgcolor: theme.vars.palette.background.paper, borderRadius: 1, px: "20px", py: "12px" }}
          >
            <CreationTypesField />
            <PairsField />

            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              <Reset onReset={resetFilter} />
              <SaveSubmit />
            </Box>
          </Stack>
        </FilterForm>
      </Collapse>
    </NoSsr>
  );
};

export const WtPostGalleryFilterForm = Object.assign(WtPostGalleryFilterFormFn, {
  CollapseForm: CollapseFormFn,
});
