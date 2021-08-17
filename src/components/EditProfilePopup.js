import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupInput from "./PopupInput";
import PopupWithForm from "./PopupWithForm";
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  function handleNameChange(e) {
    setName(e.target.value);
    console.log(name);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    console.log(description);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  return (
    <PopupWithForm
      name='edit-popup'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Cохранить'
    >
      <PopupInput
        id='name-input'
        name='name'
        placeholder='Имя'
        maxLength='40'
        onChange={handleNameChange}
        value={name || ""}
      />
      <PopupInput
        id='about-input'
        name='about'
        placeholder='Занятие'
        maxLength='200'
        onChange={handleDescriptionChange}
        value={description || ""}
      />
    </PopupWithForm>
  );
}
export default EditProfilePopup;
