import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RecoilRoot } from "recoil";
import DebugObserver from "./DebugObserver.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RecoilRoot>
    <DebugObserver />
    <App />
  </RecoilRoot>
  // </React.StrictMode>
);
