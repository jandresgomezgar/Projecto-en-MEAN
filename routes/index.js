var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Actividades = mongoose.model('Actividades');

//GET - Listar actividades
router.get('/actividades', function(req, res, next){
    Actividades.find(function(err, actividades){
        if(err){return next(err)}

        res.json(actividades)
    })
})

//POST - Agregar actividad
router.post('/actividad', function(req, res, next){
    var actividad = new Actividades(req.body);

    actividad.save(function(err, actividad){
         if(err){return next(err)}
            res.json(actividad);
    })
})

//PUT - Actualizar actividad
router.put('/actividad/:id', function(req, res){
    Actividades.findById(req.params.id, function(err, actividad){
        actividad.nombre = req.body.nombre;
        actividad.prioridad = req.body.prioridad;

        actividad.save(function(err){
            if(err){res.send(err)}
            
            res.json(actividad);
        })
    })
})

//DELETE - Eliminar actividad
router.delete('/actividad/:id', function(req, res){
    Actividades.findByIdAndRemove(req.params.id, function(err){
        if(err){res.send(err)}
            res.json({message: 'La actividad se ha eliminado'});
    })
})

module.exports = router;