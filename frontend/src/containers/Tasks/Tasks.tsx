import { useCallback, useEffect } from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectDeleteLoading,
  selectFetchLoading,
  selectTasks,
} from "../../store/slices/tasksSlice.ts";
import { deleteTask, fetchTasks } from "../../store/thunks/tasksThunk.ts";
import { useNavigate } from "react-router-dom";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";
import { toast } from "react-toastify";

const Tasks = () => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const isLoadingFetchTasks = useAppSelector(selectFetchLoading);
  const navigate = useNavigate();
  const isDeleteLoading = useAppSelector(selectDeleteLoading);

  const Auth = () => {
    return sessionStorage.getItem("token");
  };

  const fetchAllTasks = useCallback(async () => {
    const token = Auth();
    if (token) {
      await dispatch(fetchTasks(token));
    }
  }, [dispatch]);

  useEffect(() => {
    {
      void fetchAllTasks();
    }
  }, [fetchAllTasks]);

  const onClickDeleteTask = async (id: string) => {
    await dispatch(deleteTask(id));
    toast.success("Task deleted");
    void fetchAllTasks();
  };

  return (
    <div className={"container w-75 text-center"}>
      <div className={"row"}>
        <h2 className="mx-4 text-center col-6">Tasks</h2>
        <button
          type={"button"}
          onClick={() => navigate("/add")}
          className="ms-auto col-3 btn btn-primary mt-2"
        >
          Add task
        </button>
      </div>
      {isLoadingFetchTasks ? (
        <Spinner />
      ) : (
        <>
          {tasks.length > 0 ? (
            <>
              {tasks.map((task) => (
                <div
                  className="border border-1 border-secondary-subtle p-3 my-3 rounded-2 row justify-content-between align-items-center"
                  key={task._id}
                >
                  <div className="col-6 fs-4 text-start">
                    <span className={"d-block"}>
                      <span className={"text-secondary"}>Task:</span>{" "}
                      {task.title}
                    </span>
                    {task.description ? (
                      <span className={"d-block"}>
                        <span className={"text-secondary"}>Description</span>{" "}
                        {task.description}
                      </span>
                    ) : null}
                    <span className={"d-block fs-5"}>
                      <span className={"text-secondary"}>Status:</span>{" "}
                      {task.status}
                    </span>
                  </div>

                  <div className="col-2 d-flex mt-auto h-100 my-auto justify-content-center align-items-center flex-column">
                    <ButtonLoading
                      type="button"
                      onClick={() => onClickDeleteTask(task._id)}
                      isLoading={isDeleteLoading}
                      isDisabled={isDeleteLoading}
                      text={"Delete"}
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="mt-5 text-center">
              There are no tasks, add a new task to the TO DO list
            </p>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default Tasks;
