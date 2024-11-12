import { Route, Routes } from "react-router-dom";
import MainPage from "../view/main_page";
import TestPage from "../../server/view/test";
import { Layout } from "./outlet";
import ServerPage from "../../server/view/server/page";
import SetupPage from "../../server/view/setup/page";
import RedirectPage from "../../onboarding/view/redirect/page";

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login/oauth2/code/discord" element={<RedirectPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="/test" element={<TestPage />} />
        <Route path="/server" element={<ServerPage />} />
        <Route path="/setup" element={<SetupPage />} />
      </Route>
    </Routes>
  );
}
