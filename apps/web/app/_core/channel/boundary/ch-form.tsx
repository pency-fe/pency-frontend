import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

// ----------------------------------------------------------------------

const schema = z.object({
  title: z.string().min(1).max(45),
  description: z.string().max(200).optional(),
});

type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

type CH_Create_Form_Fn_Props = {
  children?: ReactNode;
};

const CH_Create_Form_Fn = ({ children }: CH_Create_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const CreateSubmitFn = () => {
  const { handleSubmit } = useFormContext();
};

// ----------------------------------------------------------------------

// const CH_Update_Form_Fn = () => {};

// const UpdateSubmitFn = () => {};

// ----------------------------------------------------------------------

const TitleFn = () => {
  const { control } = useFormContext<Schema>();

  <Controller control={control} name="title" render={() => <></>} />;
};

const DescriptionFn = () => {};

const UrlFn = () => {};

export const CH_Create_Form = Object.assign(CH_Create_Form_Fn, {});

// export const CH_Update_Form = Object.assign(CH_Update_Form_Fn, {});
