import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import './AppHeader.css';
import { withRouterHOC } from './WithRouterHOC'

const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
          menuItems = [
            {
                key: 'home',
                icon: <HomeOutlined />,
                label: (<Link to="/" />),
            },
            {
              key: '/profile',
              icon: <UserOutlined />,
              children: [                
                  {
                    label: `${this.props.currentUser.firstName}`,
                    key: 'user-info',
                  },
                  {
                    label: (<Link to={`/users/${this.props.currentUser.email}`}>Profile</Link>),
                    key: 'profile',
                  },
                  {
                    label: "Logout",
                    key: 'logout',
                  },
                ],
            },
          ];          
        } else {
          menuItems = [
            {
                key: 'login',
                label: (<Link to="/login">Login</Link>),
            },
            {
                key: 'signup',
                label: (<Link to="/signup">Signup</Link>),
            },
          ];
        }

        return (
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/">CurRunner</Link>
              </div>
              <Menu 
                mode="horizontal" 
                items={menuItems} 
                selectedKeys={[this.props.router.location.pathname]} 
                onClick={this.handleMenuClick}                
                className="app-menu"/>
            </div>
          </Header>
        );
    }
}

export default withRouterHOC(AppHeader);