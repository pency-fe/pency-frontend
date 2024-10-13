import { Layout } from "./layout/layout";
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";

export const DashboardLayout = Object.assign(Layout, {
  Header,
  Sidebar,
});
