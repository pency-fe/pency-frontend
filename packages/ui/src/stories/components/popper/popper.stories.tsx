import {
  EvaBookmarkOutlineIcon,
  FluentShare24RegularIcon,
  MaterialSymbolsBlockIcon,
  MaterialSymbolsReportOutlineIcon,
  Menux,
  Selectx,
  useMenuxState,
} from "@/components";
import { Button, ListItemIcon, MenuItem } from "@mui/material";
import { objectEntries } from "@pency/util";
import { Meta } from "@storybook/react";
import { useState } from "react";

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

const GENRE_LABEL = {
  ROMANCE: "로맨스",
  FANTASY: "판타지",
  ROFAN: "로판",
  ACTION: "액션",
  DAILY: "일상",
  COMIC: "개그",
  DRAMA: "드라마",
  THRILLER: "스릴러",
  MARTIAL: "무협",
  SPORTS: "스포츠",
  SELF: "자기계발",
  ETC: "기타",
};

export const SelectSingle = () => {
  const [genre, setGenre] = useState<keyof typeof GENRE_LABEL | "">("");
  const entries = objectEntries(GENRE_LABEL);

  return (
    <Selectx
      label="age"
      fullWidth
      value={genre}
      required
      onChange={(e) => {
        setGenre(e.target.value as keyof typeof GENRE_LABEL);
      }}
    >
      <MenuItem value="" sx={{ display: "none" }}></MenuItem>
      {entries.map(([value, label]) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Selectx>
  );
};

export const SelectMulti = () => {
  const [genre, setGenre] = useState<Array<keyof typeof GENRE_LABEL>>([]);
  const entries = objectEntries(GENRE_LABEL);

  return (
    <Selectx
      label="age"
      fullWidth
      value={genre}
      required
      multiple
      onChange={(e) => {
        setGenre(e.target.value as Array<keyof typeof GENRE_LABEL>);
      }}
    >
      {entries.map(([value, label]) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Selectx>
  );
};
