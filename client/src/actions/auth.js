import axios from 'axios';
import {
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOG_OUT, LOGIN_FAIL
} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load User after login success
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
};

//Register User
export const register = ({name, email, password}) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	const body = JSON.stringify({name, email, password});
	try {
		const res = await axios.post('/api/users/register', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());

		console.log(res);
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

//Login Users
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({email, password});
	try {
		const res = await axios.post('/api/users/login', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());

	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: LOGIN_FAIL
		});
	}
};

//Logout/Clear profile
export const logout = () => dispatch => {
	dispatch({type: LOG_OUT});
};