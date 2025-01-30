import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.tsx";
import "./i18n.ts";
import { AuthProvider, LoaderProvider } from "./context/index.ts";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <LoaderProvider>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </LoaderProvider>
    </StrictMode>
);
