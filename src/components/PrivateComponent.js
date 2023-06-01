import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PrivateComponent = ({ token, component: Component, ...rest }) => (
  token ? <Component {...rest} /> : <Redirect to="/login" />
);

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(PrivateComponent);
