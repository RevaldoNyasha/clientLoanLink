import React from 'react';
import Loader from '../../components/Loader';

const LoadingScreen = () => {
  return (
    <Loader 
      loading={true}
      text="Loading..."
      size="large"
    />
  );
};

export default LoadingScreen;
