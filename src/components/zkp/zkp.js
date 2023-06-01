import React from 'react';
import PrivateComponent from '../PrivateComponent';

const MyProtectedComponent = () => (
  <PrivateComponent component={() => <div>My protected content</div>} />
);

export default MyProtectedComponent;