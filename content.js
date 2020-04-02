const rouleForm = document.querySelector(".js-rouleForm"),
  rouleForm__input = rouleForm.querySelector("input");

const rouleForm__ul = document.querySelector(".js-roule__ul");

const contents_LS = "contents";

let contents = [];

function deleteContent(event) {
  const btn = event.target;
  const li = btn.parentNode;
  rouleForm__ul.removeChild(li);

  //contents의 요소들을 function(content)에 넣어서 true인지 false인지 판단한다.
  //false이면 제거된다.
  //주어진 함수의 테스트를 통과하는 모든 요소를 담아 새로운 배열을 반환한다.
  //content.id !== parseInt(li.id)가 true이면 배열에 담고 false이면 배열에 담지 않는다.
  const cleanContents = contents.filter(function(content) {
    //toDos 각각의 요소들의 id와 삭제하고자 하는 id를 비교한다.
    //같으면 false를 반환한다.
    return content.id !== parseInt(li.id);
  });

  contents = cleanContents;

  saveContent();
}

//localstorage에 저장
function saveContent() {
  localStorage.setItem(contents_LS, JSON.stringify(contents));
}

function paintRoule(rouleContent) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delbtn = document.createElement("button");
  const newId = contents.length + 1;

  span.innerText = `${newId} : ${rouleContent}`;
  delbtn.innerText = "❌";
  delbtn.addEventListener("click", deleteContent);
  li.appendChild(span);
  li.appendChild(delbtn);
  li.id = newId;
  rouleForm__ul.appendChild(li);

  const contentObj = {
    text: rouleContent,
    id: newId
  };

  contents.push(contentObj);
  saveContent();
}

//규칙 내용 제출
function handleSubmit(event) {
  event.preventDefault();
  const rouleContent = rouleForm__input.value;
  paintRoule(rouleContent);
  rouleForm__input.value = "";
}

//초기화
function init() {
  const loadedContents = localStorage.getItem(contents_LS);
  if (loadedContents != null) {
    const parsedContents = JSON.parse(loadedContents); //배열로 반환한다.

    //배열의 요소들을 전부 실행한다.
    //배열의 요소들은 something 함수의 매개변수(content)로 들어간다.
    //각각의 요소에 paintRoule 함수를 실행한다.
    parsedContents.forEach(function something(content) {
      paintRoule(content.text);
    });
  }
  rouleForm.addEventListener("submit", handleSubmit);
}

init();
