import React from 'react';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import AppShell from './AppShell';
import Theme from '../components/Theme';

class App extends React.Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
				<AppShell>
					{this.props.children}
				</AppShell>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.node
};

export default App;
