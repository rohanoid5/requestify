import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {hashHistory} from 'react-router';
const pStyle={
	    display:'flex',
	    alignItems: 'center',
	    height:'90vh',
	    margin:'auto'
	};

const tStyle2 ={
	   margin:'auto'
	};

export default class CenteredCircularProgress extends React.Component {

componentDidMount(){
	if(this.props.to){
		hashHistory.push(this.props.to);
	}
}
	 render() {

	        return (
	        		<div style={pStyle}>
	        		<CircularProgress size={30} color={this.props.color?this.props.color:'#004d99'} thickness={2} style={tStyle2} />
	        		</div>
	        )

	  	}
}
