import { getTodos, likeTodo} from "./api.js";
import { renderFormComments } from "./renderFormComments.js";
import { getUserFromLocalStorage, saveToLocalStorage } from "./localStorage.js";


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
// export let user = getUserFromLocalStorage();
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
         likes: comment.likes,
         isLiked: comment.isLiked, 
         isEdit: false,
         isLoading:true
        }
        
       })
       formComments = appComments;
       
      
       renderFormComments({ formComments });
       hidePreloader.style.display = "none";
       
      
     }).catch((error) => {
      if (error.message === "Сервер упал") {
       console.log("Сервер сломался, попробуй позже");
      } else {
        console.log(error);
      }
     })
   }

   fetchGetPromise();



//добавления счетчика лайков
export const  initEventListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");
   likeButtons.forEach((el) => {
    
    el.addEventListener("click", (event) => {
      event.stopPropagation();
  const id = event.target.dataset.id;
    likeTodo({id}).then(()=>{
  fetchGetPromise();

}).catch((error) => {
 
  if (error.message === 'Неавторизованные пользователи не могут ставить лайки') {
    console.log('Неавторизованные пользователи не могут ставить лайки');
  }
  else {
    console.log("Кажется, у вас сломался интернет, попробуйте позже");
  }
  console.warn(error);
});
 
});  
});
}

console.log("It works!");