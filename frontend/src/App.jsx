import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListTaskComponent from "./components/ListTaskComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskComponent from "./components/TaskComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListTaskComponent />}></Route>
          <Route path="/tasks" element={<ListTaskComponent />}></Route>
          <Route path="/add-Task" element={<TaskComponent />}></Route>
          <Route path="/edit-task/:id" element={<TaskComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;

// 127.0.0.1:3000 = localhost:3000
