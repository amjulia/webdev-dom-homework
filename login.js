import { login, setToken, token } from "./api.js";
import {fetchGetPromise, setUser, user} from "./main.js";


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
  <span class="autorization">Зарегистрироваться</span>
  </div>`;
    appElement.innerHTML = loginHtml;


const buttonElement = document.querySelector(".login-button");
const loginInputElement = document.querySelector(".login-form-name");
const passwordInputElement = document.querySelector(".password-form-name");

buttonElement.addEventListener("click", () => {

login({
    login: loginInputElement.value,
    password: passwordInputElement.value
})
.then((responseData) => {
 setToken(responseData.user.token);
 setUser(responseData.user)
 
})
.then(() => {
    fetchGetPromise();
}).catch((error) => {
  if (error.message === 'Неверный логин или пароль') {
      alert('Введен неправильный логин или пароль');
  }
  else {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
  }
  console.warn(error);
});
 })

 }
 