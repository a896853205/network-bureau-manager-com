import React from 'react';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { steps, enterpriseRegistrationUuid, registration } = useSelector(
    state => state.enterpriseStore
  );
  return <></>;
};
