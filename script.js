const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");

/* inputテキスト入力。あっているかどうかの判定。 */
typeInput.addEventListener("input", () => {
  const sentenceArray = typeDisplay.querySelectorAll("span");
  // console.log(sentenceArray);
  const arrayValue = typeInput.value.split("");
  // console.log(arrayValue);

  // 入力とtypeを比較する
  sentenceArray.forEach((characterSpan, index) => {
    if (characterSpan.innerText == arrayValue[index]) {

    }
  });

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
    characterSpan.classList.add("correct");

  });

  /* テキストボックスの中身を消す */
  typeInput.innerText = "";
}

RenderNextSentence();
