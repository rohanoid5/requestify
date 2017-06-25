import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { submitStatus } from '../actions/leavesAction.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const cardStyle = {
	margin: '0em 0em 0em 0em',
	padding: '8px'
};

const tStyle1 ={
	flex:'1',
	textAlign:'left'
};

const dStyle ={
	display: 'flex',
	paddingTop: '2px'
};

const tStyle3 ={
	flex:'1',
	textAlign:'right',
};
const tStyle4 ={
	flex:'1',
	textAlign:'right',
};

const hstyle={
		marginBottom:0,
}

const dividerstyle = {
	marginTop: '0em'
}

const iconStyle={
		width: '36px',
		height: 'auto'
}

const radioButton = {
	marginBottom: 16,
	flex:'1',
	width:'auto',
	display:'flex',
	alignItems:'center',
	justifyContent:'center'
}

const dialogStyle = {
  width: '90%',
  maxWidth: 'none',
};

export default class RequestItemEmp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
		//console.log(this.props.bool);

	}

	render() {
		return (
  		<ListItem style={cardStyle}>
  			<div>
  				<h3>{this.props.request.requested_by.name} (Username:{this.props.request.requested_by.username})</h3>
  			</div>
  			<div style={{paddingTop:0}}>
  				<div style={dStyle}>
  					<div style={tStyle1}>Reason </div>
  					<div style={tStyle3}>{this.props.request.reason} </div>
  				</div>
  				<div style={dStyle}>
  					<div style={tStyle1}>Leave Type</div>
  					<div style={tStyle4}>{this.props.request.leave_type} </div>
  				</div>
  				<div style={dStyle}>
  					<div style={tStyle1}>Requested At</div>
  					<div style={tStyle4}>
            {
              new Date(this.props.request.requested_at).getDate() + '/' +
              new Date(this.props.request.requested_at).getMonth() + '/' +
              new Date(this.props.request.requested_at).getFullYear()
            }
            </div>
  				</div>
					<div style={dStyle}>
  					<div style={tStyle1}>From</div>
            <div style={tStyle4}>
            {
              new Date(this.props.request.start_date).getDate() + '/' +
              new Date(this.props.request.start_date).getMonth() + '/' +
              new Date(this.props.request.start_date).getFullYear()
            }
            </div>
  				</div>
					<div style={dStyle}>
  					<div style={tStyle1}>To</div>
  					<div style={tStyle4}>
            {
              new Date(this.props.request.end_date).getDate() + '/' +
              new Date(this.props.request.end_date).getMonth() + '/' +
              new Date(this.props.request.end_date).getFullYear()
            }
            </div>
  				</div>
					<div style={dStyle}>
  					<div style={tStyle1}>Approval Status</div>
  					<div style={tStyle4}>{this.props.request.approval_status}</div>
  				</div>
  			</div>
  		</ListItem>
		);
	}
}
