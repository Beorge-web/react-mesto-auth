class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getData(path) {
    return fetch(this._url + path, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      
  }
  patchProfile(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      
  }

  addNewCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      
  }
  deleteCard(id) {
    return fetch(this._url + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      
  }
  handleCard(id, action) {
    console.log(id);
    if (action === true) {
      this._method = "PUT";
    } else {
      this._method = "DELETE";
    }
    return fetch(this._url + "/cards/likes/" + id, {
      method: this._method,
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      
  }
  updateAvatar(data) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      
  }
  _rendering(button, isLoading) {
    if (isLoading === true) {
      button.textContent = "Сохранение...";
    } else {
      button.textContent = "Сохранить";
    }
  }
}
const apiData = {
  url: "https://nomoreparties.co/v1/cohort-25",
  headers: {
    authorization: "7cfb4270-9131-40e7-9051-7aff8402e693",
    "Content-Type": "application/json",
  },
};
const api = new Api(apiData);
export default api;