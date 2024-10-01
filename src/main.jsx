import { createRoot } from "react-dom/client";
import Router from "./routes";
import "./index.css";
import { LangProvider } from "./context";
// import '../i18n'
createRoot(document.getElementById("root")).render(
    <LangProvider>
        <Router />
    </LangProvider>
);