import React, { Component } from 'react';
import { signup } from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';

import { Form, Input, Button, notification } from 'antd';

import { withRouterHOC } from '../../common/WithRouterHOC'

const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: {
                value: ''
            },
            lastName: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            confirmedPassword: {
                value: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }  

    handleSubmit = (values) => {
        const signupRequest = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        };

        signup(signupRequest)
        .then(response => {
            notification.success({
                message: 'CurRunner',
                description: "Thank you! A verification email has been sent to: " + values.email + ".Please check it!",
            });        
            this.props.router.navigate("/login")  
        }).catch(error => {
            notification.error({
                message: 'CurRunner',
                description: 'Error: ' + error.message  
            });
        });
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form onFinish={this.handleSubmit} className="signup-form" labelAlign="right">
                        <FormItem 
                            name='firstName'
                            label="First Name"
                            validateStatus={this.state.firstName.validateStatus}
                            rules={[{ required: true, message: 'Please input your name!' },
                                    { min: NAME_MIN_LENGTH, message: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)` },
                                    { max: NAME_MAX_LENGTH, message: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters needed.)` },
                                  ]}
                            help={this.state.firstName.errorMsg}>
                            <Input 
                                size="large"
                                name="firstName"
                                autoComplete="off"
                                placeholder="Your first name" />    
                        </FormItem>
                        <FormItem 
                            name='lastName'
                            label="Last Name"
                            validateStatus={this.state.lastName.validateStatus}
                            rules={[{ required: true, message: 'Please input your surname!' },
                                    { min: NAME_MIN_LENGTH, message: `Surname is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)` },
                                    { max: NAME_MAX_LENGTH, message: `Surname is too long (Maximum ${NAME_MAX_LENGTH} characters needed.)` },
                                  ]}
                            help={this.state.lastName.errorMsg}>
                            <Input 
                                size="large"
                                name="lastName"
                                autoComplete="off"
                                placeholder="Your last name" />    
                        </FormItem>
                        <FormItem 
                            name='email'
                            label="Email"                        
                            validateStatus={this.state.email.validateStatus}
                            rules={[{ required: true, type: "email", message: 'The input is not valid E-mail!' }]}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Your email" />    
                        </FormItem>
                        <FormItem 
                            name='password'
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: PASSWORD_MIN_LENGTH, message: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)` },
                                { max: NAME_MAX_LENGTH, message: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters needed.)` },
                            ]}
                            help={this.state.password.errorMsg}>
                            <Input 
                                size="large"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters" />    
                        </FormItem>
                        <FormItem 
                            name='confirmPassword'
                            label="Confirm Password"
                            validateStatus={this.state.confirmedPassword.validateStatus}
                            rules={[
                                { required: true, message: 'Please confirm your password!',},
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                  },
                                }),
                              ]}
                            help={this.state.confirmedPassword.errorMsg}>
                            <Input 
                                size="large"
                                name="confirmedPassword" 
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters" />    
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button">Sign up</Button>
                            Already registed? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouterHOC(Signup);