import { renderFormComments } from "./renderFormComments.js";

// ответ на комментарий по клику на форму комментария

export function answerComment({formComments}) {
  
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
  export function editComment({formComments}) {
    const editButton = document.querySelectorAll(".edit-form-button");
    const commentText = document.querySelectorAll(".comment-text");
    editButton.forEach((el, index) => {
        
      el.addEventListener("click", (event) => {
        
    event.stopPropagation();
    if (formComments[index].isEdit) {
      formComments[index].comment = commentText[index].value;
    }
    formComments[index].isEdit = !formComments[index].isEdit;
    
    renderFormComments({formComments});
    });
    });
  }