import { sanitazedHtml } from "./sanitazedHtml.js";
import { initEventListeners, user, fetchGetPromise } from "./main.js";
import { answerComment } from "./actionOnComment.js";
import { editComment } from "./actionOnComment.js";
import { postTodo } from "./api.js"; 
import { renderLogin } from "./login.js";

export const renderFormComments = ({ formComments}) => {
  const appElement = document.getElementById("app");
    
    const commentElement = document.getElementById("list-comment"); 
    const commentHtml = formComments.map((formComment, index)=> {
       
    formComment.comment = formComments[index].comment
     .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
     .replaceAll("QUOTE_END", "</div>");
  
     return ` <li id = "list-comment" class="comment"data-index = "${index}">
  <div class="comment-header">
    <div>${sanitazedHtml(formComment.name)}</div>
    <div>${formComment.date} </div>
  </div>
  <div class="comment-body">
      ${formComment.isEdit ? `<textarea class="comment-text">${sanitazedHtml(formComment.comment)}</textarea>` : `<div class="comment-text" >
      ${formComment.comment}
      </div>` }
   </div>
  
  <button id = "get-button" class="edit-form-button">${formComment.isEdit ? 'Сохранить' : 'Редактировать'} </button>
  <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">${formComment.like}</span>
      <button class="like-button ${formComments[index].isLike ? "-active-like" : ""}" data-index="${index}"></button>
      </div>
  </div>
  </li>`
   
        
  }).join('');
const appHtml = `<div class="container">

<ul id = "list-comment" class="comments">
${commentHtml}
</ul>
${user ? `
<div class="add-form" id="add-form">
<input type="text" class="add-form-name" placeholder="Введите ваше имя"  id="name-input" value ="${user.name}" readonly/>
<textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4" id="comment-input"></textarea>
<div class="add-form-row">
    <button class="add-form-button" id="add-button">Написать</button>
</div>

`
            : '<button class="link-form-button" id="login-button">Чтобы добавить коментарий, авторизуйтесь </button>'
        }
        </div>
        <div class="loading" id ="loading">
        <img class="img" src="img/gifgivecom (1).gif" alt="">

          <p> Комментарий добавляется...</p>
      </div>  
      
</div> `;
  

appElement.innerHTML = appHtml;
const loading = document.getElementById("loading");
loading.style.display="none" 
initEventListeners();
answerComment({formComments}); 
editComment({formComments});

if(user) {
  
  const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("comment-input");
const hideForm = document.querySelector(".add-form");


//валидация полей ввода
buttonElement.disabled = true;

  textInputElement.addEventListener("input", () => {
    buttonElement.disabled = false;
    
    if (nameInputElement.value === "" || commentElement.value === "") {
      buttonElement.disabled = true;
      return;}
  }); 
  nameInputElement.addEventListener("input", () => {
    buttonElement.disabled = false;
    if (nameInputElement.value === "" || commentElement.value === "") {
      buttonElement.disabled = true;
      return;}
  }); 



//событие на кнопке Отправить
buttonElement.addEventListener("click", () => {
  
  console.log("кнопка работает");
  nameInputElement.style.backgroundColor = "white";
  textInputElement.style.backgroundColor = "white";

  if (nameInputElement.value === '') {
    nameInputElement.style.backgroundColor = "red";
     return;
  }
  if (textInputElement.value === '') {
    textInputElement.style.backgroundColor = "red";
    return;
  }
  
 


const fetchPostPromise = () => {
  postTodo({ 
            text:textInputElement.value, 
            name:nameInputElement.value})
         .then(()=>{
    
          return fetchGetPromise(); 
        }).then(()=>{
          hideForm.style.display = "none";
  loading.style.display="flex";
        })
        .then(()=>{
          
          nameInputElement.value = "";
          textInputElement.value = "";
        })
        .catch((error) => {
            
          if (error.message === "Сервер упал") {
             fetchPostPromise(); 
            //alert("Сервер сломался, попробуй позже");
          }
       else if (error.message === "Неверный запрос") {
              alert("Имя и комментарий не должны быть короче 3-х символов");
        } else {
              alert("Нет подключения к интернету");
        }
        })
        .finally(() => {
          hideForm.style.display = "flex";
          loading.style.display="none";
        })
    }
    fetchPostPromise();    
    renderFormComments({formComments});
  });
    
     
}
else {
  const loginButtonElement = document.getElementById("login-button");
loginButtonElement.addEventListener("click", () => {
  console.log("123456");
    renderLogin({fetchGetPromise});
   
});
}
}
