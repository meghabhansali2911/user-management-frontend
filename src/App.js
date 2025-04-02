import { Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard.js";
import { CreateAccount } from "./component/Login/CreateAccount";
import { UsersList } from "./component/SubComponent/UsersList.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/create-account" element={<CreateAccount />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/users" element={<UsersList />}></Route>
      </Routes>
    </>
  );
}

export default App;
