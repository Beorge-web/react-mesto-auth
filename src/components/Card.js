import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  ); 
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_owner' : ''}`
  ); 
  return (
    <div className='element'>
      <button type='button' className= {cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <button type='button' className='element__image' style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}></button>
      <div className='element__bottom'>
        <h3 className='element__title'>{props.card.name}</h3>
        <div className='element__like-container'>
          <button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className={'element__like-counter'}>{props.card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}
export default Card;
