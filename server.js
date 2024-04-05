const express = require('express')
const app = express()
// express 라이브러리 사용위한 코드 -> express 문법으로 개발가능 

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://1811022:alsR7uYyWu75BnMi@cluster0.pjsvtly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{     //  MongoClient(url).connect() -> 
  console.log('DB연결성공')
  db = client.db('forum')
    app.listen(8080,()=>{   // 포트번호 입력. 포트는 호스트 내부 프로세스를 구분해주는 것 
        console.log('http://localhost:8080에서 서버 실행 중')
    })  // 사실상 호스트 내부 포트 오픈하는 함수 
}).catch((err)=>{
  console.log(err) // 오류 출력
})

app.get ('/',(요청,응답) => {   // '/'
    응답.sendFile(__dirname + '/index.html') // main page에 보낼 index 파일 경로 설정해줌. __dirname은 현재 프로젝트 절대경로라는 의미
})  // 서버 기능 구현 

app.get ('/news',(요청,응답) => {   // '/news' url로 접속하면, 아래 응답.send()의 내용에 해당하는 정보 출력해줌
    db.collection('post').insertOne({title:'어쩌구'})
    // 응답.send('News')
}) 

app.get ('/shop',(요청,응답) => {   // '/news' url로 접속하면, 아래 응답.send()의 내용에 해당하는 정보 출력해줌
    응답.send('쇼핑페이지')
})  // 함수 내부에 들어가는 함수를 콜백함수라고 한다. 

app.get ('/about',(요청,응답) => {  
    응답.sendFile(__dirname + '/introme.html')
}) 

// 관계형 db => sql문법을 사용해야 함, 정규화 필요, table형태로 저장됨
// 비관계형 db => 정규화(=중복제거) 과정이 없다 따라서 입출력이 빠르다. 
//           => document 형태로 저장한다. 하지만 데이터 수정/삭제는 느리다. 따라서 데이터 입출력이 빨라야하지만 정확성이 조금 떨어져도 상관없는 sns게시판 등은 이런 형태 사용 