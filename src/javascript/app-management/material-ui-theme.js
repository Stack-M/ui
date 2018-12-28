import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const MaterialTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#03a9f4',
      light: '#35baf6',
      dark: '#0276aa',
      contrastText: '#212121'
    },
    secondary: {
      main: '#ffff00',
      contrastText: '#000000',
      light: '#ffff33',
      dark: '#b2b200'
    },
  },
  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica Nueu", "Quicksand", "Segoe UI", "Calibri", Arial, sans-serif`,
    useNextVariants: true,
  },
});