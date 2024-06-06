const button = document.querySelector('.button');
const buttonInbox = document.querySelector('.button-inbox');
const buttonTask = document.querySelector('.button-task');
const inboxField = document.querySelector('.inbox-field');
const taskField = document.querySelector('.task-field');
const chatBox = document.querySelector('.chat-box');
const closeButton = document.querySelector('.close-icon');
const backButton = document.querySelector('.back-icon');
const replyBox = document.querySelector('.reply-box');

button.addEventListener('click', () => {
    inboxField.style.display = "none";
    chatBox.style.display = 'none';
    taskField.style.display = "none";
    replyBox.style.display = "none";
    if(buttonInbox.style.opacity == '1' && buttonTask.style.opacity == '1'){        
        buttonInbox.style.opacity = '0';
        buttonInbox.style.backgroundImage = "url('style/images/buttonInbox.png')";        
        buttonTask.style.opacity = '0';
        buttonTask.style.backgroundImage = "url('style/images/buttonTask.png')";
    } else {        
        buttonInbox.style.transform = 'translateX(0%)';
        buttonInbox.style.opacity = '1';
        buttonTask.style.transform = 'translateX(0%)';
        buttonTask.style.opacity = '1';
    }    
});
buttonInbox.addEventListener('click', () => {
    var currentImage = buttonInbox.style.backgroundImage;    
    buttonTask.style.backgroundImage = "url('style/images/buttonTask.png')";
    taskField.style.display = "none";
    chatBox.style.display = 'none';
    replyBox.style.display = "none";
    if(currentImage.includes("style/images/buttonInboxOpen.png")){
        buttonInbox.style.backgroundImage = "url('style/images/buttonInbox.png')";
        inboxField.style.display = "none";
    } else {        
        buttonInbox.style.backgroundImage = "url('style/images/buttonInboxOpen.png')";    
        inboxField.style.display = "block";
    }    
});
buttonTask.addEventListener('click', () => {
    var currentImage = buttonTask.style.backgroundImage; 
    inboxField.style.display = "none";
    chatBox.style.display = 'none';
    replyBox.style.display = "none";
    buttonInbox.style.backgroundImage = "url('style/images/buttonInbox.png')";   
    if(currentImage.includes("style/images/buttonTaskOpen.png")){        
        buttonTask.style.backgroundImage = "url('style/images/buttonTask.png')";
        taskField.style.display = "none";
    } else {                
        buttonTask.style.backgroundImage = "url('style/images/buttonTaskOpen.png')";                
        taskField.style.display = "block";
    }    
});

