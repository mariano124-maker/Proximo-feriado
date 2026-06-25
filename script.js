importar { Terminal } desde "@es-js/terminal"
importar { obtenerJson } desde "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js"
importar { validarSecreto } desde "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js"
importar { calcularProximoFeriado } desde "https://desarrollo-aplicaciones.vercel.app/2024/code/calcular-proximo-feriado.js"

asincrono funcion inicio() {
  Terminal.escribir("¡Hola! Ingresa la palabra secreta:")

  var secreto = esperar Terminal.leer()

  var dni = "45468644"

  si (esperar validarSecreto(dni, secreto)) {
    esperar mostrarProximoFeriado()
  } sino {
    Terminal.escribir("Palabra secreta inválida")
  }

  Terminal.escribir("")
  Terminal.escribir("Presiona ENTER para volver a ingresar")

  esperar Terminal.leerEnter()
  Terminal.limpiar()

  inicio()
}

asincrono funcion mostrarProximoFeriado() {
  const feriados = esperar obtenerJson("https://api.argentinadatos.com/v1/feriados/")

  const proximoFeriado = calcularProximoFeriado(feriados)

  Terminal.escribir("Próximo feriado: " + proximoFeriado.fecha)
  Terminal.escribir(proximoFeriado.nombre)
}

inicio()
