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

## nodeJS + Express 웹서버 설정
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
  - var express = require('express')
- express 함수 실행
  - var app = express()
- 3000번 포트, 서버 시작
  - app.listen(3000, function() { console.log("start! express server on port 3000") });
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
  - app.get('/', function(req, res) { res.send("<h1> Hi Friend </H1>") })
    - '/' 로 요청이 들어왔을때 (localhost:3000/)
  - app.get('/main', function(req, res) { res.sendFile(__dirname + "/public/main.html") })
    - '/main' 로 요청이 들어왔을때 (localhost:3000/main)
    - __dirname : 현재파일의 절대경로

### static 디렉토리 설정
- static 파일
  - javascript, css, html, img 
- Express에 static dir 설정
  - app.use(express.static('public'))
     - public : 폴더이름
- static dir 설정을 해주지 않으면 아래와 같은 태그의 링크들을 가져오지 못한다
  - <script src="main.js">
  - <img src="images/crong.jpg">
