import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITask, ITaskForm } from "../../types";
import axios from "axios";
import { apiUrl } from "../../globalConstants.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchTasks = createAsyncThunk<ITask[], string>(
  "tasks/fetchTasks",
  async (token) => {
    const tasksResponse = await axios.get(`${apiUrl}/tasks`, {
      headers: { Authorization: `${token}` },
    });
    return tasksResponse.data || [];
  },
);

export const createTask = createAsyncThunk<void, ITaskForm>(
  "tasks/createTask",
  async (IForm) => {
    return axios.post(`${apiUrl}/tasks`, IForm, {
      headers: { Authorization: `${sessionStorage.getItem("token")}` },
    });
  },
);

export const deleteTask = createAsyncThunk<void, string>(
  "tasks/deleteTask",
  async (taskId) => {
    return axiosApi.delete(`${apiUrl}/tasks/${taskId}`, {
      headers: { Authorization: `${sessionStorage.getItem("token")}` },
    });
  },
);

// export const deleteOne = createAsyncThunk<void,string>(
//   "tasks/deleteOne",
//   async (id) => {
//       return axiosApi.delete(`${apiUrl}tasks/${id}`,{data:{headers: {Authorization: `${sessionStorage.getItem("token")}`}}});
//   }
// );
