$(function(){

  var minute_input   = $("#minute_input");
  var start_button   = $("#start_button");
  var reset_button   = $("#reset_button");
  var minute_display = $("#minute_display");
  var second_display = $("#second_display");
  var min_sec_wrap   = $("#min_sec_wrap");
  var input_area     = $("#input_area");

  // スタートしたかどうか
  var isCounting = false;

  min_sec_wrap.on('click', function(){
      // 入力する欄やボタンを再表示したり隠したり（トグル）
    input_area.toggle();
  });

  // スタートボタンイベント
  start_button.on('click', function(){
    if(!isCounting){
      isCounting = true;
      start_button.prop('disabled', true);
      reset_button.prop('disabled', false);

      // 入力する欄やボタンを隠す
      input_area.hide();

      // 入力された分を取得
      timeLimitMinute     = parseInt(minute_input.val());
      // 入力された分の秒にする（時間は秒で管理する）
      timeLimitSecond = timeLimitMinute * 60;

      // スタートした時間
      var startTime = new Date();

      console.log("開始時刻", startTime);

      function decTime(){
        if(isCounting){

          // 経過秒数
          var passedSecound = Math.floor((new Date() - startTime)/1000);
          // 経過秒数とタイムリミットから表示すべき秒数を計算
          var fullSecond    = timeLimitSecond - passedSecound;

          if(fullSecond >= 0){ // 経過時間内のとき
            var sec = Math.floor(fullSecond/60);
            var min = fullSecond%60;
          } else {            // 経過時間を超えたとき
            min_sec_wrap.css('color', 'red');
            var sec = Math.floor(-fullSecond/60);
            var min = -fullSecond%60;
          }
          minute_display.text(zeroPad(sec, 2));
          second_display.text(zeroPad(min, 2));
          setTimeout(decTime, 200);
        }
      }

      decTime();
    }
  });

  // リセットボタンイベント
  reset_button.on('click', function(){
    if(isCounting){
      isCounting = false;
      start_button.prop('disabled', false);
      reset_button.prop('disabled', true);
      minute_display.text(zeroPad(0, 2));
      second_display.text(zeroPad(0, 2));
      min_sec_wrap.css('color', 'white')
    }
  });


  // ゼロ埋め
  function zeroPad(a, n){
    return ("0"+a).slice(-n);
  }

});
