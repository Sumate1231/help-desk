import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const appTheme = localStorage.getItem("appTheme") || "light";

const dark = createTheme({
  palette: {
    mode: "dark",
  },
});

const light = createTheme({
  palette: {
    mode: "light",
  },
});

const MyApp = () => (
  // <React.StrictMode>

  // </React.StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={light}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MyApp />
);
