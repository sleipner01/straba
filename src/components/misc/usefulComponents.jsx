import './usefulComponents.scss';
import './loadingDots.scss';

export const LoadingDots = () => {
  return (
    <div className='loading-dots-container'>
      <div className={'loading-dots'}>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
      </div>
    </div>
  );
};

export const Error = ({ errorMessage }) => {
  return <div className='errorContainer'>{errorMessage}</div>;
};

export const NoMatch = () => {
  return <div className='noMatchContainer'>404 - the route does not exist</div>;
};
