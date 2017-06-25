import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import CircularProgress from '../components/progressbar';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/loginAction';
import { getLeaves } from '../actions/leavesAction.js';
import { getUser } from '../actions/profileAction';
import { hashHistory  } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RequestItem from '../components/requestItem';
import RequestItemEmp from '../components/requestItemEmp';

const style = {
  margin: '12px',
};

const fStyle = {
	textAlign: 'center',
}

const bStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: 24
}

const pStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	width: '100%',
	maxWidth: 700,
	margin: 'auto'
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {title: 'Rohan Rules'},
    }
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.onCreatePage = this.onCreatePage.bind(this);
    var d = new Date();
    // console.log(d);
  }

  componentWillMount(){
		if (!this.props.isLoggedIn ) {
			hashHistory.push('/login?path=home');
			return;
		}
    let accessToken = localStorage.getItem('access_token');
	};

  componentDidMount() {
    this.props.getUser();
		this.props.getLeaves();
	};

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onLogOut() {
    this.props.logoutUser();
    hashHistory.push('/login?path=home');
  }

  requestRowMng(request, index) {
    return (
      <RequestItem key={index} request={request}/>
    );
  }

  requestRowEmp(request, index) {
    return (
      <RequestItemEmp key={index} request={request}/>
    );
  }

  onCreatePage() {
    hashHistory.push('/create');
    console.log(this.props.user.role);
  }

  render() {
      if (this.props.leaves && this.props.user.role == "EMP") {
        return (
          <div style={{margin:'auto', verticalAlign: 'middle'}}>
            <Card style={pStyle}>
              <div style={{textAlign:'center', marginTop: '20px'}}>
                <h1>Your requests</h1>
              </div>
              <form style={fStyle}>
                <List>
                  {this.props.leaves.map(this.requestRowEmp)}
                </List>
                <div style={bStyle}>
                  <FloatingActionButton onClick={this.onCreatePage} style={style}>
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
              </form>
            </Card>
            <div style={{textAlign:'center', marginTop: '20px'}}>
              <RaisedButton onClick={this.onLogOut} default={true} style={style} label="Logout" />
            </div>
          </div>
        );
      } else if (this.props.leaves && this.props.user.role == "MNG") {
        return (
          <div style={{margin:'auto', verticalAlign: 'middle'}}>
            <Card style={pStyle}>
              <div style={{textAlign:'center', marginTop: '20px'}}>
                <h1>Click on any Leave Request</h1>
              </div>
              <form style={fStyle}>
                <List>
                  {this.props.leaves.map(this.requestRowMng)}
                </List>
              </form>
            </Card>
            <div style={{textAlign:'center', marginTop: '20px'}}>
              <RaisedButton onClick={this.onLogOut} default={true} style={style} label="Logout" />
            </div>
          </div>
        );
      } else {
        return (
  				<CircularProgress color="white"/>
  			)
      }
  }
};

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.authState.isLoggedIn,
    leaves: state.leaves,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
	  logoutUser: logoutUser,
    getLeaves: getLeaves,
    getUser: getUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
