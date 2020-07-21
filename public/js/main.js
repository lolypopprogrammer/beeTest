let paginationList = document.querySelectorAll(".task");
let buttonNext = document.querySelector("#next");
let buttonPrev = document.querySelector("#prev");
let currentList = [1, 2, 3];
let pagesCount = Math.ceil(paginationList.length / 3);
let closeForm = document.querySelectorAll(".img-close__form");
let openForm = document.querySelector("#createTask");
let createTask = document.querySelector(".sub");
let inputsForm = document.querySelectorAll("input, textarea");
let loginButton = document.querySelector(".login-href");
let loginConfirmButton = document.querySelector(".login-button");
let logoutButton = document.querySelector(".logout-href");

/*
    Подгрузка кнопок пагинации
 */
if (pagesCount > 1) {
    buttonNext.style.display = "block";
    for (let i = 1; i <= pagesCount; i++) {
        let but = document.createElement("button");
        but.className = "btn btn-primary page";
        but.innerHTML = i;
        buttonNext.before(but);
    }
}
let pageButton = document.querySelectorAll(".page");

/*
    Обновление стилий для пагинации
 */
let updateStyle = (currentList) => paginationList.forEach( (i) =>  {
    if (paginationList.length > 3) {
        pageButton.forEach( (i) => i.classList.add("btn-primary"));
        pageButton[Math.ceil(currentList[0] / 3) - 1].classList.remove("btn-primary");
    }
    if (currentList.includes(+i.dataset.key)) {
        (currentList.includes(1)) ? buttonPrev.style.display = "none" : buttonPrev.style.display = "block";
        (currentList.includes(paginationList.length)) ? buttonNext.style.display = "none" : buttonNext.style.display = "block";
        i.style.display = "block";
    } else {
        i.style.display = "none"
    }
});

updateStyle(currentList);

/*
    Переход по страцицам пагинации
 */
pageButton.forEach( (i) => i.addEventListener("click", function () {
    console.log(this.innerHTML);
    updateStyle(currentList = [1, 2, 3].map( (i) => i += 3 * (this.innerHTML - 1)));
}, false));

let updatePaginationNext = () => {
    updateStyle(currentList  = currentList.map( (i) => i += 3));
};

let updatePaginationPrev = () => {
    updateStyle(currentList  = currentList.map( (i) => i -= 3));
};

/*
    Создание задания
 */
let createTaskSub = () => {
    let wrapper = document.querySelectorAll(".create-task .form-group");
    let check = verify(wrapper);

    if (check) return;
    let form_data = new FormData();
    let inputs = document.querySelectorAll(".createTask__form input");
    let textarea = document.querySelectorAll(".createTask__form textarea");

    form_data.append('name', inputs[0].value);
    form_data.append('mail', inputs[1].value);
    form_data.append('text', textarea[0].value);
    fetch("/mvc-ex/tasks/create/", {
        method: "POST",
        body: form_data
    })
        .then(
            response => response.json()
        ).then(
        success => {
            alert("Задание успешно создано");
            document.location.reload();
        }
    ).catch(
        error => alert(error)
    );

};

/*
    Обновление стилий при верификации
 */
inputsForm.forEach( i => {
    i.addEventListener("change", function () {
        if (this.value) {
            i.classList.remove("failedInput");
            this.parentElement.querySelector(".required").classList.add("d-none");
            this.parentElement.querySelector(".required-label").style.color = "black";
        } else {
            i.classList.add("failedInput");
            this.parentElement.querySelector(".required").classList.remove("d-none");
            this.parentElement.querySelector(".required-label").style.color = "red";
        }
    })
});

/*
    Сортировка заданий
 */
let sort = (selector) => {
    let usersNames = document.querySelectorAll(".task");
    let arrNodeUser = [];
    let sibling = usersNames[usersNames.length-1].nextElementSibling;
    let dataSort;
    usersNames.forEach(user => {
        let key = user.querySelector(selector).innerText;
        arrNodeUser.push({key : key, node : user});
        user.parentNode.removeChild(user);
        dataSort = user.querySelector(selector).dataset.sort;
        if (dataSort === undefined || dataSort == "DESK") {
            user.querySelector(selector).dataset.sort = "ASK";
        } else if (dataSort == "ASK"){
            user.querySelector(selector).dataset.sort = "DESK";
        }
    });
    if (dataSort == undefined || dataSort == "DESK") {
        let arr = arrNodeUser.sort( (a, b) => b["key"] > a["key"] ? -1 : 1);
        arr.forEach( (i, counter) => i["node"].dataset.key = counter + 1);
        arr.forEach(i => sibling.before(i["node"]));
        updateStyle(currentList);
    } else if (dataSort == "ASK"){
        let arr = arrNodeUser.sort( (a, b) => b["key"] > a["key"] ? 1 : -1);
        arr.forEach( (i, counter) => i["node"].dataset.key = counter + 1);
        arr.forEach(i => sibling.before(i["node"]));
        updateStyle(currentList);
    }
};

/*
    Настройка заданий
 */
let settingsButton = document.querySelectorAll(".settings-task");
let settingsTask = function() {
    let div = document.createElement('div');
    let parent = this.parentElement;
    console.log(parent);
    div.classList.add("popup-container");
    div.classList.add("d-block");
    div.classList.add("settings-task__block");
    div.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <form class="mt-3 settings-task__form" action="/mvc-ex/tasks/create" method="post" id="form-set">
                        <h3>Изменить задачу</h3>
                        <img src="http://localhost:8888/mvc-ex/public/img/close.png" alt="close" class="img-close__form-set">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="userName" class="required-label">Имя пользователя</label>
                                <label for="" class="required d-none">Обязательное поле</label>
                                <input maxlength="32" type="text" class="form-control form-control-task__settings" value="${parent.querySelector(".userName").innerHTML}"  name="userName" id="userNameSettings" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="userEmail" class="required-label">e-mail</label>
                                <label for="" class="mail-req required d-none">Обязательное поле</label>
                                <input maxlength="32" type="email" class="form-control form-control-task__settings  mail" value="${parent.querySelector(".userMail").innerHTML}"  name="userEmail" id="userEmailSettings" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="taskDescription" class="required-label">Текст Задачи</label>
                                <label for="" class="required d-none">Обязательное поле</label>
                                <textarea class="form-control form-control-task__settings"  name="taskDescription" id="taskDescriptionSettings" required>${parent.querySelector(".taskDesc").innerHTML}</textarea>
                            </div>
                        </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" ${parent.querySelector(".taskStatus").innerHTML.includes("Выполнено") ? "checked" : ""} id="done-check">
                                <label class="form-check-label"  for="done-check">Выполнено</label>
                            </div>
                        <button type="button" class="btn btn-primary done-conf">Изменить</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.querySelector("main").after(div);

    let sendConfig = () => {
        let wrapper = document.querySelectorAll(".settings-task__block .form-group");
        let check = verify(wrapper);

        if (check) return;
        let form_data = new FormData();
        let inputs = document.querySelectorAll(".settings-task__form input");
        let textarea = document.querySelectorAll(".settings-task__form textarea");

        if (parent.querySelector(".taskDesc").innerHTML != textarea[0].value) {
            form_data.append('conf', true);
        }
        form_data.append('name', inputs[0].value);
        form_data.append('mail', inputs[1].value);
        form_data.append('text', textarea[0].value);
        form_data.append('check', inputs[2].checked);
        form_data.append('id', this.dataset.id);

        fetch("/mvc-ex/tasks/edit/", {
            method: "POST",
            body: form_data
        })
            .then(
                response => response.json()
            ).then(
            success => {
                alert("Задание успешно обновлено");
                document.location.reload();
            }
        ).catch(
            () => {
                div.remove();
                document.querySelector(".login").style.display = "block";
            }
        );
    };

    let deleteSettingsPopupButton = document.querySelector(".img-close__form-set");
    let doneSettingsPopupButton = document.querySelector(".done-conf");

    doneSettingsPopupButton.addEventListener("click", sendConfig, false);
    deleteSettingsPopupButton.addEventListener("click", () => div.remove(),false);

};

/*
    Верефикация полей
 */
let verify = (wrapper) => {
    let check = 0;
    function validateEmail(email) {
        let mailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return mailVal.test(String(email).toLowerCase());
    }
    for (let i = 0; i <  wrapper.length; i ++) {
        let field = wrapper[i].querySelector(".form-control");
        let label = wrapper[i].querySelector(".required");
        let req = wrapper[i].querySelector(".required-label");
        if (!field.value) {
            field.classList.add("failedInput");
            label.classList.remove("d-none");
            req.style.color = 'red';
            check++;
        } else {
            field.classList.remove("failedInput");
            label.classList.add("d-none");
            req.style.color = 'black';
        }
    }

    if (wrapper[1].querySelector(".mail") && !validateEmail(wrapper[1].querySelector(".mail").value)) {
        document.querySelector(".mail-req").innerHTML = "email не валиден";
        document.querySelector(".mail-req").classList.remove("d-none");
        wrapper[1].querySelector(".form-control").classList.add("failedInput");
        wrapper[1].querySelector(".required-label").style.color = "red";
        check++;
    }

    return check;
};

let loginConfirm = () => {
    let wrapper = document.querySelectorAll(".login-user__form .form-group");
    let check = verify(wrapper);
    if (check) return;
    let form_data = new FormData();
    let inputs = document.querySelectorAll(".login input");
    let textarea = document.querySelectorAll(".login textarea");

    form_data.append('userNameLogin', inputs[0].value);
    form_data.append('userPasswordLogin', inputs[1].value);

    fetch("/mvc-ex/tasks/login/", {
        method: "POST",
        body: form_data
    })
        .then(
            response => response.json()
        ).then(
        success => {
            alert("Вход выполнен успешно");
            document.location.reload();
        }
    ).catch( () => {
            for (let i = 0; i <  wrapper.length; i ++) {
                let field = wrapper[i].querySelector(".form-control");
                let label = wrapper[i].querySelector(".required-login");
                let req = wrapper[i].querySelector(".required-label");
                field.classList.add("failedInput");
                if (label) label.classList.remove("d-none");
                req.style.color = 'red';
            }
        }
    );
};
/*
    События
 */
buttonNext.addEventListener("click", updatePaginationNext, false);
buttonPrev.addEventListener("click", updatePaginationPrev, false);
closeForm.forEach( i => i.addEventListener("click", () => {
    document.querySelector(".create-task").style.display = "none";
    document.querySelector(".login").style.display = "none";
}, false));
openForm.addEventListener("click", () => document.querySelector(".create-task").style.display = "block", false);
if (loginButton) {
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".login").style.display = "block";
    }, false);
}
if (logoutButton) {
    logoutButton.addEventListener("click", () =>{
            fetch("/mvc-ex/tasks/logout/", {
                method: "GET",
            })
                .then(
                    response => response.json()
                ).then(
                success => {
                    alert("Выход выполнен успешно");
                    document.location.reload();
                }
            ).catch(
                error => alert(error)
            );
        }
        ,false);
}
createTask.addEventListener("click", createTaskSub, false);
settingsButton.forEach( (i) => i.addEventListener("click", settingsTask,false));
loginConfirmButton.addEventListener("click", loginConfirm, false);