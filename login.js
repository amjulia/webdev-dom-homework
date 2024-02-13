import { login, setToken, token } from "./api.js";


 export const renderLogin = ({fetchGetPromise}) => {
    const appElement = document.getElementById("app") 
    const loginHtml = `
    <p class="login-input">Форма входа</p>
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
  <a href="#" class="autorization">Зарегистрироваться</a>
    `;
    appElement.innerHTML = loginHtml;

const buttonElement = document.querySelector(".login-button");
const loginInputElement = document.querySelector(".login-form-name");
const passwordInputElement = document.querySelector(".password-form-name");

buttonElement.addEventListener("click", () => {
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