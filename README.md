# 🏀 Bouncing Balls 
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white" /> <img src="https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/typescript-3178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />

## 완성본 (타입스크립트로 마이그레이션 완료)
https://jung-ah-c.github.io/bouncing_balls/index.html

## 구현 방법
- typescript로 한번에 작성하기에는 아직 미흡한 부분이 많아서, 익숙한 javascript로 전체적인 코드를 작성하고 typescript로 마이그레이션 작업을 진행했습니다.
- 참고로 index.html 파일에 포함시키기 위해서 tsc 기능을 사용해서 javascript 파일로 컴파일 했습니다.

## 구현하는 과정에서 어려웠던 점
- 공과 공끼리 부딪혔을 때의 로직을 어떻게 구현할지 고민을 많이 했습니다. 그리고 전체적으로 수학적인 개념(?)이 들어가서 한번에 이해하고 구현하기 어려웠습니다.
- index.html 에서 script 파일을 넣을 때, 빌드 하면서 경로가 바뀌게 된 점을 뒤늦게 발견해서 여러번 수정을 거쳤습니다.

## 새롭게 배운 점
- html canvas 태그를 바탕으로 interactive한 웹을 구현할 수 있다는 것을 알게 되었습니다. 이 작은 프로젝트를 바탕으로 앞으로도 새로운 기능도 구현해 볼 생각입니다.
