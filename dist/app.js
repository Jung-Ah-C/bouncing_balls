let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballsArray = [];
let lastTime = new Date().getTime();
let currentTime = 0;
// delta time : 바로 전 프레임을 수행하는데 걸린 시간, 유저들 간 발생하는 프레임 처리 속도를 맞추기 위해서 설정함
let dt = 0;
// 공의 개수는 10~20개가 랜덤으로 나오게 설정
let ballsNum = Math.floor(Math.random() * (20 - 10 + 1) + 10);
// 공들의 객체를 생성
for (let i = 0; i < ballsNum; i++) {
    ballsArray[ballsArray.length] = new Ball(randomX(), randomY(), randomRadius());
}
draw();
function draw() {
    currentTime = new Date().getTime();
    dt = (currentTime - lastTime) / 1000; // delta time in seconds
    dt *= 50;
    clearCanvas(); // 공의 위치를 변경하기 전에 이전 프레임을 제거
    moveObjects(); // 공의 위치 변경
    ballCollision(); // 공끼리 충돌되게 함
    drawObjects(); // 공을 여러개 그림
    lastTime = currentTime; // 다음 그림을 그리기 위해서 lastTime을 지금 시간으로 갱신
    window.requestAnimationFrame(draw);
}
function drawObjects() {
    for (let ball in ballsArray) {
        ballsArray[ball].draw();
    }
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function moveObjects() {
    for (let i = 0; i < ballsArray.length; i++) {
        let ball = ballsArray[i];
        // delta time 값을 이용해서 공의 위치를 변경
        ball.x += ball.dx * dt;
        ball.y += ball.dy * dt;
    }
}
function wallCollision(ball) {
    if (ball.x - ball.radius + ball.dx < 0 ||
        ball.x + ball.radius + ball.dx > canvas.width) {
        ball.dx *= -1;
    }
    if (ball.y - ball.radius + ball.dy < 0 ||
        ball.y + ball.radius + ball.dy > canvas.height) {
        ball.dy *= -1;
    }
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
    }
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
    }
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
    }
    if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
    }
}
function ballCollision() {
    for (let i = 0; i < ballsArray.length - 1; i++) {
        for (let j = i + 1; j < ballsArray.length; j++) {
            let ball1 = ballsArray[i];
            let ball2 = ballsArray[j];
            let dist = distance(ball1, ball2);
            if (dist < ball1.radius + ball2.radius) {
                let theta1 = ball1.angle();
                let theta2 = ball2.angle();
                let phi = Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x);
                let m1 = ball1.mass;
                let m2 = ball2.mass;
                let v1 = ball1.speed();
                let v2 = ball2.speed();
                let dx1F = ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
                    2 * m2 * v2 * Math.cos(theta2 - phi)) /
                    (m1 + m2)) *
                    Math.cos(phi) +
                    v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
                let dy1F = ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
                    2 * m2 * v2 * Math.cos(theta2 - phi)) /
                    (m1 + m2)) *
                    Math.sin(phi) +
                    v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
                let dx2F = ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
                    2 * m1 * v1 * Math.cos(theta1 - phi)) /
                    (m1 + m2)) *
                    Math.cos(phi) +
                    v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
                let dy2F = ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
                    2 * m1 * v1 * Math.cos(theta1 - phi)) /
                    (m1 + m2)) *
                    Math.sin(phi) +
                    v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);
                ball1.dx = dx1F;
                ball1.dy = dy1F;
                ball2.dx = dx2F;
                ball2.dy = dy2F;
                staticCollision(ball1, ball2);
            }
        }
        wallCollision(ballsArray[i]);
    }
    if (ballsArray.length > 0)
        wallCollision(ballsArray[ballsArray.length - 1]);
}
// 작은 공이 큰 공과 벽 사이에 막혔을 때 작동하는 메소드
function staticCollision(ball1, ball2, emergency = false) {
    let overlap = ball1.radius + ball2.radius - distance(ball1, ball2);
    let smallerObject = ball1.radius < ball2.radius ? ball1 : ball2;
    let biggerObject = ball1.radius > ball2.radius ? ball1 : ball2;
    if (emergency)
        [smallerObject, biggerObject] = [biggerObject, smallerObject];
    let theta = Math.atan2(biggerObject.y - smallerObject.y, biggerObject.x - smallerObject.x);
    smallerObject.x -= overlap * Math.cos(theta);
    smallerObject.y -= overlap * Math.sin(theta);
    if (distance(ball1, ball2) < ball1.radius + ball2.radius) {
        // we don't want to be stuck in an infinite emergency.
        // so if we have already run one emergency round; just ignore the problem.
        if (!emergency)
            staticCollision(ball1, ball2, true);
    }
}
