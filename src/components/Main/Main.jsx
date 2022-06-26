import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from '../../features/api/api';
import { setNextPage } from '../../features/slices/appSlice';

import UserCard from './UserCard/UserCard';
import Button from '../UI/Button/Button';

import './Main.scss';
import Loader from '../UI/Loader/Loader';

const USERS_COUNT = 6;

const Main = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.app.page);

  //Getting the state of request to render the content conditionally
  const { data, isError, isFetching, isSuccess } = useGetUsersQuery({
    USERS_COUNT,
    page,
  });

  let content = null;
  let isLastPage = false;

  if (isFetching) {
    content = <Loader />;
  } else if (isSuccess) {
    content = data.users.map((user) => (
      <UserCard className="content__card" key={user.id} {...user} />
    ));

    // Hiding "Show more" button if current page is the last one
    if (data.total_pages === page) {
      isLastPage = true;
    }
  } else if (isError) {
    content = <p className="content__error">We couldn't fetch the data ☹</p>;
  }

  const fetchUsersHandler = () => {
    dispatch(setNextPage());
  };

  return (
    <main className="content" ref={ref}>
      <h1 className="content__title">Working with GET request</h1>
      <div className="content__container">{content}</div>
      {!isLastPage && !isError && (
        <Button className="content__btn" onClick={fetchUsersHandler}>
          Show more
        </Button>
      )}
    </main>
  );
});

export default Main;
