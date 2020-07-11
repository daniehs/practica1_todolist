let color = "";
let indice = 1;
let interval = [];

const click_handler = (e) => {
  let itarea = document.querySelector(".input_tarea");
  let contenedor_tarea = document.querySelector("#tareas");
  let fingresada = document.querySelector(".fecha_hora");

  switch (e.target.classList.value) {
    case "prioridad_max":
      color = "rojo";
      // contenedor_tarea.classList.value = "";
      // contenedor_tarea.classList.add("prioridad_max");
      e.preventDefault();

      break;

    case "prioridad_med":
      color = "amarillo";
      // contenedor_tarea.classList.value = "";
      // contenedor_tarea.classList.add("prioridad_med");
      e.preventDefault();

      break;

    case "prioridad_min":
      color = "verde";
      // contenedor_tarea.classList.value = "";
      // contenedor_tarea.classList.add("prioridad_min");
      e.preventDefault();

      break;

    case "agregar_tarea": {
      e.preventDefault();

      let fecha = new Date(fingresada.value) > Date.now();
      if (itarea.value && fingresada.value && color && fecha) {
        document.querySelector("p")
          ? contenedor_tarea.removeChild(document.querySelector("p"))
          : "";
        //Creamos un div que sera la tarjeta de la tarea
        console.log(indice);
        let divtarea = document.createElement("DIV");
        //Este es el numero de tarjetas 0,1,2....childelementcount
        let ntareas = contenedor_tarea.childElementCount;

        ntareas > 0 ? indice++ : indice > 1 ? indice++ : indice;

        //Colocamos una clase para colocar a cada tarjeta de trabajo que se agregue "tarea-0, tarea-1,..."
        divtarea.classList.add(`tarea-${indice}`, color);
        let litarea = document.createElement("LI");
        litarea.textContent = itarea.value;

        let temp = document.createElement("SPAN");
        temp.classList.add(`temporizador-${indice}`);
        let spanb = document.createElement("SPAN");
        let icon = document.createElement("I");
        icon.classList.add("fas");
        icon.classList.add("fa-backspace");

        spanb.appendChild(icon);

        contenedor_tarea.appendChild(divtarea);
        //aqui agrego la clase que debo tomar en cuenta
        let tarea = document.querySelector(`.tarea-${indice}`);
        tarea.appendChild(litarea);
        tarea.appendChild(temp);
        tarea.appendChild(spanb);

        let temporizador = document.querySelector(`.temporizador-${indice}`);

        timer(fingresada.value, temporizador, indice);

        itarea.value = "";
        fingresada.value = "";
        color = "";
      } else {
        let error = document.createElement("P");
        let merror;
        if (!color) merror = "Elija un color de prioridad para la tarea";
        if (!fingresada.value) merror = "Debe ingresar una fecha";
        if (!itarea.value) merror = "Nombre de tarea es obligatorio";
        if (!fecha) merror = "Debe elegir una fecha mayor a la actual ";

        error.textContent = merror;
        console.log(error);
        console.log(merror);
        !contenedor_tarea.hasChildNodes()
          ? contenedor_tarea.appendChild(error)
          : !document.querySelector("P")
          ? contenedor_tarea.prepend(error)
          : (document.querySelector("P").textContent = merror);
      }

      break;
    }
    default:
      break;
  }
};

document.querySelector(".wrapper").addEventListener("click", click_handler);

anadircero = (hora) => (hora < 10 ? "0" + hora : hora);

const eliminar = (e) => {
  // console.log(e.target.parentElement.parentElement);
  if (e.target.classList.contains("fa-backspace")) {
    document
      .querySelector("#tareas")
      .removeChild(e.target.parentElement.parentElement);
    console.log(e.target.parentElement.classList.value.substring(13));
    clearInterval(
      interval[
        Number(e.target.parentElement.parentElement.classList[0].substring(6))
      ]
    );
  }
};
document.querySelector("#tareas").addEventListener("click", eliminar);

const timer = (fechasel, display, indice) => {
  interval[indice] = setTimeout(function start() {
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
    segundost = Math.floor(difsegundos % 60);

    display.textContent =
      diast +
      "D " +
      anadircero(horast) +
      "H " +
      anadircero(minutost) +
      "M " +
      anadircero(segundost) +
      "S ";

    interval[indice] = setTimeout(start, 1000); // (*)
    console.log(difsegundos);
    if (Math.floor(difsegundos) < 1 && !diast && !minutost && !horast) {
      document
        .querySelector("#tareas")
        .removeChild(document.querySelector(`.tarea-${indice}`));
      clearInterval(interval[indice]);
    }
  }, 1000);
};
