import { sanitazedHtml } from "./sanitazedHtml.js";
import { initEventListeners, user, fetchGetPromise } from "./main.js";
import { answerComment } from "./actionOnComment.js";
import { editComment } from "./actionOnComment.js";
import { postTodo, deleteTodo, token } from "./api.js";
import { renderLogin } from "./login.js";

export const renderFormComments = ({ formComments }) => {
  const appElement = document.getElementById("app");
  const commentElement = document.getElementById("list-comment");
  const commentHtml = formComments
    .map((formComment, index) => {
      formComment.comment = formComments[index].comment
        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>");

      return ` <li id = "list-comment" class="comment"data-index = "${index}">
  <div class="comment-header">
    <div>${sanitazedHtml(formComment.name)}</div>
    <div>${formComment.date} </div>
  </div>
  <div class="comment-body">
      ${
        formComment.isEdit
          ? `<textarea class="comment-text">${sanitazedHtml(
              formComment.comment
            )}</textarea>`
          : `<div class="comment-text" >
      ${formComment.comment}
      </div>`
      }
   </div>
  
  <button id = "get-button" class="${
    user ? "edit-form-button" : "edit-form-button-none"
  }">${formComment.isEdit ? "Сохранить" : "Редактировать"} </button>
  <button class="${user ? "delete-button" : "delete-button-none"}" data-id="${
    formComment.id
  }">Удалить</button>
  <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">${formComment.likes}</span>
      <button class="like-button ${
        formComment.isLiked ? "-active-like" : ""
      }" data-id="${formComment.id}"></button>
      </div>
  </div>
  </li>`;
    })
    .join("");

  const appHtml = `<div class="container">
<ul id = "list-comment" class="comments">${commentHtml}</ul>
${
  token
    ? `
<div class="add-form" id="add-form">
<input type="text" class="add-form-name" placeholder="Введите ваше имя"  id="name-input" value ="${user}" readonly/>
<textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4" id="comment-input"></textarea>
<div class="add-form-row">
    <button class="add-form-button" id="add-button">Написать</button>
</div>`
    : '<button class="link-form-button" id="login-button">Чтобы добавить коментарий, авторизуйтесь </button>'
}
        </div>
        <div class="loading" id ="loading">
        <img class="img" src="img/gifgivecom (1).gif" alt="">
          <p> Комментарий добавляется...</p>
      </div>  
      
</div> `;

  appElement.innerHTML = appHtml;

  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const id = deleteButton.dataset.id;

      deleteTodo({ id }).then(() => {
        fetchGetPromise();
      });
    });
  }

  const loading = document.getElementById("loading");
  loading.style.display = "none";

  initEventListeners({ formComments });
  answerComment({ formComments });
  editComment({ formComments });

  if (user) {
    const buttonElement = document.getElementById("add-button");
    const nameInputElement = document.getElementById("name-input");
    const textInputElement = document.getElementById("comment-input");
    const hideForm = document.querySelector(".add-form");

    nameInputElement.style.backgroundColor = "#ccc";
    nameInputElement.style.color = "grey";

    //валидация полей ввода
    buttonElement.disabled = true;

    textInputElement.addEventListener("input", () => {
      buttonElement.disabled = false;

      if (nameInputElement.value === "" || commentElement.value === "") {
        buttonElement.disabled = true;
        return;
      }
    });
    nameInputElement.addEventListener("input", () => {
      buttonElement.disabled = false;
      if (nameInputElement.value === "" || commentElement.value === "") {
        buttonElement.disabled = true;
        return;
      }
    });

    //событие на кнопке Отправить
    buttonElement.addEventListener("click", () => {
      if (nameInputElement.value === "") {
        nameInputElement.style.backgroundColor = "pink";
        return;
      }
      if (textInputElement.value === "") {
        textInputElement.style.backgroundColor = "pink";
        return;
      }

      //Скрываем форму, показываем лоадер
      loading.style.display = "flex";
      hideForm.style.display = "none";
      
      
      const fetchPostPromise = () => {
        postTodo({
          text: textInputElement.value,
          name: nameInputElement.value,
        })
          .then(() => {
            
            buttonElement.textContent = "Загружается"
            return fetchGetPromise();
          })
          .then(() => {
            nameInputElement.value = "";
            textInputElement.value = "";
          })
          .catch((error) => {
            if (error.message === "Сервер упал") {
              fetchPostPromise();
              //alert("Сервер сломался, попробуй позже");
            } else if (error.message === "Неверный запрос") {
              alert("Имя и комментарий не должны быть короче 3-х символов");
            } else {
              alert("Нет подключения к интернету");
            }
          })
          .finally(() => {
            hideForm.style.display = "flex";
            loading.style.display = "none";
          });
      };
      fetchPostPromise();
      // renderFormComments({ formComments });
    });
  } else {
    const loginButtonElement = document.getElementById("login-button");
    loginButtonElement.addEventListener("click", () => {
      renderLogin({ fetchGetPromise });
    });
  }
};
