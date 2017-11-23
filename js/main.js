angular.module('tedTimer', [])
  .controller('timerCtrl', ['$scope', '$timeout', ($scope, $timeout) => {
    // Countdown is going on or not
    $scope.isCounting    = false;
    // Show input form or not
    $scope.showInputForm = true;
    // Input [min]
    $scope.inputMinute    = 15;

    // For display
    $scope.minuteDisplay  = 0;
    $scope.secondDisplay  = 0;

    // Time has passed
    $scope.hasPassed      = false;

    $scope.zeroPad = (a, n)=>{
      return ("0"+a).slice(-n);
    }

    // Start countdown
    $scope.startCount = () => {
      $scope.isCounting    = true;
      $scope.showInputForm = false;

        // Convert input[min] to secounds
        const timeLimitSecond = $scope.inputMinute * 60;
  
        // Get start time
        const startTime = new Date();
  
        console.log("Start Time:", startTime);
  
        (function decTime(){
          if($scope.isCounting){
  
            // Passed [sec]
            const passedSecound = Math.floor((new Date() - startTime)/1000);
            // Rest time [sec]
            const fullSecond    = timeLimitSecond - passedSecound;

            // Set whether time has passed or not
            $scope.hasPassed     = fullSecond < 0
  
            if(fullSecond >= 0){ // in time
              $scope.minuteDisplay = Math.floor(fullSecond/60);
              $scope.secondDisplay = fullSecond%60;
            } else {            // over time
              $scope.minuteDisplay = Math.floor(-fullSecond/60);
              $scope.secondDisplay = -fullSecond%60;
            }

            // Call decTime() again
            $timeout(() => {
              $scope.$apply(decTime);
            }, 200);

          }
        })();
    };

    // Reset countdown
    $scope.resetCount = () => {
      $scope.isCounting     = false;
      $scope.minuteDisplay  = 0;
      $scope.secondDisplay  = 0;
      $scope.hasPassed      = false;
    };

  }]);