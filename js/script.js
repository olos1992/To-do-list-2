{
    const tasks = [
        {
            content: "Zadanie 1",
            done: true,
        },
        {
            content: "Zadanie 2",
            done: false,
        },
    ];

    const render = () => {
        let listHtml = "";

        for (task of tasks) {
            listHtml +=
                `<li ${task.done ? 'class="list__item--done"' : ""}>
            <button class="js-doneButton">✔</button>
            ${task.content}
            <button class="js-removeButton">🗑</button>
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