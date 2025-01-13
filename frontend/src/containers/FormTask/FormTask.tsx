import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";
import React, { useState } from "react";
import { ITaskForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { selectAddLoading } from "../../store/slices/tasksSlice.ts";
import { createTask } from "../../store/thunks/tasksThunk.ts";

const initialForm: ITaskForm = {
  title: "",
  description: "",
  status: "new",
};

const FormTask = () => {
  const [formTask, setFormTask] = useState<ITaskForm>(initialForm);
  const navigate = useNavigate();
  const createAddLoading = useAppSelector(selectAddLoading);
  const dispatch = useAppDispatch();

  const onChangeField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormTask((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitForm = async (e: React.FormEvent, formTask: ITaskForm) => {
    e.preventDefault();
    if (formTask.title.trim().length > 0) {
      await dispatch(createTask({ ...formTask }));
      navigate("/tasks");
      toast.success("You have successfully create new task!");
    } else {
      toast.warning("Title is required.");
    }
  };

  const status = ["new", "in_progress", "complete"];

  return (
    <div className="container w-75">
      <form onSubmit={(e) => onSubmitForm(e, formTask)}>
        <div className="form-group my-4 row justify-content-center align-items-center">
          <h2 className={"text-center mt-5"}> Add a new task</h2>
          <div className="col-10">
            <label
              className="fs-4 d-block mynpm i react-toastify-3"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              value={formTask.title}
              onChange={onChangeField}
              name="title"
              type="text"
              id="title"
              className="form-control"
            />
          </div>
          <div className="col-10">
            <label
              className="fs-4 d-block mynpm i react-toastify-3"
              htmlFor="description"
            >
              Description:
            </label>

            <textarea
              value={formTask.description}
              onChange={onChangeField}
              name="description"
              id="description"
              className="form-control"
            />
          </div>
          <div className="col-10 my-4">
            <select
              required
              id="status"
              value={formTask.status}
              onChange={onChangeField}
              name="status"
              className="form-select"
            >
              <option className="fs-5" value="" disabled>
                Select a status
              </option>
              {status.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="col-2 mt-4">
              <ButtonLoading
                text={"Add"}
                isLoading={createAddLoading}
                isDisabled={createAddLoading}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormTask;
