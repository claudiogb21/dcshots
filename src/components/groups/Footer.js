import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<a href="#" className="sign">
					developed by <b>B Factory</b> <i className="fas fa-heart"></i>
				</a>
				<div className="instagramIcon">
					<a href="https://www.instagram.com/dcshots_/?hl=es-la" target="_blank">
						<i className="fab fa-instagram" />
					</a>
				</div>
			</footer>
		);
	}
}
