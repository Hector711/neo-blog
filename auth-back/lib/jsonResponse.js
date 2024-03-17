// es opcional, es para unificar lo que yo estoy mandando de respuesta desde el servidor a mi frontend
exports.jsonResponse = function (statusCode, body) {
  return {
    statusCode,
    body,
  };
};
