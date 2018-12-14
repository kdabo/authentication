import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComonent) => {
    class ComposedComponent extends Component {

        componentDidMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if(!this.props.auth) {
                this.props.history.push('/');
            }
        }

        render() {
            return <ChildComonent {...this.props}/>;
        }
    }

    function mapStateToProps(state) {
        return { auth: state.auth.authenticated };
    }

    return connect(mapStateToProps)(ComposedComponent);
}