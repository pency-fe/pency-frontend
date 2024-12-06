"use client";

import { objectEntries, zodObjectKeys } from "@pency/util";
import { z } from "zod";
import { CREATION_TYPE_LABEL, PAIR_LABEL } from "../../const";
import { Controller, FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, ButtonProps, IconButton, IconButtonProps, Typography } from "@mui/material";
import { hideScrollX } from "@pency/ui/util";
import { CheckboxButton, IcRoundRefreshIcon } from "@pency/ui/components";
import { PropsWithoutRef, useMemo } from "react";

const schema = z.object({
  creationTypes: z.enum(zodObjectKeys(CREATION_TYPE_LABEL)).array(),
  pairs: z.enum(zodObjectKeys(PAIR_LABEL)).array(),
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

export const useWTPostFilterFormContext = () => useFormContext<Schema>();

// ----------------------------------------------------------------------

type WT_Post_Filter_Form_Fn_Props = {
  defaultValue?: Partial<Schema>;
  children?: React.ReactNode;
};

const WT_Post_Filter_Form_Fn = ({ defaultValue, children }: WT_Post_Filter_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      creationTypes: defaultValue?.creationTypes ?? [],
      pairs: defaultValue?.pairs ?? [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

type SaveSubmitFnProps = Omit<ButtonProps, "children"> & {
  onSubmit: SubmitHandler<Schema>;
};

const SaveSubmitFn = ({ onSubmit, ...rest }: SaveSubmitFnProps) => {
  const { handleSubmit } = useWTPostFilterFormContext();

  return (
    <Button variant="contained" size="small" {...rest} onClick={handleSubmit(onSubmit)}>
      저장
    </Button>
  );
};

// ----------------------------------------------------------------------

type ResetFnProps = PropsWithoutRef<IconButtonProps> & {
  onReset?: SubmitHandler<Schema>;
};

const ResetFn = ({ onReset, ...rest }: ResetFnProps) => {
  const { reset, handleSubmit } = useWTPostFilterFormContext();

  return (
    <IconButton
      size="small"
      {...rest}
      onClick={() => {
        reset();
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

const CreationTypesFn = () => {
  const { control } = useWTPostFilterFormContext();

  const creationTypes = useMemo(() => objectEntries(CREATION_TYPE_LABEL), []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ width: "4rem", flexShrink: 0 }}>창작유형</Typography>
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}>
        <Controller
          control={control}
          name="creationTypes"
          render={({ field }) => (
            <>
              {creationTypes.map(([creationType, label]) => (
                <CheckboxButton
                  key={creationType}
                  checked={field.value.includes(creationType)}
                  onChange={() => {
                    field.onChange(
                      field.value.includes(creationType)
                        ? field.value.filter((v) => v !== creationType)
                        : [...field.value, creationType],
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

const PairsFn = () => {
  const { control } = useWTPostFilterFormContext();

  const pairs = useMemo(() => objectEntries(PAIR_LABEL), []);
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ width: "4rem", flexShrink: 0 }}>페어</Typography>
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}>
        <Controller
          control={control}
          name="pairs"
          render={({ field }) => (
            <>
              {pairs.map(([pair, label]) => (
                <CheckboxButton
                  key={pair}
                  checked={field.value.includes(pair)}
                  onChange={() => {
                    field.onChange(
                      field.value.includes(pair) ? field.value.filter((v) => v !== pair) : [...field.value, pair],
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

export const WT_Post_Filter_Form = Object.assign(WT_Post_Filter_Form_Fn, {
  CreationTypes: CreationTypesFn,
  Pairs: PairsFn,
  SaveSubmit: SaveSubmitFn,
  Reset: ResetFn,
});
