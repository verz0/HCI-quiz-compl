import * as React from "react";
import Welcome from "./components/Welcome";
import Form from "./components/Form";
import Questionpage from "./components/Questionpage";
import FeedbackForm from "./components/FeedbackForm";
import Thankyou from "./components/Thankyou";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/question" element={<Questionpage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
    </Router>
  );
};
export default App;
