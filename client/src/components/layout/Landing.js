import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
	return (
		<div className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Log it</h1>
					<p className="lead">
						Stay organize, easily log your job applications with Log it.
						Sign up now!
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">Sign Up</Link>
						<Link to="/login" className="btn btn-light">Login</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Landing;