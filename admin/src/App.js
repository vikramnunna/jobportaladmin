import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Components/Dashboard";
import Login from "./Pages/Login";
import User from "./Components/User";
import Category from "./Components/Category";
import SubCategory from "./Components/SubCategory";
import Jobs from "./Components/Jobs";
import AddJob from "./Pages/AddJob";
import EditJob from "./Pages/EditJob";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<User />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/sub-category" element={<SubCategory />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/add-job" element={<AddJob />}></Route>
          <Route path="/edit-job/:id" element={<EditJob />}></Route>
         
          
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
