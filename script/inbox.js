

closeButton.addEventListener('click', () => {
    chatBox.style.display = 'none';  
    buttonInbox.style.backgroundImage = "url('style/images/buttonInbox.png')";
});
backButton.addEventListener('click', () => {
    chatBox.style.display = 'none';
    inboxField.style.display = "block";  
});
document.addEventListener('DOMContentLoaded', () => {    
    const inboxList = document.querySelector('.inbox-list');

    const fetchInboxData = async () => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/idrissiddiq/Simpul-FE-Challenge/inboxList'); // Ganti dengan URL API yang sesuai
            const data = await response.json();
            
            data.forEach(item => {
                const inboxItem = document.createElement('div');
                inboxItem.classList.add('inbox-item');
                inboxItem.dataset.id = item.id;
                
                let profileElement;
                if (item.inboxType === 'direct') {
                    const initial = item.title.charAt(0).toUpperCase();
                    profileElement = document.createElement('div');
                    profileElement.classList.add('direct-profile');
                    profileElement.textContent = initial;
                } else {
                    profileElement = document.createElement('img');
                    profileElement.src = 'style/images/groupIcon.png';
                    profileElement.alt = 'Profile Picture';
                    profileElement.classList.add('profile-pic');
                }
                
                inboxItem.innerHTML = `
                    <div class="inbox-details">
                        <div class="inbox-header">
                            <div class="inbox-title">${item.title}</div>
                            <div class="inbox-date">${item.lastDate}</div>
                        </div>
                        <div class="inbox-info">
                            <span class="inbox-sender">${item.lstMember || ''}</span>
                        </div>
                        <div class="inbox-chat">${item.lastChat}</div>
                    </div>
                `;
                            
                inboxItem.prepend(profileElement);

                if (item.status === 'unread') {
                    const unreadIndicator = document.createElement('div');
                    unreadIndicator.classList.add('unread-indicator');
                    inboxItem.appendChild(unreadIndicator);
                }

                inboxItem.addEventListener('click', () => {                    
                    showChatBox(item);
                    
                });

                inboxList.appendChild(inboxItem);                
            });
        } catch (error) {
            console.error('Error fetching inbox data:', error);
        }
    };

    fetchInboxData();
});
const showChatBox = async (item) => {    
    const chatTitle = chatBox.querySelector('.chat-title');
    const chatMembers = chatBox.querySelector('.chat-members');
    const chatHistory = chatBox.querySelector('.chat-history');
    var dateTemp = "";
    var flagUnread = 0;
    
    chatTitle.textContent = item.title;
    if(item.inboxType == "group"){        
        chatMembers.textContent = `${item.member || 1} Participants`; 
    }    
    
    chatHistory.innerHTML = '';   
    try {
        const response = await fetch('https://my-json-server.typicode.com/idrissiddiq/Simpul-FE-Challenge/inboxDetail/' + item.id); // Ganti dengan URL API yang sesuai
        const data = await response.json();

        // Render chat history
        data.data.forEach(chat => {      
            const senderElement = document.createElement('div');
            senderElement.classList.add('sender');
            senderElement.textContent = chat.sender;

            const messageElement = document.createElement('div');
            messageElement.classList.add('message-chat');
            messageElement.textContent = chat.message;                            

            const messageTime = document.createElement('div');
            messageTime.classList.add('message-time');
            messageTime.textContent = chat.time;

            const messageText = document.createElement('div');
            messageText.classList.add('chat-bubble');                        

            const optionsIcon = document.createElement('span');
            optionsIcon.classList.add('options-icon');
            optionsIcon.innerHTML = '...';

            const optionsMenu = document.createElement('ul');
            optionsMenu.classList.add('options-menu');    
            
            

            if(chat.sender != 'You'){
                const shareOption = document.createElement('li');            
                const replyOption = document.createElement('li');  
                shareOption.textContent = 'Share';
                shareOption.addEventListener('click', () => {                    
                    alert('Share: ' + chat.message);
                });   
                replyOption.textContent = 'Reply';                
                replyOption.addEventListener('click', () => {                                        
                    const replyTitle = document.querySelector('#reply-title');
                    replyTitle.innerHTML = `Replying to ${chat.sender}`;
                    
                    const replyMessage = document.querySelector('.reply-message');
                    replyMessage.innerHTML = `${chat.message}`;

                    const replyBox = document.querySelector('.reply-box');
                    replyBox.style.display = 'block';

                    const replyClose = document.querySelector('.close-reply-box');
                    replyClose.addEventListener('click', () =>{
                        replyBox.style.display = 'none';
                    });
                });  
                optionsMenu.appendChild(shareOption);
                optionsMenu.appendChild(replyOption);
            }

            if (chat.sender === 'You') {
                messageText.classList.add('you');
                senderElement.classList.add('you');                            
                optionsIcon.classList.add('you');   
                optionsMenu.classList.add('you');
                const editOption = document.createElement('li');            
                const deleteOption = document.createElement('li');  
                editOption.textContent = 'Edit';
                editOption.addEventListener('click', () => {                    
                    alert('Edit: ' + chat.message);
                });   
                deleteOption.textContent = 'Delete';
                deleteOption.classList.add('options-delete');
                deleteOption.addEventListener('click', () => {                    
                    alert('Delete: ' + chat.message);                    
                });  
                optionsMenu.appendChild(editOption);
                optionsMenu.appendChild(deleteOption);        
            } else if(chat.sender != 'You' && item.inboxType == "direct") {
                messageText.classList.add('direct');
                senderElement.classList.add('direct');
            }            

            optionsIcon.addEventListener('click', () => {
                const isVisible = optionsMenu.style.display === 'block';
                optionsMenu.style.display = isVisible ? 'none' : 'block';
            });

            if(chat.date != dateTemp){
                const chatDate = document.createElement('div');
                chatDate.classList.add('date-divider');
                chatDate.innerHTML = `<hr><span>${chat.date}</span><hr>`;
                chatHistory.appendChild(chatDate); 
                dateTemp = chat.date
            }

            if(chat.status == "unread" && flagUnread == 0){
                const unreadDivider = document.createElement('div');
                unreadDivider.classList.add('unread-divider');                
                unreadDivider.innerHTML = `<hr><span>New Message</span><hr>`;                
                chatHistory.appendChild(unreadDivider); 
                flagUnread = 1;                                
            }            
            
            chatHistory.appendChild(senderElement);
            if(chat.replyMessage != null){
                const replyBuble = document.createElement('div');
                replyBuble.classList.add('chat-bubble');                                
                const messageReply = document.createElement('div');
                messageReply.classList.add('message-time');
                if (chat.sender === 'You'){
                    replyBuble.classList.add('you');
                    messageReply.classList.add('you');
                }                
                messageReply.textContent = chat.replyMessage;                
                replyBuble.appendChild(messageReply);
                chatHistory.appendChild(replyBuble);                
            }
            messageText.appendChild(optionsIcon);
            messageText.appendChild(optionsMenu);            
            messageText.appendChild(messageElement);
            messageText.appendChild(messageTime);
            chatHistory.appendChild(messageText);            
        });
    } catch (error) {
        console.error('Error fetching chat history:', error);
    }    
    chatBox.style.display = 'block';
    
    document.querySelector('.inbox-field').style.display = 'none';   
       
};
