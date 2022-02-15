"use strict";

function viewElements(array) {
    document.querySelector(".tasks").innerHTML = "";
    document.querySelector(".tasks").innerHTML += '<form method="dialog" onsubmit="createOrder(this)"> <textarea name="text" id="text" placeholder="Your task:"></textarea> <br><input type="submit" value="Create" class="createBtn"> </form>';
    for (let i = 0; i < array.length; i++) {
        if (array[i] != null) {
            document.querySelector(".tasks").innerHTML += `<div class="task"><div class="text">${JSON.parse(localStorage.getItem("tasks"))[i]}</div><div class="delete__block"><button onclick="deleteBtn(this)">X</button></div></div> `;
        }
    }
}

window.onload = () => {
    viewElements(JSON.parse(localStorage.getItem("tasks")));
};

if (localStorage.getItem("tasks")) {
    console.log(1);
} else {
    console.log(0);
    let array = [];
    localStorage.setItem("tasks", JSON.stringify(array));
}

function deleteBtn(btn) {
    //document.querySelector(".text").innerHTML
    let element = document.querySelectorAll('button');
    for (var i = 0, len = element.length; i < len; i++) {
        element[i].onclick = function() {
            let elem = this.parentNode;
            let taskHTML = elem.parentNode.innerHTML;
            //Clear</div><div class="delete__block" bis_skin_checked="1"><button onclick="deleteBtn(this)">X</button></div>
            let task1 = taskHTML.replace('<div class="text" bis_skin_checked="1">', "");
            let task2 = task1.replace('</div><div class="delete__block" bis_skin_checked="1"><button onclick="deleteBtn(this)">X</button></div>', "");
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            for (let i = 0; i < tasks.length; ++i) {
                if (tasks[i] == task2) {
                    delete tasks[i];
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                }
            }
            localStorage.removeItem(task2);
            viewElements(JSON.parse(localStorage.getItem("tasks")));
        }
    }
}

function createOrder(form) {
    let text = form.text.value;
    if (text != "") {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(text);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        form.text.value = "";
        viewElements(JSON.parse(localStorage.getItem("tasks")));
    } else {
        alert("You entered an empty string!");
        return false;
    }
}
/* 
<div class="task">
    <div class="text">Сделать уборку</div>
    <div class="delete__block">
        <button onclick="deleteBtn(this)">X</button>
    </div>
</div> 
*/