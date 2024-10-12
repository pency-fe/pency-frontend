export type Data = Array<{
  subheader?: string;
  items: Array<{
    icon: React.ReactNode;
    title: string;
    path: string;
  }>;
}>;
