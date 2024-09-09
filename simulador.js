////////// Array de objetos para las tareas
let tasks = [];






///////////7 Función para obtener el día de la semana
function getDayOfWeek() {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const now = new Date();
  return days[now.getDay()];
}









/////////// Función para obtener la hora actual
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString();
}







//////////// Reloj en tiempo real
function startClock() {
  const clockElement = document.getElementById("clock");
  setInterval(() => {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString();
  }, 1000);
}









//////////// Cargar tareas desde el localStorage cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  startClock(); // Iniciar el reloj
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }
});









//////////// Evento para agregar una nueva tarea
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const taskInput = document.getElementById("taskInput").value;

  const newTask = {
    id: Date.now(),
    name: taskInput,
    completed: false,
    day: getDayOfWeek(), ///////// Agregar día de la semana
    completedAt: null
  };

  tasks.push(newTask);

  //////////// Guardar en localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  /////////// Renderizar las tareas
  renderTasks();

  ////////// Limpiar el input
  this.reset();
});







////////// Función para renderizar las tareas
function renderTasks(filteredTasks = tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    
    ////////// Mostrar tarea y día de la semana
    li.innerHTML = `<div>${task.name} - <small>${task.day}</small></div>`;
    
    // Mostrar hora de completado si está completada
    if (task.completedAt) {
      li.innerHTML += `<div class="text-muted"><small>Completado a las: ${task.completedAt}</small></div>`;
    }

    ///////// Marcar como completado
    const completedButton = document.createElement("button");
    completedButton.textContent = task.completed ? "Desmarcar" : "Completar";
    completedButton.className = "btn btn-success btn-sm me-2";
    completedButton.addEventListener("click", () => toggleTaskCompletion(task.id));

    ////////// Botón para eliminar tarea
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Borrar";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(completedButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

////////// Función para alternar el estado de completado de una tarea
function toggleTaskCompletion(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? getCurrentTime() : null; ////////// Registrar la hora de completado
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/////////// Función para eliminar una tarea
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/////////// Eliminar todas las tareas
document.getElementById("clearTasks").addEventListener("click", function () {
  tasks = [];
  localStorage.removeItem("tasks");
  renderTasks();
});

////////// Filtrar y mostrar solo las tareas completadas
document.getElementById("filterCompleted").addEventListener("click", function () {
  const completedTasks = tasks.filter(task => task.completed);
  renderTasks(completedTasks);
});



////////777///////