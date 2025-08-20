import { redirect, type LoaderFunction } from "react-router";
import { store } from "../store";
import { getUser } from "../store/slices/auth/actions";
import { setToken } from "../store/slices/auth";
import { getById, getMedia, list } from "../store/slices/slides/actions";

const getToken = () => {
  const token = localStorage.getItem("access-token");
  return token;
};

export const indexLoader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url);
  console.log({url});
  
  const token = getToken();
  if (!token) {
    return redirect("/auth/login");
  }
  store.dispatch(setToken(token));
  console.log("heere");

  await store.dispatch(getUser());
  store.dispatch(
    list({
      page: 1,
      name: "",
    })
  );
  return null;
};

export const authLoader: LoaderFunction = ({ request }) => {
  const { pathname } = new URL(request.url);
  if (pathname === "/auth") {
    return redirect("/auth/login");
  }
  const token = getToken() || store.getState().auth.token;
  if (token) {
    return redirect("/");
  }
  return null;
};

export const editSlideLoader: LoaderFunction = ({ params }) => {
  const { id } = params;
  store.dispatch(getById(id!));
  store.dispatch(getMedia(id!));
  return null;
};
