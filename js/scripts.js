const click_handler = (e) => {
  let itarea = document.querySelector(".input_tarea");
  let contenedor_tarea = document.querySelector("#tareas");

  switch (e.target.classList.value) {
    case "prioridad_max":
      contenedor_tarea.classList.value="";
      contenedor_tarea.classList.add("prioridad_max");
      break;

    case "prioridad_med":
      contenedor_tarea.classList.value="";
      contenedor_tarea.classList.add("prioridad_med");
      break;

    case "prioridad_min":
      contenedor_tarea.classList.value="";
      contenedor_tarea.classList.add("prioridad_min");
      break;

    case "agregar_tarea":
      {
        let litarea = document.createElement("LI");
        litarea.classList.add(contenedor_tarea.classList.value);
        litarea.textContent = itarea.value;

        contenedor_tarea.appendChild(litarea);
        itarea.value = "";
      }
      break;

    default:
      break;
  }
  e.preventDefault();
};

document.querySelector(".wrapper").addEventListener("click", click_handler);
// document
//   .querySelector(".prioridad_med")
//   .addEventListener("click", agrega_color);
// document
//   .querySelector(".prioridad_min")
//   .addEventListener("click", agrega_color);
