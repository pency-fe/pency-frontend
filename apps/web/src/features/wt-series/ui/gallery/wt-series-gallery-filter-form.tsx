"use client";

import { ComponentProps, useMemo, useState } from "react";
import { Box, Button, Collapse, CollapseProps, IconButton, NoSsr, Stack, Typography, useTheme } from "@mui/material";
import { z } from "zod";
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQueryString, objectEntries, zodObjectKeys } from "@pency/util";
import { CheckboxButton, IcRoundRefreshIcon } from "@pency/ui/components";
import { hideScrollX } from "@pency/ui/util";
import { CREATION_TYPE_LABEL, PAIR_LABEL } from "@/shared/config/webtoon/const";
import { useCreationTypes } from "../../model/creation-types-context";
import {
  createFilterFormToggleStore,
  FilterFormToggleContext,
  useFilterFormToggle,
} from "../../model/filter-form-toggle-context";
import { usePairs } from "../../model/pairs-context";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// ----------------------------------------------------------------------

const FilterFormToggleProvider = ({ children }: { children?: React.ReactNode }) => {
  const [filterFormToggleStore] = useState(createFilterFormToggleStore);

  return <FilterFormToggleContext.Provider value={filterFormToggleStore}>{children}</FilterFormToggleContext.Provider>;
};

// ----------------------------------------------------------------------

const schema = z.object({
  creationTypes: z.enum(zodObjectKeys(CREATION_TYPE_LABEL)).array(),
  pairs: z.enum(zodObjectKeys(PAIR_LABEL)).array(),
});

type Schema = z.infer<typeof schema>;

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
  const { handleSubmit, setValue } = useFormContext<Schema>();

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
  const { control } = useFormContext<Schema>();

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
  const { control } = useFormContext<Schema>();

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

const WtSeriesGalleryFilterFormFn = (rest: ComponentProps<typeof FilterFormToggleProvider>) => {
  return <FilterFormToggleProvider {...rest} />;
};

const CollapseFormFn = (rest: CollapseProps) => {
  const { creationTypes, setCreationTypes } = useCreationTypes();
  const { pairs, setPairs } = usePairs();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (!creationTypes) {
    throw new Error(`<부모로 <WtSeriesCreationTypes /> 컴포넌트가 있어야 합니다.`);
  }

  if (!pairs) {
    throw new Error(`<부모로 <WtSeriesPairs /> 컴포넌트가 있어야 합니다.`);
  }

  const isOpen = useFilterFormToggle((s) => s.isOpen);
  const close = useFilterFormToggle((s) => s.close);

  const theme = useTheme();

  const saveFilter: SubmitHandler<Schema> = (data) => {
    if (!setCreationTypes || !setPairs) {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("creationTypes");
      data.creationTypes.forEach((creationType) => {
        params.append("creationTypes", creationType);
      });

      params.delete("pairs");
      data.pairs.forEach((pair) => {
        params.append("pairs", pair);
      });

      router.replace(`${pathname}${createQueryString(params)}`);
      close();
      return;
    }

    setCreationTypes(data.creationTypes);
    setPairs(data.pairs);
    close();
  };

  const resetFilter: SubmitHandler<Schema> = (data) => {
    if (!setCreationTypes || !setPairs) {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("creationTypes");
      params.delete("pairs");

      router.replace(`${pathname}${createQueryString(params)}`);
      close();
      return;
    }

    setCreationTypes(data.creationTypes);
    setPairs(data.pairs);
    close();
  };

  return (
    <NoSsr>
      <Collapse {...rest} in={isOpen} unmountOnExit>
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

export const WtSeriesGalleryFilterForm = Object.assign(WtSeriesGalleryFilterFormFn, {
  CollapseForm: CollapseFormFn,
});
