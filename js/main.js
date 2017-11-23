angular.module('tedTimer', [])
  .controller('timerCtrl', ['$scope', '$timeout', ($scope, $timeout) => {
    // Countdown is going on or not
    $scope.isCounting    = false;
    // Show input form or not
    $scope.showInputForm = true;
    // Input (min)
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

        // 入力された分を取得
        const timeLimitMinute = $scope.inputMinute;
        // 入力された分の秒にする（時間は秒で管理する）
        const timeLimitSecond = timeLimitMinute * 60;
  
        // スタートした時間
        const startTime = new Date();
  
        console.log("開始時刻", startTime);
  
        (function decTime(){
          if($scope.isCounting){
  
            // 経過秒数
            const passedSecound = Math.floor((new Date() - startTime)/1000);
            // 経過秒数とタイムリミットから表示すべき秒数を計算
            const fullSecond    = timeLimitSecond - passedSecound;

            // Time has passed or not
            $scope.hasPassed     = fullSecond < 0
  
            if(fullSecond >= 0){ // 経過時間内のとき
              var sec = Math.floor(fullSecond/60);
              var min = fullSecond%60;
            } else {            // 経過時間を超えたとき
              // min_sec_wrap.css('color', 'red');
              var sec = Math.floor(-fullSecond/60);
              var min = -fullSecond%60;
            }

            $scope.minuteDisplay = sec; // TODO name is strange
            $scope.secondDisplay = min; // TODO name is strange

            // minute_display.text(zeroPad(sec, 2));
            // second_display.text(zeroPad(min, 2));
            $timeout(() => {
              $scope.$apply(decTime);
            }, 200);
          }
        })();
    };

    $scope.resetCount = () => {
      $scope.isCounting     = false;
      $scope.minuteDisplay  = 0;
      $scope.secondDisplay  = 0;
      $scope.hasPassed      = false;
    };

  }]);