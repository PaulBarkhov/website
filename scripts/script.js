document.addEventListener("DOMContentLoaded", () => {
    let currentDate = new Date(),
        modifiedDate = currentDate,
        months = ["Januar", "Februar", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const body = document.querySelector("body"),
          glass = document.querySelectorAll(".glass");

    //HAMBURGER MENU
    const menu__button = document.querySelector(".menu__button")
          menu__wrapper = document.querySelector(".menu__wrapper"),
          menu = document.querySelector(".menu"),

          menu__darkModeButton = document.querySelector("#menu__darkModeButton");

    function showMenu() {
        menu.classList.add("show__menu");
        menu.classList.remove("close__menu");
        menu__wrapper.style.maxHeight = "300px";
    }

    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !menu__button.contains(event.target)) {
            hideMenu();
        }
    })

    function hideMenu() {
        menu.classList.remove("show__menu");
        menu.classList.add("close__menu");
        menu__wrapper.style.maxHeight = "0px";
    }

    menu__button.addEventListener('click', (event) => {
        event.preventDefault();
        if (menu.classList.contains("show__menu")) {
            hideMenu();
        }
        else {
            showMenu();
        }
    });

    menu__darkModeButton.addEventListener("click", () => {
        // body.classList.toggle("brightMode");
        // body.classList.toggle("darkMode");

        if (menu__darkModeButton.innerHTML == "Dark Mode") {
            menu__darkModeButton.innerHTML = "Bright Mode";
            body.style.background = "url(style/images/bright1.jpg)";
        
        }
        else {
            menu__darkModeButton.innerHTML = "Dark Mode";
            body.style.background = "url(style/images/bright1.jpg)";
        }
    });


    //ADD TASK
    const toDo = document.querySelector('#toDo'),
        
          add__task__button = document.querySelector(".add__task__button"),
          main = document.querySelector("main"),
          setDate = document.querySelector(".setDate"),
          calendar = document.querySelector(".calendar"),
          content = document.querySelector(".content"),
          add__task__window__wrapper = document.querySelector(".add__task__window__wrapper"),
          
          set__task__name = document.querySelector(".set__task__name"),
          task__name__OK__button = document.querySelector("#task__name__OK__button"),
          task__name__input = document.querySelector("#name"),

          set__task__color = document.querySelector(".set__task__color"),
          task__colors = document.querySelectorAll("th"),

          set__task__time = document.querySelector(".set__task__time"),
          clock = document.querySelector(".clock"),
          clockHours = clock.querySelector(".hours"),
          clockMinutes = clock.querySelector(".minutes"),
          task__time__OK__button = document.querySelector("#task__time__OK__button"),
          task__date__skip__button = document.querySelector("#task__date__skip__button"),
          task__time__input = document.querySelector("#time"), 

          set__task__notifications = document.querySelector(".set__task__notifications"),
          task__notifications__OK__button = document.querySelector("#task__notifications__OK__button"),
          
          notifications = set__task__notifications.querySelectorAll("input");

    let name = "New task",
        color = "blue",
        date = "",
        time = "",
        notification_10min,
        notification_1hour,
        notification_1day;


    function toggleMain() {
        main.classList.toggle("hide"); 
        add__task__window__wrapper.classList.toggle("hide");
    }

    function toggleContent() {
        content.classList.toggle("hide");
    }

    function toggleHeader() {
        event.preventDefault();

        add__task__button.classList.toggle("rotate");

        if (toDo.innerHTML == "To Do List") {
            toDo.innerHTML = "New task";
        }
        else {
            toDo.innerHTML = "To Do List";
            hideTaskName();
            if (!set__task__color.classList.contains("hide")) {
                toggleTaskColor();
            }
            if (!set__task__time.classList.contains("hide")) {
                toggleTaskTime();
            }
            if (!set__task__notifications.classList.contains("hide")) {
                toggleTaskNotifications();
            }
            modifiedDate = currentDate;
        }
    }

    function toggleTaskName() {
        name = "New task";
        set__task__name.classList.toggle("hide");
    };

    function showTaskName() {
        name = "New task";
        set__task__name.classList.remove("hide");
        task__name__input.focus();
    }

    function hideTaskName() {
        set__task__name.classList.add("hide");
    }

    function toggleTaskColor() {
        set__task__color.classList.toggle("hide");
    }

    function toggleTaskDate() {
        set__task__time.classList.toggle("hide");
    }

    function toggleTaskTime() {
        set__task__time.classList.toggle("hide");
        buildClock();
    }

    function buildClock() {
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        if (hours < 10) {
            clockHours.innerHTML = "0" + hours;
        }
        else {
            clockHours.innerHTML = hours;
        }
        
        if (minutes < 10) {
            clockMinutes.innerHTML = "0" + minutes;
        }
        else {
            clockMinutes.innerHTML = minutes;
        }

        clockHours.addEventListener("click", () => {

            if (hours < 23) {
                hours++;
            }
            else {
                hours = 0;
            }

            if (hours < 10) {
                clockHours.innerHTML = "0" + hours;
            }
            else {
                clockHours.innerHTML = hours;
            }
            
            if (minutes < 10) {
                clockMinutes.innerHTML = "0" + minutes;
            }
            else {
                clockMinutes.innerHTML = minutes;
            }

        });

        clockMinutes.addEventListener("click", () => {

            if (minutes < 59) {
                minutes++;
            }
            else {
                minutes = 0;
            }      
            
            if (hours < 10) {
                clockHours.innerHTML = "0" + hours;
            }
            else {
                clockHours.innerHTML = hours;
            }
            
            if (minutes < 10) {
                clockMinutes.innerHTML = "0" + minutes;
            }
            else {
                clockMinutes.innerHTML = minutes;
            }

        });
    }

    function toggleTaskNotifications() {
        set__task__notifications.classList.toggle("hide");
    }

    add__task__button.addEventListener("click", () => {
        if (content.classList.contains("hide")) {
            content.classList.toggle("hide");
            toggleHeader();
            setDate.classList.toggle("hide");
        }
        else {
            toggleMain();
            toggleHeader();
            showTaskName();
            hideMenu();
            date = "";
        }
    });

    task__name__OK__button.addEventListener("click", (event) => {
        event.preventDefault();

        if (task__name__input.value == "") {
            task__name__input.value = "New Task";
        }
        else {
            name = task__name__input.value;
        }
        task__name__input.value = "";

        hideTaskName();
        toggleTaskColor();
    });


    task__colors.forEach(item => {
        item.addEventListener("click", (event) => {
            color = event.target.style.backgroundColor;

            toggleTaskColor();

            if (date == "") {
                toggleMain();
                toggleContent();
                setDate.classList.toggle("hide");
            }
            else {
                toggleTaskTime();
            }
        });
    });

    task__time__OK__button.addEventListener("click", (event) => {
        event.preventDefault();

        modifiedDate = currentDate;

        time = clockHours.innerHTML + ":" + clockMinutes.innerHTML;

        toggleTaskTime();
        toggleTaskNotifications();
    });

    task__date__skip__button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("fsdfsdf");
        toggleTaskTime();
        toggleTaskNotifications();
    });

    task__notifications__OK__button.addEventListener("click", (event) => {
        event.preventDefault();

        toggleHeader();
        toggleMain();

        if (notifications[0].checked == true) {
            notification_10min = "checked";
        }
        else {
            notification_10min = "";
        }

        if (notifications[1].checked == true) {
            notification_1hour = "checked";
        }
        else {
            notification_1hour = "";
        }

        if (notifications[2].checked == true) {
            notification_1day = "checked";
        }
        else {
            notification_1day = "";
        }

        task = document.createElement("div");
        task.innerHTML = `
            <div class="task glass">

                <div class="taskMain">
                    <div style="background: ${color}" class="task__color"></div>

                    <div class="task__name">${name}</div>

                    <div class="task__date">${date}</div>
                    
                    <div class="task__time">${time}</div>
                </div>

                <div class="taskExpanded">
                    <div class="task__notifications">
                        🔔
                        <p>1 day</p>

                        <label class="switch">
                            <input type="checkbox" ${notification_1day}>
                            <span class="slider"></span>
                        </label>

                        <hr>

                        <p>1 hour</p>
                        
                        <label class="switch">
                            <input type="checkbox" ${notification_1hour}>
                            <span class="slider"></span>
                        </label>

                        <hr>

                        <p>10 min</p>

                        <label class="switch">
                            <input type="checkbox" ${notification_10min}>
                            <span class="slider"></span>
                        </label>                  
                </div>
                
            </div>
        `
        content.append(task);

        const noTasksMessage = content.querySelector(".noTasksMessage");
        if (noTasksMessage) {
            noTasksMessage.remove();
        }

        task.addEventListener("click", (event) => {
            //event.target.parentNode.classList.toggle("taskExpanded");

            if (event.target.classList.contains("task__name") || event.target.classList.contains("task__date") || event.target.classList.contains("task__time")) {
                event.target.parentElement.parentElement.classList.toggle("taskExpanded");
            }
            if (event.target.classList.contains("taskMain")) {
                event.target.parentElement.classList.toggle("taskExpanded");
            }
            else {
                event.target.classList.toggle("taskExpanded");
            }
        });
    });












    //CALENDAR 
    const calendar__currentMonth = document.querySelector(".calendar__currentMonth"),
          calendar__previousMonth = document.querySelector(".calendar__previousMonth"),
          calendar__nextMonth = document.querySelector(".calendar__nextMonth"),
          calendar__days = document.querySelector(".calendar__days");

    let days,
        exportMonth;

    function buildCalendar () {
        let mm = currentDate.getMonth(),
            yy = currentDate.getFullYear(),

            currentMonth = months[mm];

        exportMonth = mm+1;
        if (exportMonth < 10) {
            exportMonth = "0" + exportMonth;
        };

        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
            lastDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay(),
            firstDayIndex = currentDate;
                            firstDayIndex.setDate(1); 
                            firstDayIndex = firstDayIndex.getDay();

        let prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();


        nextMonth = months[months.indexOf(currentMonth) + 1];
        previousMonth = months[months.indexOf(currentMonth) - 1];

        if (currentMonth == "Januar") {
            previousMonth = months[11];
        }
        if (currentMonth == "December") {
            nextMonth = months[0];
        }

        calendar__currentMonth.innerHTML = `${currentMonth} ${yy}`;
        calendar__previousMonth.innerHTML = `${previousMonth}`;
        calendar__nextMonth.innerHTML = `${nextMonth}`;

        days = document.createElement("div");
        days.classList.add("days");
        calendar__days.append(days);

        for (i = firstDayIndex - 1; i > 0; i--) {
            days.innerHTML += `<div class="calendar__anotherMonth">${prevMonthLastDay - i}</div>`;
        }; // adds previous month`s days to start

        for (i = 1; i <= lastDay; i++) {
            days.innerHTML += `<div>${i}</div>`;
        };  // add all days

        for (i = 1; i <= 7 - lastDayIndex; i++) {
            days.innerHTML += `<div class="calendar__anotherMonth">${i}</div>`;
        };
    };

    buildCalendar();

    calendar__nextMonth.addEventListener("click", () => {
        days.remove();

        let mm = currentDate.getMonth();
        currentDate.setMonth(mm + 1);

        currentMonth = months[currentDate.getMonth()];

        buildCalendar();
    });

    calendar__previousMonth.addEventListener("click", () => {
        days.remove();

        let mm = currentDate.getMonth();
        currentDate.setMonth(mm - 1);

        currentMonth = months[currentDate.getMonth()];

        buildCalendar();
    });

    calendar__days.addEventListener("click", (event) => {
        if (!event.target.classList.contains("days")) {

            const tasks = content.querySelectorAll("div");

            if (tasks.length == 0) {
                const noTasksMessage = document.createElement("div");
                noTasksMessage.setAttribute("class", "noTasksMessage glass");

                noTasksMessage.innerHTML = `
                    <h1> There are no tasks yet</h1>
                    <button>Add</button>
                `;

                content.append(noTasksMessage);

                const addButton = noTasksMessage.querySelector("button");

                addButton.addEventListener("click", () => {
                    toggleMain();
                    toggleHeader();
                    showTaskName();
                    hideMenu();
                    date = "";
                });
            }



            let clickedDay = event.target.innerHTML;
    
            if (content.classList.contains('hide')) {
                
                if (clickedDay < 10) {
                    clickedDay = "0" + clickedDay;
                }
                date = clickedDay + "." + exportMonth;

                toggleMain();
                toggleTaskTime();
                toggleContent();
                setDate.classList.toggle("hide");
            }

            days.querySelectorAll("div").forEach(item => {
                item.classList.remove("calendar__activeDay");
            })
            event.target.classList.add("calendar__activeDay");
        }
    });
                
});