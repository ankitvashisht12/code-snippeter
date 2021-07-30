import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BrowseSnippets from "./components/BrowseSnippets";
import LikedSnippets from "./components/LikedSnippets";
import Login from "./components/Login";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/liked">
            <LikedSnippets />
          </Route>
          <Route exact path="/">
            <BrowseSnippets />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
