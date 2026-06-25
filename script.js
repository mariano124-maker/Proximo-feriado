import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js";
import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js";
import { calcularProximoFeriado } from "https://desarrollo-aplicaciones.vercel.app/2024/code/calcular-proximo-feriado.js";

const DNI = "45468644"; // Reemplazá por tu DNI si corresponde

const boton = document.getElementById("btnConsultar");
const secreto = document.getElementById("secreto");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", async () => {
  const palabraSecreta = secreto.value.trim();

  resultado.innerText = "Validando...";

  const esValida = await validarSecreto(DNI, palabraSecreta);

  if (!esValida) {
    resultado.innerText = "Palabra secreta incorrecta.";
    return;
  }

  const feriados = await obtenerJson(
    "https://api.argentinadatos.com/v1/feriados/"
  );

  const proximo = calcularProximoFeriado(feriados);

  resultado.innerText =
    `Próximo feriado: ${proximo.fecha}\n${proximo.nombre}`;
});
