'use strict';

{
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
  ];
  let word = words[Math.floor(Math.random() * words.length)];
  let loc ;
  let score ;
  let miss ;
  const timeLimit = 3 * 1000;
  let startTime; //ゲーム時刻を保持するための変数
  let isPlaying = false; // animation(ゲーム)が実行されていない

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score') //htmlのscore要素を取得
  const missLabel = document.getElementById('miss') //htmlのmiss要素を取得
  const timerLabel = document.getElementById('timer') //htmlのmiss要素を取得


  function updateTarget(){
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring
(loc); // placeholder + loc番目以降のwordの文字列を出力
  }

  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now(); //ゲームが始まった時刻 + 残り時間 - 現在の時間
    timerLabel.textContent = (timeLeft /1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft < 0) {
      isPlaying = false; // animation(ゲーム)が実行されていない
      clearTimeout(timeoutId); //setTimeoutをクリアするメソッド
      timerLabel.textContent = '0.00';
      setTimeout(() => { //alert処理を100msec後に遅らせる timeアウトしてから、アラート処理をさせる
        showResult();
      }, 100);

      target.textContent = 'click to replay';
    }
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;  //どれだけ正確に打てたか (条件演算子を使用)
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy`)
  }

  window.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now(); //クリックのタイミングで現在時刻をstarttimeに代入
    updateTimer(); //残り時間を表示したい
  })


  window.addEventListener('keydown', e => {
    if (isPlaying !== true) {
      return;
    }
    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) { //文字数が一致したら、、(タイピングし終わったら)
        word = words[Math.floor(Math.random() * words.length)]; //wordにランダムのwordsをセット
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}