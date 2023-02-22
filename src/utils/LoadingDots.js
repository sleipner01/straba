import './loadingDots.scss';

const LoadingDots = () => {
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

export default LoadingDots;
