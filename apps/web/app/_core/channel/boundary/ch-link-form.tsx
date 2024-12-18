"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ListItem, ListItemIcon, TextField } from "@mui/material";
import { BrandInstagramIcon, BrandTwitterIcon, FluentHome24RegularIcon } from "@pency/ui/components";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

// ----------------------------------------------------------------------

/**
 * 목표
 * 각각의 필드에 대한 유효성 정의한 schema 만들기
 * 설계
 * 필요한 필드는 home, twitter, instagram
 * 각 필드의 유효성은 string으로 최대 200자, http: 또는 https:로 시작
 * 각 필드의 유효성이 동일하므로 하나의 유효성 정의 만들기
 *
 *
 * 목표
 * Form 만들기
 * 설계
 * props로 icon, name 받는 컴포넌트 작성
 */

const linkSchema = z
  .string()
  .max(200)
  .regex(/^(https?:).*$/);

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
});
