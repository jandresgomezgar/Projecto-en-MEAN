var mongoose = require('mongoose');

var ActividadesSchema = new mongoose.Schema({
	nombre: String,
	prioridad: Number
});

mongoose.model('Actividades', ActividadesSchema);