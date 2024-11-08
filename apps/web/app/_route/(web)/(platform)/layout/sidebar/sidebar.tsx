import { DashboardLayout } from "@pency/ui/layouts";
import { navData } from "../nav-data";

export function Sidebar() {
  return <DashboardLayout.Sidebar data={navData} />;
  // return (
  //   <DashboardLayout.Sidebar
  //     slots={{
  //       nav: (
  //         <Nav slots={{ top: <></>, bottom: <></> }}>
  //           <Nav.Trunk>
  //             <Nav.Trunk.Branch>
  //               <Nav.Trunk.Branch.AnchorLeaf />
  //               <Nav.Trunk.Branch.AnchorLeaf />
  //               <Nav.Trunk.Branch.ButtonLeaf />
  //               <Nav.Trunk.Branch.ButtonLeaf />
  //             </Nav.Trunk.Branch>

  //             <Nav.Trunk.Branch>
  //               <Nav.Trunk.Branch.AnchorLeaf />
  //               <Nav.Trunk.Branch.AnchorLeaf />
  //               <Nav.Trunk.Branch.ButtonLeaf />
  //               <Nav.Trunk.Branch.ButtonLeaf />
  //             </Nav.Trunk.Branch>

  //             <Nav.Trunk.ButtonBranch />
  //             <Nav.Trunk.AnchorBranch />
  //           </Nav.Trunk>
  //         </Nav>
  //       ),

  //       miniNav: <MiniNav>{/* ... */}</MiniNav>,
  //     }}
  //   />
  // );
}
