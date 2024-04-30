import './App.css';
import CreateAccount from "./components/CreateAccount.js";
import LogIn from "./components/LogIn.js";
import AccountPage from "./components/AccountPage.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/account" element={<AccountPage />} />
\        </Routes>
      </Router>
    </div>
  );
}

export default App;
