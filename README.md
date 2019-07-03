# Basic_Node.js


### Git 사용
- 폴더를 git 저장소로 변경 
  - git init

- 저장소 복제 
  - git clone 경로

- 변경 파일 추가
  - git add *
  - git add 파일명
- 로컬저장소를 origin 원격저장소의 master 브랜치로 연결하여 push한다.
  - 처음에 한번만 -u 설정을 하면 앞으로 git push 만 입력해도 origin의 master 브랜치로 push한다.
  - git push -u origin master
- 변경 파일 확정
  - git commit -m "확정본에 대한 설명"

- 원격 서버에 변경 사항 올리기
  - git push origin master

<a href="https://rogerdudler.github.io/git-guide/index.ko.html">참조_git-간편 안내서</a><br>
<a href="https://wayhome25.github.io/git/2017/04/09/git-06-remote-repository/">참조_생활코딩_github clone, remote, pull</a>

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

## 3. Database 연동 기본
### mysql 5.7
- 설치
  - sudo apt install mysql-server-5.7
- 접속
  - mysql -u root -p
- 데이터 베이스 만들기
  - create database db이름;
- 데이터 베이스 확인
  - show databases;
- 데이터 베이스 사용
  - use db이름;
- 테이블 만들기
  - create table user(
      name varchar(20) not null,
      id varchar(20) not null,
      pw varchar(20) not null);
- 테이블에 컬럼 추가
  - alter table [테이블명] add [컬럼] [타입] [옵션]
  - alter table user add num int not null primary key auto_increment;
- 테이블 목록 조회
  - show tables;
- 테이블 정보 조회
  - desc table이름;
  - desc user;
- 데이터 삽입
  - insert into table이름(컬럼) values(값);
  - insert into user(name, id, pw) values('ahn', 'arki13', 'password');
- 데이터 조회
  - select 컬럼 from 테이블
  - select * from user;
  
### MySQL 연동 설정
- mysql 모듈 설치
  - npm install mysql --save
  
- db 접속 (연결)하기
``` javascript
var mysql = require('mysql')

var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'asdf1234',
  database : 'testnode'
})

connection.connect()
```
<a href="https://expressjs.com/ko/guide/database-integration.html#mysql">Express mysql 연동 문서</a>

### MySQL 연동 구현
- 쿼리 실행 (server)
```javascript
app.post('/ajax_send_email', function(req, res){
  var email = req.body.email;
  var responseData = {}; // json 형태로 초기화
  
  var query = connection.query('select name from user where email="' + email + '"', function(err, rows) {
    if(err) throw err;
    
    if(rows[0]) 
    {
      responseData.result = "ok";
      responseData.name = rows[0].name;
    }
    else
    {
      responseData.result = "none";
      responseData.name = "";
    }
    res.json(responseData)
  })
});
```
- 쿼리 실행(Client)
```javascript
xhr.addEventListener('load', function() {
  var result = JSON.parse(xhr.responseText);
  var resultDiv = document.querySelector('.result');
  
  if(result.result !== "ok") resultDiv.innerHTML = "your email is not found"
  else resultDiv.innerHTML = result.name;
});

```





