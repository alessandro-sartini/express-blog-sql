
// todo errore in caso di funzione errata!
function errorHandlare(err, req, res, naxt) {

    res.status(500);
    res.json({

        message: err.message,

    })


}

module.exports = errorHandlare;