{
    const tasks = [];

    const render = () => {
        let listHtml = "";

        for (task of tasks) {
            listHtml +=
                `<li class="list__item">
            <button class="list__button list__button--done js-doneButton">
            ${task.done ? "✔" : ""}
            </button>
            <span class="list__itemContent ${task.done ? "list__itemContent--done" : ""}">${task.content}</span>
            <button class="list__button list__button--remove js-removeButton">🗑</button>
            </li>`
        };

        document.querySelector(".js-tasksList").innerHTML = listHtml;

        bindEvents();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        });

        const doneButtons = document.querySelectorAll(".js-doneButton");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        });
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });
        
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);

        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit)
    };

    init();
}