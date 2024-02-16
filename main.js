import { getTodos, postTodo} from "./api.js";
import { renderFormComments } from "./renderFormComments.js";


const hidePreloader = document.getElementById("preload");

let myDate = new Date();
let month = myDate.getMonth()+1;
if (month < 10) {
  month = "0" + month;
}
let minutes = myDate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}


export let user = null;
export const setUser = (newUser) => {
  user = newUser;
}

let formComments = [];

export const fetchGetPromise = () => {
  
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
        alert(error);
      }
     })
   }

   fetchGetPromise();



//добавления счетчика лайков
export const  initEventListeners = ({formComments}) => {
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
});
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