import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {

	const authLinks = (
		<ul>
			<li><Link to="/applications">My Applications</Link></li>
			<li><Link to="/new">Add</Link></li>
			<li><Link to="/archive">Archive</Link></li>
			<li>
				<Link onClick={logout} to="/">
					<i className="fas-sign-out-alt"/>{' '}
					<span className="hide-sm">Logout</span>
				</Link>
			</li>

		</ul>
	);

	const guestLinks = (
		<ul>
			<li><Link to="/register">Register</Link></li>
			<li><Link to="/login">login</Link></li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/"><i className="fas fa-clipboard fa-2x"/></Link>
			</h1>
			{!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
		</nav>
	);
};

Navbar.propType = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);