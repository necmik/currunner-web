import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link, Navigate  } from 'react-router-dom';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouterHOC } from '../../common/WithRouterHOC'

import {
    FacebookLoginButton,
    GoogleLoginButton
  } from "react-social-login-buttons";

const FormItem = Form.Item;

class Login extends Component {

    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.router.location.state && this.props.location.state.error) {
            setTimeout(() => {
                notification.error(this.props.location.router.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.routerlocation.pathname,
                    state: {}
                });
            }, 100);
        }
    }

    render() {
        if(this.props.isAuthenticated) {
            return <Navigate
                to={{
                pathname: "/",
                state: { from: this.props.router.location }
            }}/>;            
        }

        return (
            <div className="login-container">               
                <div className="login-content">
                    <h1 className="login-title">Login</h1>
                    <SocialLogin />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <LoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'CurRunner',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });                    
                    } else {
                        notification.error({
                            message: 'CurRunner',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input 
                        prefix={<UserOutlined />}
                        size="large"
                        name="email" 
                        placeholder="Email" />    
                </FormItem>
                <FormItem name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input 
                        prefix={<LockOutlined />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <a href={GOOGLE_AUTH_URL}>
                <GoogleLoginButton /> </a>
                <a href={FACEBOOK_AUTH_URL}>
                <FacebookLoginButton /></a>
            </div>
        );
    }
}



export default withRouterHOC(Login);