import '../App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './layout/Landing';
import Navbar from './layout/Navbar';
import Register from './auth/Register';
import Login from './auth/Login';

const App = () => {
	return (
		<BrowserRouter>
			<React.Fragment>
				<Navbar/>
				<Route exact path="/" component={Landing}/>
					<Switch>
						<Route exact path="/register" component={Register}/>
						<Route exact path="/login" component={Login}/>
					</Switch>

			</React.Fragment>
		</BrowserRouter>
	);
};

export default App;