import { createRoot } from "react-dom/client";
import Router from "./routes";
import "./index.css";
import '../i18n'
createRoot(document.getElementById("root")).render(<Router />);
