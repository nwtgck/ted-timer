// Toggle full screen
// (from: https://stackoverflow.com/a/10627148/2885946)
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

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

    // Show full screen icon
    $scope.showFullScreenIcon = true;

    // Full screen is Maximize
    $scope.isMaximize = () => {
      const b = (document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen);
      return b;
    };

    // Hide full screen icon
    $timeout(() => {
      $scope.showFullScreenIcon = false;
    }, 1000);

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