import { Box, Button, Checkbox, PaletteMode, Paper, outlinedInputClasses, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";


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

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                    main: "#DCE5E8",
                    contrastText: "#666869",
                    dark: "#0582a1",
                    light: "#F2F2F2",

                },
                secondary: {
                    main: "#0582A1",
                    contrastText: "#E1E1E1",
                },
                background: {
                    default: "#B8D1D9",
                    paper: "#DCE5E8",
                },
                text: {
                    primary: "#011E2A",
                    secondary: "#E1E1E1",
                    hint: "#21194c",
                },
                divider: "#666869",
            }
            : {
                // palette values for dark mode
                primary: {
                    main: "#0E1621",
                    light: "#242F3D",
                    contrastText: "#E1E1E1",
                },
                secondary: {
                    main: "#0582A1",
                    contrastText: "#E1E1E1",
                },
                background: {
                    default: "#1С2899",
                    paper: "#0E1621",
                },
                text: {
                    primary: "#E1E1E1",
                    secondary: "#808080",
                },
                divider: "#666869",
            }),
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "--TextField-brandBorderColor": "#E0E3E7",
                    "--TextField-brandBorderHoverColor": "#666869",
                    "--TextField-brandBorderFocusedColor": "#F2F2F2",

                    "& label.Mui-focused": {
                        color: "#666869",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: "var(--TextField-brandBorderColor)",

                },
                root: {
                    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: "var(--TextField-brandBorderHoverColor)",

                    },
                    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: "var(--TextField-brandBorderColor)",
                    },

                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {

                    "&:before, &:after": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    "&:hover": {
                        backgroundColor: "var(--TextField-brandBorderFocusedColor)",
                    },
                    "&:hover:not(.Mui-disabled, .Mui-error):before": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    "&.Mui-focused": {
                        backgroundColor: "var(--TextField-brandBorderFocusedColor)",
                    },
                    "&.Mui-focused:after": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    borderRadius: "5px",
                    backgroundColor: "var(--TextField-brandBorderFocusedColor)",
                    height: "100%"
                },
            },
        },
        MuiInput: {
            color: "var(--TextField-brandBorderHoverColor)",
            styleOverrides: {
                root: {
                    "&:before": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    "&:hover:not(.Mui-disabled, .Mui-error):before": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    "&.Mui-focused:after": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    height: "100%"
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&:before": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    "&:hover:not(.Mui-disabled, .Mui-error):before": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    "&.Mui-focused:after": {
                        borderBottom: "2px solid var(--TextField-brandBorderColor)",
                    },
                    color: "var(--TextField-brandBorderHoverColor)",
                    borderRadius: "5px",

                },
            },
        },
    },
});
