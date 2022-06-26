import './Container.scss';

const Container = ({ children, className }) => {
  return (
    <div className={className ? `${className} container` : 'container'}>
      {children}
    </div>
  );
};

export default Container;
