import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js";
import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js";
import { calcularProximoFeriado } from "https://desarrollo-aplicaciones.vercel.app/2024/code/calcular-proximo-feriado.js";

const DNI = "45468644";

const secreto = document.getElementById("secreto");
const resultado = document.getElementById("resultado");

let esperandoReinicio = false;

async function consultar() {
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
`Proximo feriado: ${proximo.fecha}
 ${proximo.nombre}

Presiona ENTER para volver a ingresar`;

  esperandoReinicio = true;
}

secreto.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    if (esperandoReinicio) {
      secreto.value = "";
      resultado.innerText = "";
      esperandoReinicio = false;
      secreto.focus();
      return;
    }

    await consultar();
  }
});
