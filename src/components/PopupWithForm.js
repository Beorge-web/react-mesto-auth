import React from "react";
function PopupWithForm(props) {
  return (
    <div className={`popup  ${props.isOpen ? "popup_opened" : "popup_closed"}`}>
      <div className='popup__container'>
        <button type='button' className='popup__close-icon' onClick={props.onClose}></button>
        <form className='popup__form' name={props.name} noValidate onSubmit={props.onSubmit}>
          <fieldset className='popup__set'>
            <h3 className='popup__title'>{props.title}</h3>
            {props.children}
            <button type='submit' className='popup__submit-button' >
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
