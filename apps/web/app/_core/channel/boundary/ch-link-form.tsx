"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonProps, ListItem, ListItemIcon, TextField } from "@mui/material";
import { BrandInstagramIcon, BrandTwitterIcon, FluentHome24RegularIcon, toast } from "@pency/ui/components";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { useUpdateLink } from "../query";
import { UpdateLinkReq } from "../query/api";
import { objectEntries } from "@pency/util";

// ----------------------------------------------------------------------

const linkSchema = z
  .string()
  .max(200, "200자 이내로 입력해 주세요.")
  .refine((link) => {
    if (link.trim().length) {
      return /^https?:.*/.test(link);
    }
    return true;
  }, "URL(http 포함)을 입력해 주세요.");

const schema = z.object({
  home: linkSchema,
  twitter: linkSchema,
  instagram: linkSchema,
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

const useCHLinkFormContext = () => useFormContext<Schema>();

// ----------------------------------------------------------------------

type CH_Link_Form_Fn_Props = {
  home?: string;
  twitter?: string;
  instagram?: string;
  children?: React.ReactNode;
};

const CH_Link_Form_Fn = ({ home, twitter, instagram, children }: CH_Link_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      home: home ?? "",
      twitter: twitter ?? "",
      instagram: instagram ?? "",
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

type UpdateSubmitFnProps = Omit<ButtonProps, "children"> & { channelUrl: string };

const UpdateSubmitFn = (props: UpdateSubmitFnProps) => {
  const { mutate } = useUpdateLink();
  const { handleSubmit } = useCHLinkFormContext();

  const onSubmit = (data: Schema) => {
    const req: UpdateLinkReq = [];
    for (const [key, value] of objectEntries(data)) {
      if (value.length) {
        req.push({ linkType: key.toUpperCase() as UpdateLinkReq[number]["linkType"], url: value });
      }
    }

    mutate(
      { req, channelUrl: props.channelUrl },
      {
        onSuccess: () => {
          toast.success("변경 내용을 저장했어요.");
        },
      },
    );
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={handleSubmit(onSubmit)}
      {...props}
      sx={{ alignSelf: "flex-end" }}
    >
      변경 내용 저장
    </Button>
  );
};

// ----------------------------------------------------------------------

type Link_Field_Fn_Props = {
  icon: React.ReactNode;
  name: keyof Schema;
  label: string;
};

const Link_Field_Fn = ({ icon, name, label }: Link_Field_Fn_Props) => {
  const { control } = useCHLinkFormContext();

  return (
    <ListItem disablePadding>
      <ListItemIcon>{icon}</ListItemIcon>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            variant="filled"
            type="text"
            fullWidth
            label={label}
            placeholder="URL(http 포함)을 입력해 주세요."
            {...(error && {
              helperText: error.message,
            })}
            error={!!error}
          />
        )}
      />
    </ListItem>
  );
};

// ----------------------------------------------------------------------

export const CH_Link_Form = Object.assign(CH_Link_Form_Fn, {
  Home: () => <Link_Field_Fn icon={<FluentHome24RegularIcon fontSize="medium" />} name="home" label="홈" />,
  Twitter: () => <Link_Field_Fn icon={<BrandTwitterIcon fontSize="medium" />} name="twitter" label="트위터(Twitter)" />,
  Instagram: () => (
    <Link_Field_Fn icon={<BrandInstagramIcon fontSize="medium" />} name="instagram" label="인스타그램(Instagram)" />
  ),
  UpdateSubmit: UpdateSubmitFn,
});
