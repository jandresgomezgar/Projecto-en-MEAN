angular.module('appActividades', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('alta', {
                url: '/alta',
                templateUrl: 'views/alta.html',
                controller: 'ctrlAlta'
            })
            .state('editar', {
                url: '/editar',
                templateUrl: 'views/editar.html',
                controller: 'ctrlEditar'
            });

        $urlRouterProvider.otherwise('alta');
    })
    .factory('comun', function($http) {
        var comun = {};

        comun.actividades = [];

        comun.actividad = {};

        /***Sección de métodos remotos***/
        comun.getAll = function(){
            return $http.get('/actividades')
            .success(function(data){
                angular.copy(data, comun.actividades)

                return comun.actividades
            })
        }

        comun.add = function(actividad){
            return $http.post('/actividad', actividad)
            .success(function(actividad){
                comun.actividades.push(actividad);
            })
        }

        comun.update = function(actividad){
            return $http.put('/actividad/' + actividad._id, actividad)
            .success(function(data){
                var indice = comun.actividades.indexOf(actividad);
                comun.actividades[indice] = data;
            })
        }

        comun.delete = function(actividad){
            return $http.delete('/actividad/' + actividad._id)
            .success(function(){
                var indice = comun.actividades.indexOf(actividad);
                comun.actividades.splice(indice, 1);
            })
        }

        return comun;
    })
    .controller('ctrlAlta', function($scope, $state, comun) {
        $scope.actividad = {}
            // $scope.actividades = [];

        comun.getAll();

        $scope.actividades = comun.actividades;

        $scope.prioridades = ['Baja', 'Normal', 'Alta'];

        $scope.agregar = function() {
            comun.add({
                nombre: $scope.actividad.nombre,
                prioridad: parseInt($scope.actividad.prioridad)
            })

            $scope.actividad.nombre = '';
            $scope.actividad.prioridad = '';
        }

        $scope.masPrioridad = function(actividad) {
            actividad.prioridad += 1;
        }

        $scope.menosPrioridad = function(actividad) {
            actividad.prioridad -= 1;
        }

        $scope.eliminar = function(actividad) {
            comun.delete(actividad);
        }

        $scope.procesaObjeto = function(actividad) {
            comun.actividad = actividad;
            $state.go('editar');
        }

    })
    .controller('ctrlEditar', function($scope, $state, comun) {
        $scope.actividad = comun.actividad;
        
        $scope.actualizar = function() {
            comun.update($scope.actividad);
            $state.go('alta');
        }

        $scope.eliminar = function(){
            comun.delete($scope.actividad);
            $state.go('alta');
        }
    })
