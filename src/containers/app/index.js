import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import About from "../about";

const App = () => (
  <div>
    <header style={{ marginTop: 12 }}>
      <Link to="/" style={{ padding: 16, textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/about-us" style={{ padding: 16, textDecoration: "none" }}>
        About
      </Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
);

export default App;
