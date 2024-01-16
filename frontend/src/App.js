import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import PageNotFound from "./component/PageNotFound";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./component/Sidebar";

function App() {
  return (
    <div>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/sidebar" element={<Sidebar />}> </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
