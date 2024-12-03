import { Route, Routes } from "react-router-dom";
import MainPage from "../common/view/main/page";
import { Layout } from "./outlet";
import ServerPage from "../server/view/server/page";
import SetupPage from "../server/view/setup/page";
import RedirectPage from "../onboarding/view/redirect/page";
import RivRedirect from "../server/view/riv_redirect/page";

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/" element={<Layout />}>
        <Route path="/login/oauth2/code/discord" element={<RedirectPage />} />
        <Route path="/server" element={<ServerPage />} />
        <Route path="/setup/:id" element={<SetupPage />} />
        <Route path="/riv-redirect/:id" element={<RivRedirect />} />
      </Route>
    </Routes>
  );
}
