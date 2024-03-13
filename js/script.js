{
    let tasks = [];

    const render = () => {
        let listHtml = "";

        for (task of tasks) {
            listHtml +=
                `<li class="list__item">
                    <button class="list__button list__button--done js-doneButton">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="list__itemContent ${task.done ? "list__itemContent--done" : ""}">
                    ${task.content}
                    </span>
                    <button class="list__button list__button--remove js-removeButton">
                    🗑
                    </button>
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
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index +1)
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {...tasks[index], done: !tasks[index].done},
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            newTaskInput.focus();
            return;
        };

        addNewTask(newTaskContent);

        newTaskInput.value = "";
        newTaskInput.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit)
    };

    init();
}