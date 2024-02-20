import { registration, setToken, token } from "./api.js";
import { fetchGetPromise, setUser, user } from "./main.js";
import { renderLogin } from "./login.js";

export const renderRegistration = () => {
  const appElement = document.getElementById("app");
  const regHtml = `<div class="login-form"><p class="login-input">Форма регистрации</p>
    <input 
      type="text"
      class="user-form-name"
      placeholder="Имя"
    />
    <input 
      type="text"
      class="login-form-name"
      placeholder="Логин"
    />
    <input 
    type="password"
    class="password-form-name"
    placeholder="Пароль"
  />
  <button class="button-autorization">Зарегистрироваться</button>
  <button class="enter-login-button">Войти</button>
  
  </div>`;
  appElement.innerHTML = regHtml;

  const buttonElement = document.querySelector(".button-autorization");
  const regNameInputElement = document.querySelector(".user-form-name");
  const loginInputElement = document.querySelector(".login-form-name");
  const passwordInputElement = document.querySelector(".password-form-name");

  buttonElement.addEventListener("click", () => {
    registration({
      name: regNameInputElement.value,
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        setToken(responseData.user.token);
        setUser(responseData.user);
      })
      .then(() => {
        fetchGetPromise();
      })
      .catch((error) => {
        if (
          error.message === "Пользователь с таким логинои уже зарегистрирован"
        ) {
          alert("Пользователь с таким логинои уже зарегистрирован");
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
        console.warn(error);
      });
  });

  const EnterButton = document.querySelector(".enter-login-button");
  EnterButton.addEventListener("click", () => {
    renderLogin({ fetchGetPromise });
  });
};
