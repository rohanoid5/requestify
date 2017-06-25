import React from 'react';
import Link from 'react-router/lib/Link';
// import {Layout, Header, Navigation, Content, Textfield, Drawer} from 'react-mdl';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Avatar from 'material-ui/Avatar';
import { hashHistory  } from 'react-router';
import IconButton from 'material-ui/IconButton';

const cvDivStyle = {
	    color: 'rgba(0, 0, 0, 0.7)',
	    fontSize:'14px',
			padding: '16px'
	};
const itemStyle={
		fontSize:'14px'
}
const iconStyle={
		width: '22px',
		height: 'auto'
}

let SelectableList = makeSelectable(List);

export default class AppShell extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			title: 'Home',
			hide: true,
			zIndex: 1,
			leftIcon: 'menu',
			selectedIndex: 1
		};

		this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
		this.handleRequestChange = this.handleRequestChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.setProperties = this.setProperties.bind(this);
		this.handleLeftIconButton = this.handleLeftIconButton.bind(this);
		this.getLeftIcon = this.getLeftIcon.bind(this);
	}

	handleToggleDrawer() {
		this.setState({
			open: !this.state.open
		});
	}

	handleRequestChange(open, index) {
		this.setState({
			open,
			selectedIndex: index
		});
	}

	handleClose(e) {
		//console.log(e.nativeEvent);
		this.setState({
			open: false
		});
		e.preventDefault();
	}

	setProperties(title,hide,zIndex,leftIcon) {
		this.state.title = title;
		this.state.hide = hide;
		this.state.zIndex = zIndex;
		if(leftIcon!=null)
		this.state.leftIcon = leftIcon;
		this.setState(this.state);

	}

	handleLeftIconButton(){
		if(this.state.leftIcon=='menu' || this.state.leftIcon=='avatar'){
			this.handleToggleDrawer();
		}else if(this.state.leftIcon=='back'){
			hashHistory.goBack();
		}
	}

	getLeftIcon(){
		if(this.state.leftIcon=='avatar'){
				return (<Avatar src="bull.png" size={36} style={{marginLeft:'8px',marginTop:'5px',marginRight:'4px'}} onTouchTap={this.handleClick} />);
			}else if(this.state.leftIcon=='back'){
				return (<IconButton><NavigationArrowBack /></IconButton>);
			}else{
				return (<IconButton><NavigationMenu /></IconButton>);
			}
	}

	// renderAside() {
	//
  //       return (
  //       	<div>
  //       	<NavHeader drawer={this.handleToggleDrawer}/>
  //           <SelectableList value={this.state.selectedIndex} onChange={this.handleRequestChange.bind(this)}>
	//
  //           </SelectableList>
  //           </div>
	//
  //       );
	//
  //   }
	//

	render() {
		return (
			<div style = {
				{paddingTop: '64px'}
			}>
				{
					React.cloneElement(this.props.children, {
						setProperties: this.setProperties
					})
				}
			</div>
		);
	}
}

AppShell.propTypes = {
	title: React.PropTypes.string,
	children: React.PropTypes.node
};
