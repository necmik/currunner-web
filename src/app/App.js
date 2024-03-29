import React, { Component } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import EmptyPage from '../common/EmptyPage';

import { Layout, notification } from 'antd';

import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';

import { withRouterHOC } from '../common/WithRouterHOC'

const { Content } = Layout;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
      console.log('loadCurrentUser:' + this.state.currentUser);
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
    
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.router.navigate(redirectTo);
    
    notification[notificationType]({
      message: 'CurRunner',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'CurRunner',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.router.navigate("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Routes>     
                <Route path="/" element={<EmptyPage/>} /> 
                <Route path="/login" element={<Login onLogin={this.handleLogin} />} />
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/users/:email"  
                  element = {<Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...this.props}  />}>
                </Route>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>} />
                <Route element={NotFound} />
              </Routes>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouterHOC(App);
