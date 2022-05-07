const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");

function GetRandomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

// ランダムな文章を取得して、表示する
// async await　は非同期処理をするときは必須 非同期通信が最後まで終わる(promice状態が終わる)まで待ってくれる

async function RenderNextSentence() {
  const sentence = await GetRandomSentence();
  console.log(sentence);

  typeDisplay.innerText = sentence;
}

RenderNextSentence();
