import ReactTooltip from 'react-tooltip';

import { formattedPhoneRegEx } from '../../../common/regs';

import './UserCard.scss';

import placeholder from '../../../images/user/placeholder.svg';

const UserCard = ({ className, photo, name, position, email, phone }) => {
  let formatedPhone = '';

  const match = phone.match(formattedPhoneRegEx);

  //Formatting the phone number based on the style guide
  if (match) {
    formatedPhone = `${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
  }

  return (
    <div className={`${className} card`}>
      <div className="card__wrapper">
        <img
          className="card__photo"
          src={photo}
          alt="Avatar"
          onError={({ currentTarget }) => {
            //We need to set a placeholder image instead of an actual one if request wasn't successfull
            currentTarget.onerror = null;
            currentTarget.src = placeholder;
          }}
          loading="lazy"
        />
        <p className="card__name">{name}</p>
        <div className="card__info">
          <p className="card__position">{position}</p>
          <p className="card__email" data-tip={email}>
            {email}
          </p>
          <ReactTooltip
            className="card__tooltip"
            place="bottom"
            arrowColor="transparent"
          />
          <p className="card__phone">{formatedPhone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
