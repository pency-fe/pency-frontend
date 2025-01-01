"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonProps, ListItem, ListItemIcon, TextField } from "@mui/material";
import { BrandInstagramIcon, BrandTwitterIcon, FluentHome24RegularIcon, toast } from "@pency/ui/components";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { objectEntries, ToggleStoreProvider, useToggleStore } from "@pency/util";
import { LoadingButton } from "@mui/lab";
import { useUpdateLink } from "../model/use-update-link";

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

type ChLinkFormFnProps = {
  channelUrl: string;
  home?: string;
  twitter?: string;
  instagram?: string;
  children?: React.ReactNode;
};

type Links = Parameters<ReturnType<typeof useUpdateLink>["mutate"]>[0]["links"];

const ChLinkFormFn = ({ channelUrl, home, twitter, instagram, children }: ChLinkFormFnProps) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      home: home ?? "",
      twitter: twitter ?? "",
      instagram: instagram ?? "",
    },
    mode: "onTouched",
  });
  const { mutate } = useUpdateLink();
  const toggleLoading = useToggleStore((s) => s.toggle);

  const onSubmit = (data: Schema) => {
    // const req: UpdateLinkReq = [];
    const links: Links = [];
    for (const [key, value] of objectEntries(data)) {
      if (value.length) {
        links.push({ linkType: key.toUpperCase() as Links[number]["linkType"], url: value });
      }
    }

    toggleLoading(true);
    mutate(
      { links, channelUrl },
      {
        onSuccess: () => {
          toast.success("변경 내용을 저장했어요.");
        },
        onError: (error) => {
          if (error.code === "ENTITY_NOT_FOUND") {
            toast.error("존재하지 않는 채널 URL이에요.");
          }
        },

        onSettled: () => {
          toggleLoading(false);
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

// ----------------------------------------------------------------------

type UpdateSubmitFnProps = Omit<ButtonProps, "children">;

const UpdateSubmitFn = (rest: UpdateSubmitFnProps) => {
  const loading = useToggleStore((s) => s.bool);

  return (
    <LoadingButton type="submit" variant="contained" color="primary" loading={loading} {...rest} sx={rest.sx}>
      변경 내용 저장
    </LoadingButton>
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

export const ChLinkForm = Object.assign(
  (rest: ChLinkFormFnProps) => (
    <ToggleStoreProvider>
      <ChLinkFormFn {...rest} />
    </ToggleStoreProvider>
  ),
  {
    Home: () => <Link_Field_Fn icon={<FluentHome24RegularIcon fontSize="medium" />} name="home" label="홈" />,
    Twitter: () => (
      <Link_Field_Fn icon={<BrandTwitterIcon fontSize="medium" />} name="twitter" label="트위터(Twitter)" />
    ),
    Instagram: () => (
      <Link_Field_Fn icon={<BrandInstagramIcon fontSize="medium" />} name="instagram" label="인스타그램(Instagram)" />
    ),
    UpdateSubmit: UpdateSubmitFn,
  },
);
