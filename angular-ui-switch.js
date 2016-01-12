 (function() {
 
     angular.module('uiSwitch', [])
         .directive('switch', switchDirective);
 
     function switchDirective() {
 
         return {
             require: 'ngModel',
              restrict: 'AE',
              replace: true,
              transclude: true,
              scope: {
                 isDisabled: '@',
                 ngModel: '=',
                ngChange: '&'
             },
             controller: controller,
             template: template,
             link: link
         };
 
         function template (element, attrs) {
 
             var html = '';
             html += '<span';
             html +=   ' class="switch' + (attrs.class ? ' ' + attrs.class : '');
             html +=   attrs.size ? ' size-' + attrs.size : '';  /*switch size from small to large*/
             html +=   '"';             
             html += '>';
             html += '<small></small>';             
             html += '<input type="checkbox"';
             html += attrs.id ? ' id="' + attrs.id + '"' : '';
             html += attrs.name ? ' name="' + attrs.name + '"' : '';
             html += attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
             html += ' style="display:none" />';
             html += '<span class="switch-text">'; //adding new container for switch text
             html += attrs.on ? '<span class="on">' + attrs.on + '</span>' : ''; //switch text on value set by user in directive html markup
             html += attrs.off ? '<span class="off">' + attrs.off + '</span>' : ' ';  //switch text off value set by user in directive html markup
             html += '</span>';
 
             return html;
 
         }
 
         function link($scope, element, attrs) {
             //apply initial style
             $scope.setElementStyle(element);
             //add click event when not disabled
             if (!angular.isDefined(attrs.isDisabled) || attrs.isDisabled == 'false') {

                element.bind('click', function () {
                     $scope.$apply(function () {
                         $scope.ngModel = !$scope.ngModel; //toggle
                        if ($scope.ngChange) {
                            $scope.ngChange();
                        }
                     });
                 });
                 //add watch
                 $scope.$watch(
                     function () {
                         return $scope.ngModel;
                     },
                     function (newValue, oldValue) {
                         if (newValue != oldValue) {
                             $scope.updateSwitch(element);
                         }
                     }
                 );
             }
         }
 
     }
 
     controller.$inject = ['$scope'];
 
     function controller($scope) {
 
         $scope.updateSwitch = function (element) {
             //set style
             $scope.setElementStyle(element);
         };
 
         $scope.setElementStyle = function (element) {
             if ($scope.ngModel) {
                 element.addClass('checked');
             } else {
                 element.removeClass('checked');
             }
         };
     }
 
 
 })();