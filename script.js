const buttonElement = document.getElementById("get-button");
const commentElement = document.getElementById("list-comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("input-text");
const textComment = document.querySelector(".add-form-text");

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

const fetchGetPromise = () =>{
  const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/karpova-julia/comments", {
  method: "GET",
    })
    fetchPromise.then((response) => {
      const jsonPromise = response.json();
   

    jsonPromise.then((responseData)=> {
      const appComments = responseData.comments.map((comment) => {
        return{
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
      
      isLoading = false;
    });
  })} 
  fetchGetPromise();
  
    


//добавления счетчика лайков
const  initEventListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((el, index) => {
    el.addEventListener("click", (event) => {
       event.stopPropagation();
       formComments[index].like += formComments[index].isLike ? -1 : +1 ;
       formComments[index].isLike =!formComments[index].isLike;
       renderFormComments();
  })   
});
  
}
//рендер

const renderFormComments = () => {

  const commentElement = document.getElementById("list-comment"); 
  const commentHtml = formComments.map((formComment, index)=> {
    
  formComment.comment = formComments[index].comment
   .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
   .replaceAll("QUOTE_END", "</div>");
   
      return `<li id = "list-comment" class="comment"data-index = "${index}">
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


     
};

renderFormComments();


// ответ на комментарий по клику на форму комментария

function answerComment() {
  
  const commentsAnswer = document.querySelectorAll(".comment");
  const formText = document.querySelector(".add-form-text");
   commentsAnswer.forEach((comment, index)=> {
    comment.addEventListener("click", ()=>{
      
      formText.value = `QUOTE_BEGIN ${formComments[index].comment.replaceAll("<div class='quote'>","")
      .replaceAll("</div>","")} :\n ${formComments[index].name}QUOTE_END`;
      
            
}); 
  }); 
}  

//удаление комментария

// function deleteComment() {
//   const deleteButtons = document.querySelectorAll(".delete-button");

//   for (const deleteButton of deleteButtons){
//     deleteButton.addEventListener("click", () => {
   
//       const id = deleteButton.dataset.id;
//       console.log(id);
    
//       fetch("https://wedev-api.sky.pro/api/v1/karpova-julia/comments"+id, {
//         method: "DELETE",
      
//       }).then((response) => {
//         response.json().then((responseData) => {
//           // получили данные и рендерим их в приложении
//           formComments = responseData.todos;
//           renderFormComments();
//         });
      
//   })
  
    
//   });
//   }}


// редактирование комментария
function editComment() {
  const editButton = document.querySelectorAll(".edit-form-button");
  const commentText = document.querySelectorAll(".comment-text");
  editButton.forEach((el, index) => {
    el.addEventListener("click", (event) => {
  event.stopPropagation();
  if (formComments[index].isEdit) {
    formComments[index].comment = commentText[index].value;
  }
  formComments[index].isEdit = !formComments[index].isEdit;
  
  renderFormComments();
  });
  });
}


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

   fetch("https://wedev-api.sky.pro/api/v1/karpova-julia/comments", {
        method: "POST",
        body: JSON.stringify({
          text: textInputElement.value,
          name: nameInputElement.value
        })
      }).then((response) => {
        response.json().then((responseData) => {
         
          formComments = responseData.todos;
          fetchGetPromise();
          renderFormComments();
        });
      });


  nameInputElement.value = "";
  textInputElement.value = "";
  renderFormComments(); 
  
});

// устранение уязвимостей
function sanitazedHtml(htmlString)  {
  return htmlString.replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");
}


console.log("It works!");