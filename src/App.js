import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/index";
import HomeIndex from "./pages/Home/index";
import AboutIndex from "./pages/About/index";
import ContentIndex from "./pages/Contact/index";
import SearchResultIndex from "./pages/SearchResult/index";
// //Auth
import LoginIndex from "./pages/Auth/Login/index";
import RegisterIndex from "./pages/Auth/Register/index";
import ResetIndex from "./pages/Auth/Reset/index";
import AdminLogin from "./pages/Auth/Admin/Login";

// //Account
import DoctorAccountMaster from "./pages/Account/Doctor/Master/index";
import PatientAccountMaster from "./pages/Account/Patient/Master/index";
import AdminMaster from "./pages/Account/Admin/Master/index";
import PrivateRoute from "./components/PrivateRoute/index";

// //Chat

import ChatIndex from "./pages/Chat/index";

import FourOFour from "./pages/FourOFour/index";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomeIndex} />
            <Route exact path="/about-us" component={AboutIndex} />
            <Route exact path="/contact-us" component={ContentIndex} />
            <Route exact path="/search" component={SearchResultIndex} />
            <Route exact path="/login" component={LoginIndex} />
            <Route exact path="/register" component={RegisterIndex} />
            <Route exact path="/reset" component={ResetIndex} />
            <Route exact path="/admin-login" component={AdminLogin} />

            {/* Doctor Master */}
            <PrivateRoute path="/doctor" role="doctor">
              <DoctorAccountMaster />
            </PrivateRoute>

            {/* Patient Master */}
            <PrivateRoute path="/patient" role="patient">
              <PatientAccountMaster />
            </PrivateRoute>

            {/* Council Master */}
            {/* <Route exact path="/messages/:reciverId/:appointmentId"> */}
            <Route exact path="/messages">
              <ChatIndex />
            </Route>

            {/* Admin Master */}
            <PrivateRoute exact path="/admin" role="super_admin">
              <AdminMaster />
            </PrivateRoute>

            <PrivateRoute exact path="/admin" role="admin">
              <AdminMaster />
            </PrivateRoute>

            <PrivateRoute exact path="/admin" role="manager">
              <AdminMaster />
            </PrivateRoute>
            {/* <Route path="/admin" role="admin">
             <AdminMaster />
           </Route> */}

            <Route path="*" component={FourOFour} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
