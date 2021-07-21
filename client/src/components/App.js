import '../App.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './layout/Landing';
import Navbar from './layout/Navbar';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';
import store from '../store';
import {loadUser} from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {

	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<React.Fragment>
				<Navbar/>
				<Route exact path="/" component={Landing}/>
				<Alert/>
				<Switch>
					<Route path="/register" component={Register}/>
					<Route path="/login" component={Login}/>
				</Switch>
			</React.Fragment>
		</Router>
	);
};

export default App;