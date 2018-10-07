import './main.scss';
import { BrowserRouter as Router } from 'react-router-dom';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Components
import Header from './components/groups/Header';
import Footer from './components/groups/Footer';
import Contact from './components/groups/Contact';
import Modal from './components/groups/Modal';
import FullLoader from './components/elements/fullLoader';

import Routes from './routes';

let img = new Image();
img.src = 'img/ui/logo-white.png'

class App extends Component {
	state = {
		showModal: false,
		unmountingModal: false,
		isLoading: false,
		showHud: true
	};

	toggleModal() {
		const { showModal } = this.state;

		if (showModal) {
			this.setState({
				unmountingModal: true
			});

			setTimeout(() => {
				this.setState((prevState) => ({
					showModal: !prevState.showModal,
					unmountingModal: !prevState.unmountingModal
				}));
			}, 500);
		} else {
			this.setState((prevState) => ({
				showModal: !prevState.showModal
			}));
		}
	}

	toggleLoading(status) {
		this.setState({
			isLoading: status
		})
	}

	toggleHud(status) {
		this.setState({
			showHud: status
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.isLoading != nextState.isLoading || this.state.showModal != nextState.showModal || this.state.showHud != nextState.showHud
	}


	render() {
		const { showModal, unmountingModal, isLoading, showHud } = this.state;

		return (
			<Router>
				<div className="mainWrapper">
					{isLoading && <FullLoader></FullLoader>}
					{showHud && <Header showHud={showHud} toggleModal={this.toggleModal.bind(this)} />}
					{showModal && (
						<Modal unmountingModal={unmountingModal}>
							<Contact showModal={showModal} toggleModal={this.toggleModal.bind(this)} />
						</Modal>
					)}
					<Routes toggleHud={this.toggleHud.bind(this)} showModal={showModal} toggleLoading={this.toggleLoading.bind(this)} />
					{showHud && <Footer showHud={showHud} />}
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
