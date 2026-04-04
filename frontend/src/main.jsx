import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import ContextProvider from "./context/ContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <BrowserRouter>
        <ContextProvider>
          <App />
        </ContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
