import Layout from "./components/Layout/Layout.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Form from "./containers/Form/Form.tsx";
import Tasks from "./containers/Tasks/Tasks.tsx";
import FormTask from "./containers/FormTask/FormTask.tsx";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      sessionStorage.setItem("token", "");
    }
  }, [location.pathname]);
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add" element={<FormTask />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </Layout>
    </>
  );
};
export default App;
