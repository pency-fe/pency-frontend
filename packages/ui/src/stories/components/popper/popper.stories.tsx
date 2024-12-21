import {
  EvaBookmarkOutlineIcon,
  FluentShare24RegularIcon,
  MaterialSymbolsBlockIcon,
  MaterialSymbolsReportOutlineIcon,
  Menux,
  useMenuxState,
} from "../../../components";
import { Button, ListItemIcon, MenuItem } from "@mui/material";

import { Meta } from "@storybook/react";

// ----------------------------------------------------------------------

const meta: Meta = {
  title: "components/popper",
};

export default meta;

export const Menu = () => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();
  return (
    <>
      <Button ref={anchorRef} onClick={toggle}>
        메뉴 버튼
      </Button>
      <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
        <MenuItem>
          <ListItemIcon>
            <EvaBookmarkOutlineIcon />
          </ListItemIcon>
          북마크
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <FluentShare24RegularIcon />
          </ListItemIcon>
          공유하기
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <MaterialSymbolsBlockIcon />
          </ListItemIcon>
          차단하기
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <MaterialSymbolsReportOutlineIcon />
          </ListItemIcon>
          신고하기
        </MenuItem>
      </Menux>
    </>
  );
};

export const MenuSelect = () => {};
