import React, { Component } from 'react';
import { getUserProfile } from '../../util/APIUtils';
import { Avatar } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import { withRouterHOC } from '../../common/WithRouterHOC'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(email) {
        this.setState({
            isLoading: true
        });

        getUserProfile(email)
        .then(response => {
            this.setState({
                user: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }
      
    componentDidMount() {
        const email = this.props.router.params.email;
        this.loadUserProfile(email);
    }

    componentDidUpdate(nextProps) {
        if(this.props.router.params.email !== nextProps.router.params.email) {
            this.loadUserProfile(nextProps.params.email);
        }        
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.firstName)}}>
                                        {this.state.user.firstName[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.firstName} {this.state.user.lastName}</div>
                                </div>
                            </div>
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default withRouterHOC(Profile);