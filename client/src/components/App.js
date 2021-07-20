import '../App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './layout/Landing';
import Navbar from './layout/Navbar';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';

const App = () => {
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