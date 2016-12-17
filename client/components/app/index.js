import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {} from './style.less';
import UserList from '../user-list';

const App = (props) => (
  <div>
    <UserList
      userId={props.userId}
      users={props.users}
    />
  </div>
);

App.propTypes = {
  userId: PropTypes.string,
  users: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    userId: state.userId,
    users: state.users,
  };
}

export default connect(mapStateToProps)(App);
