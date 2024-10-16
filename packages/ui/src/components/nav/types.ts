export type LeafData = {
  id: string;
  icon?: React.ReactNode;
  title: string;
  href: string;
};

export type BranchData = {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: Array<LeafData>;
};

export type NavData = Array<{
  id: string;
  title?: string;
  items: Array<LeafData | BranchData>;
}>;
