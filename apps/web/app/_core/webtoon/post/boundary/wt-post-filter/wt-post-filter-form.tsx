"use client";

import { zodObjectKeys } from "@pency/util";
import { z } from "zod";
import { CREATION_TYPE_LABEL, PAIR_LABEL } from "../../const";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const PAIRS_LABEL = {
  ALL: "전체",
  ...PAIR_LABEL,
} as const;

const CREATION_TYPES_LABEL = {
  ALL: "전체",
  ...CREATION_TYPE_LABEL,
} as const;

const schema = z.object({
  creationTypes: z.enum(zodObjectKeys(PAIRS_LABEL)).array(),
  pairs: z.enum(zodObjectKeys(CREATION_TYPES_LABEL)).array(),
});

type Schema = z.infer<typeof schema>;

type WT_Post_Filter_Form_Fn_Props = {
  children?: React.ReactNode;
};

const WT_Post_Filter_Form_Fn = ({ children }: WT_Post_Filter_Form_Fn_Props) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      creationTypes: ["ALL"],
      pairs: ["ALL"],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
