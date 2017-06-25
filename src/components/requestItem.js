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
	textAlign:'right'
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

class RequestItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.request._id,
			open: false,
			approval_status: 'APPROVED'
		};
		this.onItemClick = this.onItemClick.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleStatusChange = this.handleStatusChange.bind(this);
		//console.log(this.props.bool);
	}

	onItemClick() {
		console.log(this.state.id);
		this.setState({open: true});
	}

	handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
		this.props.submitStatus(this.state.approval_status, this.state.id);
		this.setState({open: false});
  };

	handleStatusChange(e, v){
		this.state.approval_status = v;
		console.log(this.state);
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleClose}
			/>,
		];
		return (
  		<ListItem onClick={this.onItemClick} style={cardStyle}>
  			<div>
  				<h3>{this.props.request.requested_by.name}({this.props.request.requested_by.username})</h3>
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
  					<div style={tStyle4}>{this.props.request.requested_at}</div>
  				</div>
					<div style={dStyle}>
  					<div style={tStyle1}>From</div>
  					<div style={tStyle4}>{this.props.request.start_date}</div>
  				</div>
					<div style={dStyle}>
  					<div style={tStyle1}>To</div>
  					<div style={tStyle4}>{this.props.request.end_date}</div>
  				</div>
					<div style={dStyle}>
  					<div style={tStyle1}>Approval Status</div>
  					<div style={tStyle4}>{this.props.request.approval_status}</div>
  				</div>
  			</div>
				<Dialog
          title="Select an option"
          actions={actions}
          open={this.state.open}
					contentStyle={dialogStyle}
          onRequestClose={this.handleClose}>
					<RadioButtonGroup name="horizon" defaultSelected="APPROVED" onChange={this.handleStatusChange}
					 ref = "approval_status" style={{display:'flex',margin:'auto',height:'auto'}}>
				      <RadioButton
				        value="PENDING"
				        label="pending"
				        style={radioButton}
				      labelStyle={{width:'auto',marginLeft:-8}}
				      inputStyle={{width:'auto'}}
				      />
				      <RadioButton
				        value="APPROVED"
				        label="Approved"
				        style={radioButton}
				      labelStyle={{width:'auto',marginLeft:-8}}
				      />
				      <RadioButton
				        value="REJECTED"
				        label="Rejected"
				        style={radioButton}
				      labelStyle={{width:'auto',marginLeft:-8}}
				      />
				    </RadioButtonGroup>
        </Dialog>
  		</ListItem>
		);
	}
}

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitStatus: submitStatus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);
