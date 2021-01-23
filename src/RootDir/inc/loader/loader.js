import React, { Component } from 'react';
import './index.css';

class Loader extends Component {
    render() {
        return (
            <div className="loader" 
            style={{
                display: this.props.loading?"flex":"none"

            }}
            >
                GG
            </div>
        );
    }
}

export default Loader;