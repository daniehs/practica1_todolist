const click_handler = (e) => {
  let itarea = document.querySelector(".input_tarea");
  let contenedor_tarea = document.querySelector("#tareas");
  let fingresada = document.querySelector(".fecha_hora");

  switch (e.target.classList.value) {
    case "prioridad_max":
      contenedor_tarea.classList.value = "";
      contenedor_tarea.classList.add("prioridad_max");
      e.preventDefault();

      break;

    case "prioridad_med":
      contenedor_tarea.classList.value = "";
      contenedor_tarea.classList.add("prioridad_med");
      e.preventDefault();

      break;

    case "prioridad_min":
      contenedor_tarea.classList.value = "";
      contenedor_tarea.classList.add("prioridad_min");
      e.preventDefault();

      break;

    case "agregar_tarea": {
      e.preventDefault();

      if (
        itarea.value &&
        fingresada.value &&
        contenedor_tarea.classList.value &&
        new Date(fingresada.value) - Date.now() > 0
      ) {
        let divtarea = document.createElement("DIV");
        let ntareas = document.getElementById("tareas").childElementCount;
        divtarea.classList.add(
          `tarea-${ntareas}`,
          contenedor_tarea.classList.value
        );
        let litarea = document.createElement("LI");
        litarea.textContent = itarea.value;

        let temp = document.createElement("SPAN");
        temp.classList.add(`temporizador-${ntareas}`);

        tareas.appendChild(divtarea);
        let tarea = document.querySelector(`.tarea-${ntareas}`);
        tarea.appendChild(litarea);
        tarea.appendChild(temp);
        let temporizador = document.querySelector(`.temporizador-${ntareas}`);

        timer(fingresada.value, temporizador);

        itarea.value = "";
        fingresada.value = "";
      } else {
        let error = document.createElement("P");
        let merror;
        if (!contenedor_tarea.classList.value)
          merror = "Elija un color de prioridad para la tarea";
        if (!fingresada.value) merror = "Debe ingresar una fecha";
        if (!itarea.value) merror = "Nombre de tarea es obligatorio";
        if (new Date(fingresada.value) - Date.now() < 0)
          merror = "Debe elegir una fecha mayor a la actual ";

        error.textContent = merror;
        console.log(error);
        if (!contenedor_tarea.hasChildNodes()) {
          contenedor_tarea.appendChild(error);
        } else {
          contenedor_tarea.replaceChild(error, contenedor_tarea.firstChild);
        }
      }

      break;
    }
    default:
      break;
  }
};

document.querySelector(".wrapper").addEventListener("click", click_handler);

añadircero = (hora) => (hora < 10 ? "0" + hora : hora);

const timer = (fechasel, display) => {
  console.log(fechasel, display);
  setInterval(() => {
    let difsegundos = Math.abs(new Date(fechasel) - Date.now()) / 1000;

    let diast = Math.floor(difsegundos / 86400);
    difsegundos -= diast * 86400;

    // calculate (and subtract) whole horat
    let horast = Math.floor(difsegundos / 3600) % 24;

    difsegundos -= horast * 3600;

    // calculate (and subtract) whole minutost
    let minutost = Math.floor(difsegundos / 60) % 60;
    difsegundos -= minutost * 60;

    // what's left is segundost
    let segundost = Math.floor(difsegundos % 60);

    display.textContent =
      diast +
      "D " +
      añadircero(horast) +
      "H " +
      añadircero(minutost) +
      "M " +
      añadircero(segundost) +
      "S ";
  }, 1000);
};
