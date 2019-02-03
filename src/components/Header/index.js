import React, { PureComponent } from 'react';
import moment from 'moment';
import './header.css';

moment.locale('hr-HR')

class Header extends PureComponent {

	state = {
		routeId: ''
	}

	getSchedule = async (e) => {
		e.preventDefault();
		const { routeId } = this.state;
		const { history } = this.props;

		history.push(`/schedule/${routeId}`);
	}

	onRouteChange = (e) => {
		const routeId = e.target.value;
		this.setState({ routeId });
	}

	render() {
		const { routeId } = this.state;

		return (
			<header className="header">
				<form onSubmit={this.getSchedule} className="App">
					<div className="header__container">
						<div className="header__input-wrapper">
							<div className="header__input-icon">
								<svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
							</div>
							<div className="header__input-container">
								<input placeholder="Broj busa ili tramvaja" type="number" value={routeId} onChange={this.onRouteChange} />
							</div>
						</div>
					</div>
				</form>
			</header>
		);
	}
}

export default Header;
