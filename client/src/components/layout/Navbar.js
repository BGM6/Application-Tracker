import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
	return(
		<nav className="navbar bg-dark">
			<h1>
				<Link  to="/"><i className="fas fa-clipboard fa-2x"/></Link>
			</h1>
			<ul>
				<li><Link  to="/applications">My Applications</Link></li>
				<li><Link  to="/register">Register</Link></li>
				<li><Link to="/login">Login</Link></li>
			</ul>
		</nav>
	);
}

export default Navbar;