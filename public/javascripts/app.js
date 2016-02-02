angular.module('appActividades', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('alta', {
                    url: '/alta',
                    templateUrl: 'views/alta.html',
                    controller: 'ctrlAlta'
                })
                .state('editar', {
                    url: '/editar/',
                    templateUrl: 'views/editar.html',
                    controller: 'ctrlEditar'
                });

            $urlRouterProvider.otherwise('alta');
        }
    )

    .factory('comun', function(){
        comun = {}
        comun.actividades = [{
            actividad: '7',
            prioridad: '2'
        }, {
            actividad: 'calixe',
            prioridad: '1'
        }, {
            actividad: 'programacion',
            prioridad: '0'
        }]
        comun.actividad = {};

         comun.eliminar = function(actividad){
            var indice = comun.actividades.indexOf(actividad);
           comun.actividades.splice(indice ,1);


        }

        return comun;
    })

    .controller('ctrlAlta', function($scope, comun) {
        $scope.actividad = {}
     //   $scope.actividades = [];

      $scope.actividades = comun.actividades;
        $scope.prioridades = ['Baja', 'Normal', 'Alta'];

        $scope.agregar = function() {
            $scope.actividades.push({
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
            comun.eliminar(actividad);
        }

        $scope.procesaObjeto = function(actividad){
            comun.actividad = actividad;
            $state.go('editar');
        }

    })


    .controller('ctrlEditar', function($scope, $state, comun) {
        $scope.actividad = comun.actividad;

        $scope.actualizar = function() {
            var indice = comun.actividades.indexOf(comun.actividad);
            comun.actividades[indice] = $scope.actividad;
            $state.go('alta');
        }

        $scope.eliminar = function(){
            comun.eliminar($scope.actividad);
            $state.go('alta');
        }
    })



