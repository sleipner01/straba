import './usefulComponents.scss';

export const Loading = () => {
  return <div className='loadingContainer'>Loading...</div>;
};

export const Error = () => {
  return <div className='errorContainer'>Error!</div>;
};

export const NoMatch = () => {
  return <div className='noMatchContainer'>404 - the route does not exist</div>;
};
