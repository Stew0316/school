import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { LOCAL_ENV } from "@/common/localData";
import { Route } from "react-router";
import App from "@/views/App";
import School from "@/views/School";
import Country from "@/views/Country";
import Area from "@/views/Area";
const route = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Country />} />
    <Route path="school" element={<School />}></Route>
    <Route path="area" element={<Area />}></Route>
  </Route>
);

const router = createBrowserRouter(route, {
  basename: LOCAL_ENV.VITE_BASE_NAME,
});
export default router;
