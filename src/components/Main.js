import avatar from "../images/Avatar.png";
import plus from "../images/plus.svg";
import React from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile root__section'>
        <div className='profile__column-data'>
          <img src={currentUser.avatar || avatar} alt='Аватар' className='profile__avatar' />
          <div className='profile__avatar-pen' onClick={props.onEditAvatar}></div>
          <div className='profile__info'>
            <h1 className='profile__title'>
              {!!currentUser.name ? currentUser.name : "Жак-Ив Кусто"}
            </h1>
            <button
              type='button'
              className='profile__button'
              onClick={props.onEditProfile}
            ></button>
            <p className='profile__subtitle'>
              {!!currentUser.about ? currentUser.about : "Исследователь океана"}
            </p>
          </div>
        </div>
        <button type='button' className='profile__add-button' onClick={props.onAddPlace}>
          <img src={plus} alt='плюс' className='profile__vector' />
        </button>
      </section>

      <section className='elements root__section'>
        <div className='popup' id='element__photo-popup'>
          <div className='popup__background'>
            <img alt='#' src='#' className='popup__photo' />
            <p className='popup__description'></p>
            <button type='button' className='popup__close-icon'></button>
          </div>
        </div>
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              key={card._id}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
