import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {
    NavigationBar,
    SideBar,
    Home,
    Page404,
    Login,
    Logout,
    Register,
    ConfirmEmail,
    Search,
    ViewFood,
    ViewRestaurant,
    OrderHistory,
    Profile
} from './components';

import './App.css';

function App(props) {

    const [sideDrawer, setSideDrawer] = React.useState(false);
    const [auth, setAuth] = React.useState("");

    const AuthContext = React.createContext(auth);

    return (
        <BrowserRouter>
            <AuthContext.Provider value={auth}>
                <div className="App">
                    <NavigationBar setDrawer={setSideDrawer} auth={auth} />
                    <SideBar drawer={sideDrawer} setDrawer={setSideDrawer} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" render={() => (
                            <Login setAuth={setAuth} />
                        )} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/logout" render={() => (
                            <Logout setAuth={setAuth} />
                        )} />
                        <Route exact path="/success" component={ConfirmEmail} />
                        <Route exact path="/search" component={Search} />
                        <Route path="/foods/:id" component={ViewFood} />
                        <Route path="/restaurants/:id" component={ViewRestaurant} />
                        <Route path="/orders" render={() => (
                            <OrderHistory auth={auth} />
                        )} />
                        <Route path="/profile" render={() => (
                            <Profile auth={auth} />
                        )} />
                        <Route component={Page404} />
                    </Switch>
                </div>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
