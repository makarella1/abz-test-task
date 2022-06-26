import loader from '../../../images/loader/loader.png';

import './Loader.scss';

const Loader = ({ className }) => {
  return (
    <div className={className ? `${className} loader` : 'loader'}>
      <img className="loader__img" src={loader} alt="Loader" />
    </div>
  );
};

export default Loader;
