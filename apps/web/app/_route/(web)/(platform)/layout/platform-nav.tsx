import {
  FluentDrawImage24FilledIcon,
  FluentDrawText24FilledIcon,
  Nav,
  TablerLayoutDashboardFilledIcon,
} from "@pency/ui/components";
import Link from "next/link";

export function PlatformNav() {
  return (
    <Nav>
      <Nav.Tree>
        <Nav.Tree.Branch icon={<FluentDrawImage24FilledIcon />} label="웹툰" startsWith="/webtoon">
          <Nav.Tree.Branch.LeafAnchor component={Link} label="시리즈" href="/webtoon/series" />
          <Nav.Tree.Branch.LeafAnchor component={Link} label="포스트" href="/webtoon/post" />
          <Nav.Tree.Branch.LeafButton>시리즈 작성하기</Nav.Tree.Branch.LeafButton>
          <Nav.Tree.Branch.LeafButton>포스트 작성하기</Nav.Tree.Branch.LeafButton>
        </Nav.Tree.Branch>
        <Nav.Tree.Branch icon={<FluentDrawText24FilledIcon />} label="웹소설" startsWith="/webnovel">
          <Nav.Tree.Branch.LeafAnchor component={Link} label="시리즈" href="/webnovel/series" />
          <Nav.Tree.Branch.LeafAnchor component={Link} label="포스트" href="/webnovel/post" />
          <Nav.Tree.Branch.LeafButton>시리즈 작성하기</Nav.Tree.Branch.LeafButton>
          <Nav.Tree.Branch.LeafButton>포스트 작성하기</Nav.Tree.Branch.LeafButton>
        </Nav.Tree.Branch>
        <Nav.Tree.BranchAnchor
          component={Link}
          icon={<TablerLayoutDashboardFilledIcon />}
          label="스튜디오"
          href="/studio"
        />
      </Nav.Tree>
    </Nav>
  );
}
