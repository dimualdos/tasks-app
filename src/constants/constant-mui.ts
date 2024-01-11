import { Box, Button, Checkbox,  Paper,  TableCell,  styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, NavLink } from "react-router-dom";
import styles from '@emotion/styled';
import { IOnChangeEvent } from "../utils/types";


export const ItemGrid = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
    ...theme.typography.body2,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.contrastText,
    boxShadow: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    borderRadius: "10px",
}));

export const SenterBox = styled(Box)(({ theme }) => ({
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 10px 0 10px",
    gap: "10px",
}))
export const HeaderButtonActive = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.dark,
    color: `${theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.light}`,
    border: `${theme.palette.mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.dark} 2px solid`,
    minWidth: "100px"
}));
export const HeaderButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `${theme.palette.mode === "dark" ? theme.palette.secondary.main : theme.palette.secondary.main} 2px solid`,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.light,
        border: `${theme.palette.mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.dark} 2px solid`,
    }
}));
export const HeaderButtonActiveCompose = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.dark,
    border: `${theme.palette.mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.dark} 2px solid`,
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.light,

    "&:hover": {
        color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.light,
    }
}));

export const HeaderButtonFilters = styled(HeaderButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    border: "none",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.background.paper,
    "&:hover": {
        border: "none",
    }
}));

export const ItemBackground = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.secondary.main : theme.palette.background.default,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    margin: "0",
}));

export const CheckBoxCustom = styled(Checkbox)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
}));

export const BoldTextLeft = styled("p")(({ theme }) => ({
    margin: '5px 0 0 20px',
    textAlign: "left",
    color: theme.palette.mode === "dark" ? theme.palette.text.primary : theme.palette.text.primary,
    fontWeight: 700,
}))
export const OverflowDiv = styled(Paper)(({ theme }) => ({
    "&::-webkit-scrollbar": {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.primary.main,
        width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
        background: theme.palette.mode === "dark" ? "#2D3B4C" : theme.palette.background.default,
        borderRadius: "5px",
    },
    maxHeight: "75vh",
    overflowY: "auto",
    overflowX: "hidden",
}));
export const ItemTaskOverflow = styled("div")(({ theme }) => ({
    "&::-webkit-scrollbar": {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.primary.main,
        width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
        background: theme.palette.mode === "dark" ? "#2D3B4C" : theme.palette.background.default,
        borderRadius: "5px",
    },
    maxHeight: `85vh`,
    overflowY: "auto",
    overflowX: "hidden",
}))
export const OverflowFilter = styled(ItemTaskOverflow)(({ theme }) => ({
    maxHeight: "75vh",
    marginRight: "10px",
}));
export const StyledLink = styled(Link)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
}));
export const StyledLinkDrawer = styled(NavLink)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
   }));


export const StyledBoxOverlay = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
    flexDirection: "column",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    maxWidth: "720px",
    maxHeight: "80vh",
    zIndex: "15",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "47%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "6px",
    padding: "6px 6px",
    border: "1px solid #666869",
    boxShadow: "0px 0px 20px rgba(5, 130, 161, 0.75)",
}));

export const headerLinkModal = styles.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-end;
  gap: 36px;
`;

export const TextTheme = styled('p')(({ theme }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.main,
   }));
   export const H2Theme = styled('h2')(({ theme }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.main,
   }));
   export const H3Theme = styled('h3')(({ theme }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.primary.main,
   }));

   export const TableCellTheme = styled(TableCell)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : theme.palette.background.paper,
    
    borderBottom: theme.palette.mode === "dark" ? `1px solid ${theme.palette.divider}` : `1px solid ${theme.palette.background.default}`,
   }));



