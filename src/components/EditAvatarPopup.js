import PopupInput from "./PopupInput";
import PopupWithForm from "./PopupWithForm";
import React from "react";
function EditAvatarPopup(props) {
  const avatarInputRef = React.useRef();
  React.useEffect(() => {
    avatarInputRef.current.value = '';
  }, [props.isOpen])
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      type='url'
      name='avatar-popup'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText='Cохранить'
    >
      <PopupInput
        id='avatar-input'
        name='url'
        placeholder='Ссылка на новый аватар'
        maxLength='120'
        refLink={avatarInputRef}
        // onChange={handleChange}
      />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
