import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormUser } from "../../types";
import axiosApi from "../../axiosApi.ts";
import { toast } from "react-toastify";

export const createNewUser = createAsyncThunk<void, IFormUser>(
  "users/createNewUser",
  async (IForm) => {
    return axiosApi.post("/users", IForm);
  },
);

export const sessionUser = createAsyncThunk<string, IFormUser>(
  "users/sessionUser",
  async (data: IFormUser) => {
    return axiosApi
      .post("/users/sessions", data)
      .then((response) => {
        sessionStorage.setItem("token", response.data.user.token);
        return response.data.user.token;
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        return err.response.data.error;
      });
  },
);
