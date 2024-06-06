document.addEventListener('DOMContentLoaded', () => {    
    const taskList = document.querySelector('.task-list');

    const fetchTaskData = async () => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/idrissiddiq/Simpul-FE-Challenge/taskList');
            const data = await response.json();
            
            data.forEach(item => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task-item');
                taskItem.dataset.id = item.id;

                const taskDetail = document.createElement('div');
                taskDetail.classList.add('task-details');
                
                const taskTitle = document.createElement('div');
                taskTitle.classList.add('task-title');
                taskTitle.innerHTML = `${item.title}`;

                const taskCheckbox = document.createElement('input');
                taskCheckbox.classList.add('task-checkbox');
                taskCheckbox.type = "checkbox";                

                const taskDue = document.createElement('div');
                taskDue.classList.add('task-due');
                taskDue.innerHTML = `${item.dueDate} Days Left`;

                if(item.status == 'done'){
                    taskCheckbox.checked = true;
                    taskTitle.classList.add('completed');
                    taskDue.style.opacity = '0';
                } 

                const taskDate = document.createElement('div');
                taskDate.classList.add('task-date');
                taskDate.innerHTML = `${item.deadline}`;

                const expandIcon = document.createElement('div');
                expandIcon.classList.add('expand-icon');
                expandIcon.innerHTML = `<i class="fas fa-chevron-down"></i>`;

                const taskOption = document.createElement('div');
                taskOption.classList.add('task-option-icon');
                taskOption.innerHTML = `...`;

                const optionsMenu = document.createElement('ul');
                optionsMenu.classList.add('task-options-menu');                      
            
                const deleteOption = document.createElement('li');                             
                deleteOption.textContent = 'Delete';
                deleteOption.classList.add('task-options-delete');
                deleteOption.addEventListener('click', () => {                    
                    alert('Delete: ' + item.id);
                });    
                optionsMenu.appendChild(deleteOption);                           

                const taskDescription = document.createElement('div');
                taskDescription.classList.add('task-description');
                               
                const taskDateInput = document.createElement('input');
                taskDateInput.classList.add('task-date-input');
                taskDateInput.type = "date";
                if(item.targetDate == null){
                    taskDescription.innerHTML = `<i id="clock-${item.id}" class="far fa-clock empty-icon"></i>`;
                } else {
                    taskDescription.innerHTML = `<i id="clock-${item.id}" class="far fa-clock filled-icon"></i>`;
                    taskDateInput.value = formatDate(item.targetDate);  
                }                   
                
                const taskDesc = document.createElement('p');
                if(item.description == null){
                    taskDesc.innerHTML = `<i class="fas fa-pencil-alt empty-icon"></i>No Description`;
                } else{
                    taskDesc.innerHTML = `<i class="fas fa-pencil-alt filled-icon"></i>${item.description}`;
                }    
                
                const bookmarkSection = document.createElement('div');
                bookmarkSection.classList.add('bookmark-section');

                const bookmarkIcon = document.createElement('div');
                bookmarkIcon.classList.add('bookmark-icon');
                bookmarkIcon.innerHTML = `<i class="far fa-bookmark"></i>`;
                if(item.bookmarks != null){
                    bookmarkIcon.style.color = '#2F80ED';
                }

                const bookmarkList = document.createElement('div');
                bookmarkList.classList.add('bookmark-list');
                item.bookmarks = item.bookmarks || []; // Ensure bookmarks property exists
                item.bookmarks.forEach(bookmark => {
                    const bookmarkItem = document.createElement('span');
                    bookmarkItem.classList.add('bookmark-item');
                    bookmarkItem.textContent = bookmark.name;
                    bookmarkItem.style.backgroundColor = getRandomColor();
                    bookmarkList.appendChild(bookmarkItem);
                });

                const bookmarkDropdown = document.createElement('ul');
                bookmarkDropdown.classList.add('bookmark-dropdown');

                const hardcodedBookmarks = ['Important ASAP', 'Offline Meeting', 'Virtual Meeting', 
                    'ASAP', 'Client Related', 'Self Task', 'Appointments', 'Court Related'
                ];
                hardcodedBookmarks.forEach(bookmark => {
                    const bookmarkOption = document.createElement('li');
                    bookmarkOption.textContent = bookmark;
                    bookmarkOption.classList.add('bookmark-option');
                    bookmarkOption.style.backgroundColor = getRandomColor();
                    bookmarkDropdown.appendChild(bookmarkOption);
                });

                bookmarkIcon.addEventListener('click', () => {
                    bookmarkDropdown.style.display = bookmarkDropdown.style.display === 'none' ? 'block' : 'none';
                });

                bookmarkSection.appendChild(bookmarkIcon);
                bookmarkSection.appendChild(bookmarkList);
                bookmarkSection.appendChild(bookmarkDropdown);

                taskOption.addEventListener('click', () => {
                    const isVisible = optionsMenu.style.display === 'block';
                    optionsMenu.style.display = isVisible ? 'none' : 'block';
                });
                

                taskDetail.appendChild(taskCheckbox);
                taskDetail.appendChild(taskTitle);                
                taskDetail.appendChild(taskDue);
                taskDetail.appendChild(taskDate);
                taskDetail.appendChild(expandIcon);
                taskDetail.appendChild(taskOption);                                                
                taskDescription.appendChild(taskDateInput);
                taskDescription.appendChild(taskDesc); 
                taskDescription.appendChild(bookmarkSection);               
                taskItem.appendChild(taskDetail);
                taskItem.appendChild(optionsMenu);
                taskItem.appendChild(taskDescription);                
                taskList.appendChild(taskItem);

                taskCheckbox.addEventListener('change', function() {
                    var taskTitle = this.closest('.task-details').querySelector('.task-title');
                    if (this.checked) {
                        taskTitle.classList.add('completed');
                        taskDue.style.opacity = '0';
                    } else {
                        taskTitle.classList.remove('completed');
                        taskDue.style.opacity = '1';
                    }
                });

                taskDateInput.addEventListener('change', function() {                    
                    const iconClock = document.querySelector('#clock-'+ item.id);                     
                    if (taskDateInput.value == "") {                                            
                        iconClock.classList.add('empty-icon');
                        iconClock.classList.remove('filled-icon');
                    } else {                                                
                        iconClock.classList.add('filled-icon');
                        iconClock.classList.remove('empty-icon');
                    }
                });

                expandIcon.addEventListener('click', () => {
                    if(taskDescription.style.display == 'block'){        
                        taskDescription.style.display = 'none'
                    } else {        
                        taskDescription.style.display = 'block'
                    }    
                });
            });
        } catch (error) {
            console.error('Error fetching task data:', error);
        }
    };

    fetchTaskData();
});
function formatDate(dateStr) {
    const [dd, mm, yyyy] = dateStr.split('/');
    return `${yyyy}-${mm}-${dd}`;
}
function getRandomColor(){
    var h = Math.floor(Math.random() * 360);
  
    return `hsl(${h}deg, 100%, 90%)`;
  };
