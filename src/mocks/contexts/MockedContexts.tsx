import { ReactElement } from "react";
import { AuthProvider, LoaderProvider } from "../../context";
import { BrowserRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

interface IMockedContextsProps {
    children: ReactElement;
}

function MockedContexts({ children }: IMockedContextsProps) {
    return (
        <LoaderProvider>
            <AuthProvider>
                <I18nextProvider i18n={i18n}>
                    <BrowserRouter>{children}</BrowserRouter>
                </I18nextProvider>
            </AuthProvider>
        </LoaderProvider>
    );
}

export default MockedContexts;
