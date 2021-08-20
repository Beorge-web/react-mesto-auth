import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api, authApi } from "../utils/api";
import Login from "./Login";
import Register from "./Register";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleInfoPopup() {
    setInfoPopupOpen(true);
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setInfoPopupOpen(false);
  }
  function handleCardClick(item) {
    setImagePopupOpen(true);
    setSelectedCard(item);
  }
  function handleUpdateUser(data) {
    api
      .patchProfile(data)
      .then((newData) => {
        setCurrentUser((prevUser) => ({ ...prevUser, name: newData.name, about: newData.about }));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser((prevUser) => ({ ...prevUser, avatar: newData.avatar }));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi.getToken(jwt).then((res) => {
        if (res) {
          console.log(res);
          setLoggedIn(true);
          setCurrentEmail(res.data.email);
          history.push("/");
        }
      });
    }
  }
  function handleSignUp(data) {
    authApi
      .signUp(data)
      .then((res) => {
        console.log(res);
        handleInfoPopup();
        setInfoPopupType(true);
      })
      .catch((err) => {
        console.log(err);
        handleInfoPopup();
        setInfoPopupType(false);
      });
  }
  function handleSignIn(data) {
    authApi
      .signIn(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        tokenCheck();
      })
      .catch((err) => {
        console.log(err);
        handleInfoPopup();
        setInfoPopupType(false);
      });
  }
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [infoPopupType, setInfoPopupType] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState("");
  let history = useHistory();
  tokenCheck();
  React.useEffect(() => {
    Promise.all([api.getData("/users/me"), api.getData("/cards")])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //cards ->
  const [cards, setCards] = React.useState([]);
  function handleCardLike(card) {
    console.log(card);
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .handleCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    console.log(card);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id === card._id ? null : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        console.log(newCard);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // <- cards
  return (
    <div className='root'>
      <div className='page'>
        <Header handleLogout={handleLogout} currentEmail={currentEmail} />
        <Switch>
          <CurrentUserContext.Provider value={currentUser}>
            <ProtectedRoute
              component={Main}
              path='/'
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onClose={closeAllPopups}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
            <Route path='/sign-in' exact>
              <Login loggedIn={loggedIn} onSignIn={handleSignIn} />
              <InfoTooltip
                onClose={closeAllPopups}
                isOpen={isInfoPopupOpen}
                popupType={infoPopupType}
              />
            </Route>
            <Route path='/sign-up' exact>
              <Register loggedIn={loggedIn} onSignUp={handleSignUp} />
              <InfoTooltip
                onClose={closeAllPopups}
                isOpen={isInfoPopupOpen}
                popupType={infoPopupType}
              />
            </Route>

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <PopupWithForm name='delete-confirm' title='Вы уверены?' buttonText='Удалить' />
            <ImagePopup
              onClose={closeAllPopups}
              card={!!selectedCard ? selectedCard : null}
              isOpen={isImagePopupOpen}
            />
          </CurrentUserContext.Provider>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
