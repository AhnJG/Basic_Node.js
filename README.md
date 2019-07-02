# Basic_Node.js


### Git 사용
- 폴더를 git 저장소로 변경 
  - git init

- 저장소 복제 
  - git clone 경로

- 변경 파일 추가
  - git add *
  - git add 파일명

- 변경 파일 확정
  - git commit -m "확정본에 대한 설명"

- 원격 서버에 변경 사항 올리기
  - git push origin master

<a href="https://rogerdudler.github.io/git-guide/index.ko.html">참조</a>

## 1. nodeJS + Express 웹서버 설정
### NPM Project 시작하기
- npm 프로젝트 만들기
  - npm init (해당 폴더로 이동 후)
  
- Express(노드기반 웹서버) 설치
  - npm install express --save
    - --save : 노드 프로젝트가 의존하고 있는 외부 라이브러리 목록이 저장된다.
    - package.json에 저장된다
    - node_moudules 폴더에 관련된 파일들이 설치된다.

### Express 기반 웹서버 구동
- node_modules에 있는 파일에 있는 함수 가져오기
```javascript
var express = require('express')
```

- express 함수 실행
```javascript
var app = express()
```

- 3000번 포트, 서버 시작
```javascript
app.listen(3000, function() { console.log("start! express server on port 3000") });
```

- 파일 실행
  - node 파일명
  - node app.js
- 동기적인 기본 코드들이 먼저 실행되고 callback 함수와 같은 비동기 코드들은 나중에 실행된다.

- 자동으로 파일의 변화를 감지하고 node 서버를 종료했다가 시작 (nodemon)
  - npm install nodemon -g
    - -g : 모든 dir에서 실행가능 하도록 다운로드
  - nodemon 파일명
  - nodemon app.js

### URL Routing 처리
- GET 요청
```javascript
app.get('/', function(req, res) { res.send("Hi Friend") })
// '/' 로 요청이 들어왔을때 (localhost:3000/)
app.get('/main', function(req, res) { res.sendFile(__dirname + "/public/main.html") })
// '/main' 로 요청이 들어왔을때 (localhost:3000/main)
// __dirname : 현재파일의 절대경로
```

### static 디렉토리 설정
- static 파일
  - javascript, css, html, img 
- Express에 static dir 설정
```javascript
app.use(express.static('public'))
```
  - public : 폴더이름
  - static dir 설정을 해주지 않으면 아래와 같은 태그의 링크들을 가져오지 못한다
``` html
<script src="main.js">
<img src="">  
```
  
## 2. Request, Response 처리 기본
### POST 요청처리
- GET 방식
  - url을 통해 정보를 넘겨준다
  - req.param('이름') 을 통해서 받을수 있다
- POST 방식
  - HTTP의 body부분에 정보를 담아 넘겨준다
  - body-parser 패키지가 필요하다!
    - npm install body-parser --save
  - req.body.이름 을 통해서 값을 받을수있다.
- body-parser 사용 선언
```javascript
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // json형태로 오는것을 받는다
app.use(bodyParser.urlencoded({extended:true})) // encoding되어 오는것을 받는다(한글, ...)
```

- Response
  - GET
    - app.get('이름', function(){})
  - POST
    - app.post('이름', function(){})

### View Engine을 활용한 응답처리
- ejs 설치
  - npm install ejs --save
- 사용선언
```javascript
app.set('view engine', 'ejs')
```

- ejs 파일에 데이터 전송
  - html에 데이터가 결합된 형태로 Client에 보내준다
  - res.render('파일명.ejs', {'파라미터 이름' : 값})
  - email.ejs 파일은 반드시 ~/views/ 폴더에 있어야한다
```javascript
res.render('email.ejs', {'email' : req.body.email})
```
<a href="https://github.com/tj/ejs">참조</a>

### JSON 활용한 Ajax 처리
- ajax 사용 예시
```html
<button class="ajaxsend"> ajaxsend </button>
<script> 
  // 버튼을 클릭하면 sendAjax() 함수 실행
  document.querySelector('.ajaxsend').addEventListener('click', function() {
    var inputData = document.forms[0].elements[0].value; // 현재 문서의 첫번째 form의 첫번째 element의 값
    sendAjax('http://localhost:3000/ajax_send_email', inputData)
  })
  
  function sendAjax(url, data)
  {
    var data = {'email': data};
    data = JSON.stringify(data); // json data 객체를 문자열로 변환
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
  
    xhr.addEventListener('load', function(){
      var result = JSON.parse(xhr.responseText);
      if(result.result !== "ok") return;
      document.querySelector(".result").innerHTML = result.email;
    });
  }
</script>
```
- 입력값 검증 응답
``` javascript
app.post('/ajax_send_email', function(req, res) {
  console.log(req.body.email)
  
  //check  validation about input value ==> select(insert) db
  var responseData = {'result': 'ok', 'email': req.body.email}
  res.json(responseData)
});
  
```
