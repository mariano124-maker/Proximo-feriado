import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js";
import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js";
import { calcularProximoFeriado } from "https://desarrollo-aplicaciones.vercel.app/2024/code/calcular-proximo-feriado.js";

const DNI = "45468644";

const boton = document.getElementById("btnConsultar");
const secreto = document.getElementById("secreto");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", async () => {
  resultado.textContent = "Validando...";

  const esValido = await validarSecreto(DNI, secreto.value);

  if (!esValido) {
    resultado.textContent = "Palabra secreta incorrecta.";
    return;
  }

  const feriados = await obtenerJson(
    "https://api.argentinadatos.com/v1/feriados/"
  );

  const proximo = calcularProximoFeriado(feriados);

  resultado.innerHTML = `
    <h3>Próximo feriado</h3>
    <p><strong>${proximo.nombre}</strong></p>
    <p>${proximo.fecha}</p>
  `;
});
