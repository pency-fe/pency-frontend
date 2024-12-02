"use client";

import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { EvaArrowIosDownwardFillIcon, EvaEyeOutlineIcon, Label } from "@pency/ui/components";

// ----------------------------------------------------------------------

export function ViewerSection() {
  const theme = useTheme();

  return (
    <Stack
      spacing={1.5}
      sx={{
        borderRadius: 0,
        bgcolor: "inherit",
        [theme.breakpoints.up("sm")]: {
          borderRadius: 1.5,
          bgcolor: theme.vars.palette.background.paper,
        },
      }}
    >
      <Precaution />
      <Content />
      <PaidPostGuide />
      <AuthorTalk />
      <ETC />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src="https://upload-os-bbs.hoyolab.com/upload/2024/05/25/214188686/6884dc9e8c400ebb9c6730883c3da557_5350171371894236645.png"
        alt=""
        sx={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        component="img"
        src="https://upload-os-bbs.hoyolab.com/upload/2024/05/25/214188686/606d8eb9aa17b35c0ef28ab45d273b59_602386185357571767.png"
        alt=""
        sx={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        component="img"
        src="https://upload-os-bbs.hoyolab.com/upload/2024/05/25/214188686/aa9426706d297284333d2821a0c01119_2283792266632400649.png"
        alt=""
        sx={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function Precaution() {
  const theme = useTheme();

  return (
    <Box sx={{ paddingX: 2.5, pt: 1.5 }}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{
          bgcolor: theme.vars.palette.background.neutral,
          [`&.${accordionClasses.expanded}`]: {
            bgcolor: theme.vars.palette.background.neutral,
            boxShadow: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<EvaArrowIosDownwardFillIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>읽기 전 주의사항</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PaidPostGuide() {
  const theme = useTheme();

  return (
    <Stack
      spacing={1}
      sx={{
        paddingX: 2.5,
        paddingY: 1.5,
      }}
    >
      <Typography variant="body1" color={theme.vars.palette.text.secondary}>
        이어지는 내용이 궁금하다면?
      </Typography>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 1.5,
          bgcolor: theme.vars.palette.background.neutral,
          paddingX: 2.5,
          paddingY: 1.5,
        }}
      >
        <Box sx={{ mr: "auto" }}>
          <Typography variant="h4">100P</Typography>
          <Typography variant="subtitle2">50장</Typography>
        </Box>

        <Button variant="contained">구매하기</Button>
      </Stack>
      <Button
        variant="text"
        sx={{
          width: "fit-content",
          ...theme.typography.body2,
        }}
      >
        여러 회차 선택 구매하기
      </Button>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function AuthorTalk() {
  const theme = useTheme();

  return (
    <Box sx={{ paddingX: 2.5 }}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{
          bgcolor: theme.vars.palette.background.neutral,
          [`&.${accordionClasses.expanded}`]: {
            bgcolor: theme.vars.palette.background.neutral,
            boxShadow: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<EvaArrowIosDownwardFillIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>작가의 말</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

// ----------------------------------------------------------------------

function ETC() {
  const theme = useTheme();

  return (
    <Stack
      spacing={1}
      sx={{
        display: "flex",
        gap: 1.5,
        paddingX: 2.5,
        paddingY: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <EvaEyeOutlineIcon sx={{ color: theme.vars.palette.text.secondary, fontSize: theme.typography.body2 }} />
        <Typography variant="body2" sx={{ color: theme.vars.palette.text.secondary }}>
          1.1만
        </Typography>
        <Typography variant="body2" sx={{ color: theme.vars.palette.text.secondary }}>
          •
        </Typography>
        <Typography variant="body2" sx={{ color: theme.vars.palette.text.secondary }}>
          23-04-13
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Label variant="soft" color="secondary">
          2차 창작
        </Label>
        <Label variant="soft" color="warning">
          BL
        </Label>
        <Label variant="soft" color="warning">
          액션
        </Label>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {Array.from({ length: 10 }, () => (
          <Chip label="액션" variant="soft" size="small" sx={{ borderRadius: 3 }} />
        ))}
      </Box>
    </Stack>
  );
}
