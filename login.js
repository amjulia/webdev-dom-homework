import { login, setToken, token } from "./api.js";
import { fetchGetPromise, setUser, user } from "./main.js";
import { renderRegistration } from "./registration.js";
import { saveToLocalStorage } from "./localStorage.js";

export const renderLogin = () => {
  const appElement = document.getElementById("app");
  const loginHtml = `<div class="login-form"><p class="login-input">Форма входа</p>
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
  <button class ="login-button">Войти</button>
  <button class="autorization-button" >Зарегистрироваться </button>
  
  </div>`;
  appElement.innerHTML = loginHtml;

  const buttonElement = document.querySelector(".login-button");
  const loginInputElement = document.querySelector(".login-form-name");
  const passwordInputElement = document.querySelector(".password-form-name");

  loginInputElement.addEventListener("input", () => {
    loginInputElement.style.backgroundColor = "#f3f7dc";
  });

  passwordInputElement.addEventListener("input", () => {
    passwordInputElement.style.backgroundColor = "#f3f7dc";
  });

  buttonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        setToken(responseData.user.token);
        setUser(responseData.user);
        saveToLocalStorage(user);
      })
      .then(() => {
        fetchGetPromise();
      })
      .catch((error) => {
        if (error.message === "Неверный логин или пароль") {
          alert("Введен неправильный логин или пароль");
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
        console.warn(error);
      });
  });

  const registrationElement = document.querySelector(".autorization-button");

  registrationElement.addEventListener("click", () => {
    renderRegistration({ fetchGetPromise });
  });
};
