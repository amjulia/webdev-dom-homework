import { getTodos, postTodo} from "./api.js";
import { renderFormComments } from "./renderFormComments.js";
import { renderLogin } from "./login.js";


const hidePreloader = document.getElementById("preload");
const hideForm = document.querySelector(".add-form");
const loading = document.getElementById("loading");



let myDate = new Date();
let month = myDate.getMonth()+1;
if (month < 10) {
  month = "0" + month;
}
let minutes = myDate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let formComments = [];

export const fetchGetPromise = (formComments) => {
  
  getTodos().then((responseData)=> {
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
       
      
       renderFormComments({ formComments });
       hidePreloader.style.display = "none";
       
      
     }).catch((error) => {
      if (error.message === "Сервер упал") {
       alert("Сервер сломался, попробуй позже");
      } else {
        alert("Нет подключения к интернету");
      }
     })
   }

   fetchGetPromise(formComments);
//renderLogin({fetchGetPromise});


//добавления счетчика лайков
export const  initEventListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");
   likeButtons.forEach((el, index) => {
    
    el.addEventListener("click", (event) => {
      event.stopPropagation();

      el.classList.add("-loading-like");

        delay(2000).then(() => {
     
       formComments[index].like += formComments[index].isLike ? -1 : +1 ;
       formComments[index].isLike =!formComments[index].isLike;
       
       renderFormComments({ formComments });
  }) });  
}
);
}

const buttonElement = document.getElementById("add-button");
const commentElement = document.getElementById("list-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("input-text");

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
  
 hideForm.style.display = "flex";
 //loading.style.display="flex";
  

const fetchPostPromise = () => {
  postTodo({ 
            text:textInputElement.value, 
            name:nameInputElement.value})
         .then(()=>{
          return fetchGetPromise(); 
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
     });

      renderFormComments({formComments});
    

// Функция для имитации запросов в API
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

console.log("It works!");