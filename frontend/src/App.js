import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from 'react-bootstrap';

import Navbar from "./components/navbar.component";
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants.component";
import RestaurantList from "./components/restaurant-list/restaurant-list.component";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    console.log("APP USER" + user.name);
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <Router>
      <Container fluid>
        <Navbar user={user} logout={logout}/>
        <br/>
        <Route path={["/", "/restaurants"]} exact component={RestaurantList}/>
        <Route path="/restaurants/:id/review" render={
          (props) => <AddReview {...props} user={user}/>
          }/>
        <Route path="/restaurants/:id" render={
          (props) => <Restaurant {...props} user={user}/>
          }/>
        <Route path="/login" render={
          (props) => <Login {...props} login={login}/>
          }/>
      </Container>
    </Router>
    </div>
    
  );
}

export default App;