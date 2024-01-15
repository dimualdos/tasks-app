import { PaletteMode, outlinedInputClasses } from "@mui/material";


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
                    secondary: "#808080",
                    // hint: "#21194c",
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
        MuiInputBase: {
            textColor: "var(--TextField-brandBorderHoverColor)",
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
            variants: [
                {
                    props: { type: "checkbox" },
                    style: {
                        border: '1px solid black'
                    },
                },

            ],
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
