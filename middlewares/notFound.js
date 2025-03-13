function notFound(req, res, next) {

  res.status(404)

  res.json({
    error: "not found",
    message: "Pagina inesistente / non trovata"
  });
    
    
}

module.exports = notFound;
