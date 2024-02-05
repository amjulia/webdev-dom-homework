const buttonElement = document.getElementById("get-button");
const commentElement = document.getElementById("list-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("input-text");
const textComment = document.querySelector(".add-form-text");
const hidePreloader = document.getElementById("preload");
const hideForm = document.querySelector(".add-form");
const loading = document.getElementById("loading");

loading.style.display="none";

let myDate = new Date();
let shortYear = myDate.getFullYear(); 
let twoDigitYear = shortYear.toString().substring(2);
let month = myDate.getMonth()+1;
if (month < 10) {
  month = "0" + month;
}
let minutes = myDate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let formComments = [];

const fetchGetPromise = () => {

   return fetch("https://wedev-api.sky.pro/api/v1/karpova-julia/comments", {
   method: "GET",
     })
     .then((response) => {
       return response.json();
     })
     .then((responseData)=> {
       const appComments = responseData.comments.map((comment) => {
         return {
        id: comment.id,
         name: comment.author.name,
         date: new Date(comment.date).toLocaleTimeString('sm', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
        comment: comment.text,
         like: comment.likes,
         isLike: false, 
         isEdit: false,
         isLoading:true
        }
        
       })
       formComments = appComments;
      
       renderFormComments();
       hidePreloader.style.display = "none";
      
     });
   }

   fetchGetPromise();


//добавления счетчика лайков
const  initEventListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");
   likeButtons.forEach((el, index) => {
    
    el.addEventListener("click", (event) => {
      event.stopPropagation();

      el.classList.add("-loading-like");

        delay(2000).then(() => {
     
       formComments[index].like += formComments[index].isLike ? -1 : +1 ;
       formComments[index].isLike =!formComments[index].isLike;
       
       renderFormComments();
  }) });  
}
);
}


//рендер

const renderFormComments = () => {

  const commentElement = document.getElementById("list-comment"); 
  const commentHtml = formComments.map((formComment, index)=> {
    
  formComment.comment = formComments[index].comment
   .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
   .replaceAll("QUOTE_END", "</div>");

   return ` <li id = "list-comment" class="comment"data-index = "${index}">
<div class="comment-header">
  <div>${formComment.name}</div>
  <div>${formComment.date} </div>
</div>
<div class="comment-body">
    ${formComment.isEdit ? `<textarea class="comment-text">${formComment.comment}</textarea>` : `<div class="comment-text" >
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

commentElement.innerHTML = commentHtml;

initEventListeners();
answerComment(); 
editComment();
    
};

renderFormComments();


// ответ на комментарий по клику на форму комментария

function answerComment() {
  
  const commentsAnswer = document.querySelectorAll(".comment");
  const formText = document.querySelector(".add-form-text");
   commentsAnswer.forEach((comment, index)=> {
    comment.addEventListener("click", ()=>{
      
      formText.value = `QUOTE_BEGIN ${formComments[index].comment.replaceAll("<div class='quote'>","")
      .replaceAll("</div>","")
      .replaceAll("&lt;","")
      .replaceAll("&gt;","")
      .replaceAll("&quot;","")
      } :\n ${formComments[index].name}QUOTE_END`;
    }); 
  }); 
}  

// редактирование комментария
function editComment() {
  const editButton = document.querySelectorAll(".edit-form-button");
  const commentText = document.querySelectorAll(".comment-text");
  editButton.forEach((el, index) => {
    el.addEventListener("click", (event) => {
  event.stopPropagation();
  if (formComments[index].isEdit) {
    formComments[index].comment = sanitazedHtml(commentText[index].value);
  }
  formComments[index].isEdit = !formComments[index].isEdit;
  
  renderFormComments();
  });
  });
}

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

  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === '') {
    nameInputElement.classList.add("error");
     return;
  }
  if (textInputElement.value === '') {
    textInputElement.classList.add("error");
    return;
  }
  
  hideForm.style.display = "none";
  loading.style.display="flex";

const fetchPostPromise = () => {
  fetch("https://wedev-api.sky.pro/api/v1/karpova-julia/comments", {
        method: "POST",
        body: JSON.stringify({
          text: sanitazedHtml(textInputElement.value),
          name: sanitazedHtml(nameInputElement.value),
          forceError: true,
        })
      }).then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер упал");
                 
        } if (response.status === 400) {
          throw new Error("Неверный запрос");
                 
        } else {
          return response.json();
        } 
      })
       .then(()=>{
          return fetchGetPromise(); 
        }).then(()=>{
          nameInputElement.value = "";
          textInputElement.value = "";
        }).catch((error) => {
          
      
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
         
                   
        });

      renderFormComments();
     

// устранение уязвимостей
function sanitazedHtml(htmlString)  {
  return htmlString.replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");
}

// Функция для имитации запросов в API
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

console.log("It works!");