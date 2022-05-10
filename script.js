const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("./audio/typing-sound.mp3");
const correctSound = new Audio("./audio/correct.mp3");
const wrongSound = new Audio("./audio/wrong.mp3");

/* inputテキスト入力。あっているかどうかの判定。 */
typeInput.addEventListener("input", () => {

  typeSound.play();
  typeSound.currentTime = 0;

  const sentenceArray = typeDisplay.querySelectorAll("span");
  // console.log(sentenceArray);
  const arrayValue = typeInput.value.split("");
  // console.log(arrayValue);
  // フラグ
  let correct = true;
  // 入力とtypeを比較する
  sentenceArray.forEach((characterSpan, index) => {
    if (arrayValue[index] == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    }
    else if (characterSpan.innerText == arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      wrongSound.volume = 0.3;
      wrongSound.play();
      wrongSound.currentTime = 0;
      correct = false;
    }
  });

  if (correct == true) {
    correctSound.play();
    correctSound.currentTime = 0;
    RenderNextSentence();
  }
});




// 非同期でランダムな文章を取得して、表示する
function GetRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

// async await　は非同期処理をするときは必須 非同期通信が最後まで終わる(promice状態が終わる)まで待ってくれる

async function RenderNextSentence() {
  const sentence = await GetRandomSentence();
  console.log(sentence);

  // typeDisplay.innerText = sentence;
  // 文章を一文字ずつ分解して、spanタグを生成する
  let oneText = sentence.split("");
  // console.log(oneText);
  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    // console.log(characterSpan);
    typeDisplay.appendChild(characterSpan);
    // characterSpan.classList.add("correct");

  });

  /* テキストボックスの中身を消す */
  // innerTextはタグの中のテキスト
  // typeInput.innerText = "";
  typeInput.value = "";

  StartTimer();
}

let startTime;
let originTIme = 30;
function StartTimer() {
  timer.innerText = originTIme;
  startTime = new Date();
  // console.log(startTime);
  // 1000mm秒=1秒
  // setInterval(関数,処理間隔)
  setInterval(() => {
    timer.innerText = originTIme - getTimerTime();
    if (timer.innerText <= 0) Timeup();
  }, 1000);
}

// Math.floorは小数点を切り捨てる
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function Timeup() {
  RenderNextSentence();
}

RenderNextSentence();
