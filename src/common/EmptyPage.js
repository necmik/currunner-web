import React, { Component } from 'react';
import './NotFound.css';

class EmptyPage extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    Currency Rates
                </h1>
                <div className="desc">
                    Currency Rates will be here soon...
                </div>
            </div>
        );
    }
}

export default EmptyPage;