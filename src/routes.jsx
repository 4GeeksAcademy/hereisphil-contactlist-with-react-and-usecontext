import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { AddContact } from "./pages/AddContact";
import NotFound from "./pages/NotFound";
import { Home } from "./pages/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout />} errorElement={<NotFound />} >
      <Route path="*" element={<NotFound />} />
      <Route index element={<Home />} />
      <Route path="/add-contact" element={<AddContact />} />
      <Route path="/add-contact/:contactId" element={<AddContact />} />
    </Route>
  )
);