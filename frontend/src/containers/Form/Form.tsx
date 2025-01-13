import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { createNewUser, sessionUser } from "../../store/thunks/usersThunk.ts";
import { IFormUser } from "../../types";
import {
  selectAddUserLoading,
  selectSessionLoading,
} from "../../store/slices/usersSlice.ts";

const initialForm: IFormUser = {
  username: "",
  password: "",
};

const Form = () => {
  const [form, setForm] = useState<IFormUser>(initialForm);
  const navigate = useNavigate();
  const createAddLoading = useAppSelector(selectAddUserLoading);
  const sessionLoading = useAppSelector(selectSessionLoading);
  const dispatch = useAppDispatch();

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState: IFormUser) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitForm = async (e: React.FormEvent, form: IFormUser) => {
    e.preventDefault();
    if (form.username.trim().length > 0 && form.password.trim().length > 0) {
      await dispatch(createNewUser({ ...form }));
      toast.success(
        "You have successfully registered!To log into your profile, press Enter",
      );
    } else {
      toast.warning("Fill all fields.");
    }
  };
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token && token.trim().length > 0) {
      navigate("/tasks");
    }
  }, [token]);

  const onClickEnter = async (form: IFormUser) => {
    if (form.username.trim().length > 0 && form.password.trim().length > 0) {
      await dispatch(sessionUser({ ...form }));
    } else {
      toast.warning("Fill all fields.");
    }
  };

  return (
    <div className="container">
      <form className="mx-auto w-75" onSubmit={(e) => onSubmitForm(e, form)}>
        <div className="d-flex  mb-2 mt-5">
          <label className="me-4 col-2" htmlFor="username">
            Name
          </label>
          <input
            required
            type="text"
            onChange={changeForm}
            value={form.username}
            id="username"
            name="username"
            className="form-control "
          />
        </div>

        <div className="d-flex mb-2">
          <label className="me-4 col-2" htmlFor="password">
            Password
          </label>
          <input
            required
            value={form.password}
            id="password"
            name="password"
            onChange={changeForm}
            className="form-control"
          />
        </div>

        <div className="d-flex align-items-center justify-content-center ">
          <ButtonLoading
            text={"Register"}
            isLoading={createAddLoading}
            isDisabled={createAddLoading}
          />
          <ButtonLoading
            onClick={() => onClickEnter(form)}
            text={"Enter"}
            type={"button"}
            isLoading={sessionLoading}
            isDisabled={sessionLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
