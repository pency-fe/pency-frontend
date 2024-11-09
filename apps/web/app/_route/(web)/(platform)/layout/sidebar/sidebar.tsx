import { DashboardLayout } from "@pency/ui/layouts";
import { navData } from "../nav-data";

export function Sidebar() {
  return <DashboardLayout.Sidebar data={navData} />;
  // return (
  //   <DashboardLayout.Sidebar
  //     slots={{
  //       nav: (
  //         <Nav slots={{ top: <></>, bottom: <></> }}>
  //           <Nav.Tree>
  //             <Nav.Tree.Branch label={} icon={}>
  //               <Nav.Tree.Branch.AnchorLeaf label={} href="" />
  //               <Nav.Tree.Branch.AnchorLeaf label={} href="" />
  //               <Nav.Tree.Branch.ButtonLeaf label={} href="" />
  //               <Nav.Tree.Branch.ButtonLeaf label={} href="" />
  //             </Nav.Tree.Branch>

  //             <Nav.Tree.Branch>
  //               <Nav.Tree.Branch.AnchorLeaf />
  //               <Nav.Tree.Branch.AnchorLeaf />
  //               <Nav.Tree.Branch.ButtonLeaf />
  //               <Nav.Tree.Branch.ButtonLeaf />
  //             </Nav.Tree.Branch>

  //             <Nav.Tree.ButtonBranch />
  //             <Nav.Tree.AnchorBranch />
  //           </Nav.Tree>
  //         </Nav>
  //       ),

  //       miniNav: <MiniNav>{/* ... */}</MiniNav>,
  //     }}
  //   />
  // );
}
