import { login, setToken, token } from "./api.js";

const hideForm = document.querySelector(".add-form");
const loginForm = document.querySelector(".login-form");
const commentElement = document.getElementById("list-comment");
 export const renderLogin = ({fetchGetPromise}) => {
 
    const appElement = document.getElementById("app"); 
    const loginHtml = `<p class="login-input">Форма входа</p>
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
  `;
    appElement.innerHTML = loginHtml;
    //commentElement.style.display = "none";
    hideForm.style.display = "none";

const buttonElement = document.querySelector(".login-button");
const loginInputElement = document.querySelector(".login-form-name");
const passwordInputElement = document.querySelector(".password-form-name");

buttonElement.addEventListener("click", () => {
  hideForm.style.display = "flex";
  loginForm.style.display ="none";
login({
    login: loginInputElement.value,
    password: passwordInputElement.value
}).then((responseData) => {
 setToken(responseData.user.token);
 console.log(token);
}).then(() => {
    fetchGetPromise();
})
 })

 }
 