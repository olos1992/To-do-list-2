{
    let tasks = [];
    let hideDoneTasks = false;

    const renderTasks = () => {
        let listHtml = "";

        for (task of tasks) {
            listHtml += `
                    <li class="list__item js-listItem ${hideDoneTasks && task.done ? "list__item--hidden" : ""} ">
                    <button class="list__button list__button--done js-doneButton">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="list__itemContent ${task.done ? "list__itemContent--done" : ""}">
                    ${task.content}
                    </span>
                    <button class="list__button list__button--remove js-removeButton">
                    🗑
                    </button>
                </li>
        `};

        document.querySelector(".js-tasksList").innerHTML = listHtml;
    };

    const renderButtons = () => {
        const listContent = document.querySelector(".js-tasksList").innerHTML

        let listButtons = "";

        if (listContent !== "") {
            listButtons = `
                <button class = "container__buttons js-hideDoneButton" ${tasks.every(({ done }) => !done) ? "disabled" : ""}>
                ${hideDoneTasks === false ? "Ukryj ukończone" : "Pokaż ukończone"}
                </button>
                <button class = "container__buttons js-doneAllButton">
                Ukończ wszystkie
                </button>
        `};

        document.querySelector(".js-buttonsPlace").innerHTML = listButtons;
    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        });
    };

    const bindToggleDoneEvents = () => {
        const doneButtons = document.querySelectorAll(".js-doneButton");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        });
    };

    const bindButtonsEvents = () => {
        const doneAllButton = document.querySelector(".js-doneAllButton");
        const hideDoneButton = document.querySelector(".js-hideDoneButton");

        if (doneAllButton !== null) {
            doneAllButton.addEventListener("click", () => {
                toggleAllTaskDone();
            });

            if (tasks.every(({ done }) => done)) {
                doneAllButton.disabled = true;
            }
        };

        if (hideDoneButton !== null) {
            hideDoneButton.addEventListener("click", () => {
                hideAllDoneTasks();
            });
        };
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
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = tasks.map((task, taskIndex) =>
            taskIndex === index ? { ...task, done: !task.done } : task
        );
        render();
    };

    const toggleAllTaskDone = () => {
        tasks.map(task => task.done = true)
        render();
    };

    const hideAllDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks
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

        autofocus(newTaskInput);
    };

    const autofocus = (newTaskInput) => {
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