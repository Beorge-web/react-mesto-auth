import React from "react";
import PopupInput from "./PopupInput";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [placeDescription, setPlaceDescription] = React.useState("");
  function handlePlaceChange(e) {
    setPlace(e.target.value);
    console.log(place);
  }
  function handlePlaceDescriptionChange(e) {
    setPlaceDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: place,
      link: placeDescription,
    });
  }
  return (
    <PopupWithForm
      name='new-card'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Cохранить'
    >
      <PopupInput
        id='place-name-input'
        name='name'
        placeholder='Название'
        maxLength='40'
        onChange={handlePlaceChange}
        value={place || ""}
      />
      <PopupInput
        id='plase-url-input'
        type='url'
        name='url'
        placeholder='Ссылка на картинку'
        onChange={handlePlaceDescriptionChange}
        value={placeDescription || ""}
      />
    </PopupWithForm>
  );
}
export default AddPlacePopup;
