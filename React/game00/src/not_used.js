document.addEventListener("DOMContentLoaded", function () {
  let submit = document.querySelector("#check");
  let list = document.querySelector("#list_tasks");
  submit.addEventListener("click", () => {
    event.preventDefault();
    let task_Val = document.querySelector("#task");
    let item = document.createElement("li");
    item.innerHTML = task_Val.value;
    list.appendChild(item);
    task_Val.value = "";
  });

  let count = document.querySelector("#count_val");
  let add = document.querySelector("#count");
  count.innerHTML = localStorage.getItem("counter");

  if (!localStorage.getItem("counter")) {
    localStorage.setItem("counter", 0);
  }
  let counter = 0;
  function Adding() {
    counter = localStorage.getItem("counter");
    counter++;
    count.innerHTML = counter;
    localStorage.setItem("counter", counter);
  }

  add.addEventListener("click", () => {
    Adding();
  });
});
