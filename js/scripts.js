let global='';
const click_handler = (e) => {
  let itarea = document.querySelector(".input_tarea");
  let contenedor_tarea = document.querySelector("#tareas");
  let fingresada = document.querySelector(".fecha_hora");

  switch (e.target.classList.value) {
    case "prioridad_max":
      global='mariana';
      console.log(global);
      contenedor_tarea.classList.value = "";
      contenedor_tarea.classList.add("prioridad_max");
      e.preventDefault();

      break;

    case "prioridad_med":
      global='wendy';
      console.log(global);

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

    
        //Creamos un div que sera la tarjeta de la tarea
        let divtarea = document.createElement("DIV");
        //Este es el numero de tarjetas 0,1,2....childelementcount
        let ntareas=document.getElementById("tareas").childElementCount;
         (ntareas>0)?
         ntareas=document.getElementById("tareas").lastElementChild.classList[0].substring(6)*1+1:
         ntareas=1;
        //Colocamos una clase para colocar a cada tarjeta de trabajo que se agregue "tarea-0, tarea-1,..."
        divtarea.classList.add(
          `tarea-${ntareas}`,
          contenedor_tarea.classList.value
        );
        let litarea = document.createElement("LI");
        litarea.textContent = itarea.value;

        let temp = document.createElement("SPAN");
        temp.classList.add(`temporizador-${ntareas}`);
        let spanb = document.createElement("SPAN");
        let icon = document.createElement("I");
        icon.classList.add("fas");
        icon.classList.add("fa-backspace");

        spanb.appendChild(icon);

        contenedor_tarea.appendChild(divtarea);
        //aqui agrego la clase que debo tomar en cuenta
        let tarea = document.querySelector(`.tarea-${ntareas}`);
        tarea.appendChild(litarea);
        tarea.appendChild(temp);
        tarea.appendChild(spanb);

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

anadircero = (hora) => (hora < 10 ? "0" + hora : hora);

indice=(lastchild)=>{

// let i = lastchild.
}
const eliminar = (e) => {
  // console.log(e.target.parentElement.parentElement);
  console.log(global);
  if (e.target.classList.contains('fa-backspace')) {
    console.log('entro');
    document
      .querySelector("#tareas")
      .removeChild(e.target.parentElement.parentElement);
     clearInterval(timer);
  }
};
document.querySelector("#tareas").addEventListener("click", eliminar);

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
      anadircero(horast) +
      "H " +
      anadircero(minutost) +
      "M " +
      anadircero(segundost) +
      "S ";
  }, 1000);
};
