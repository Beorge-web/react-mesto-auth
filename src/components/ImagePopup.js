function ImagePopup(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : "popup_closed"}`} id='element__photo-popup'>
      <div className='popup__background'>
        <img alt={!!props.card  ? props.card.name : '#'} src={!!props.card  ? props.card.link : '#'} className='popup__photo' />
        <p className='popup__description'>{!!props.card ? props.card.name : '#'}</p>
        <button type='button' className='popup__close-icon' onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
