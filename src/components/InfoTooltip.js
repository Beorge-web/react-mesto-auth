function InfoTooltip({ onClose, isOpen, popupType }) {
  return (
    <div className={`popup  ${isOpen ? "popup_opened" : "popup_closed"}`}>
      <div className='popup__container'>
        <button type='button' className='popup__close-icon' onClick={onClose}></button>
        <div className='popup__info'>
          <div className={popupType ? "popup__info-success" : "popup__info-error"}></div>
          <p className='popup__info-text'>
            {popupType
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}
export default InfoTooltip;
