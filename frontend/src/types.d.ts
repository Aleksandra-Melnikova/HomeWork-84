// export interface New {
//   id: number;
//   title: string;
//   description: string;
//   image: string | null;
//   date: string;
// }
export interface IFormUser {
  username: string;
  password: string;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "new" | "in_progress" | "complete";
}

export interface ITaskForm {
  title: string;
  description: string;
  status: "new" | "in_progress" | "complete";
}

export interface ISessionResponse {
  data: {
    user: {
      _id: string;
      username: string;
      token: string;
    };
  };
}
