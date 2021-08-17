import React from "react";

function PopupInput(props) {
  return (
    <>
      <input
        id={props.id}
        type={props.type || "text"}
        placeholder={props.placeholder}
        name={props.name}
        className='popup__text popup__text_type_name'
        minLength='2'
        maxLength={props.maxLength}
        onChange={props.onChange}
        value={props.value}
        ref={props.refLink}
      />
      <span className='popup__input-error name-input-error'></span>
    </>
  );
}
export default PopupInput