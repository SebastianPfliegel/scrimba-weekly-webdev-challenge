const ball = document.getElementById('ball');
const innerBall = document.getElementById('innerBall');
const eight = document.getElementById('8');
const triangle = document.getElementById('triangle');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const form = document.getElementById('form-ask');
const btn = document.getElementById('ask');
const clue = document.getElementById('clue');

let currentX;
let currentY;
let prevX;
let prevY;
let initialX;
let initialY;
let distance = 0;
const answers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes – definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don’t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
];

question.addEventListener('input', inputChange);
//btn.addEventListener('click', askQuestion);
form.addEventListener('submit', askQuestion);

function inputChange() {
    btn.disabled = this.value === '';
}

function askQuestion(e) {
    e.preventDefault();
    question.disabled = true;
    btn.disabled = true;
    clue.innerText = 'Shake the ball to reveal the answer!';
    ball.style.cursor = 'move';
    innerBall.classList.remove('ball-inner-answer');
    eight.style.display = 'block';
    triangle.style.display = 'none';

    ball.addEventListener('touchstart', beginDrag);
    ball.addEventListener('mousedown', beginDrag);
}

function beginDrag(e) {
    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    } else {
        initialX = e.clientX;
        initialY = e.clientY;
    }

    prevX = initialX;
    prevY = initialY;
        
    ball.addEventListener('touchmove', drag);
    ball.addEventListener('mousemove', drag);
    ball.addEventListener('touchend', endDrag);
    ball.addEventListener('mouseup', endDrag);
}

function drag(e) {
    e.preventDefault();

    if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
    } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
    }

    distance += Math.sqrt(Math.pow(currentX - prevX, 2) + Math.pow(currentY - prevY, 2));

    if ((distance > 0) && (distance < 3000)) {
        clue.innerText = 'Shake a little more to get your answer!';
    } else {
        clue.innerText = 'Type in your question and press Ask.';
        question.disabled = false;
        question.value = '';
        answer.innerText = randomAnswer();
        ball.style.cursor = 'not-allowed';
        innerBall.classList.add('ball-inner-answer');
        eight.style.display = 'none';
        triangle.style.display = 'block';
        ball.removeEventListener('touchstart', beginDrag);
        ball.removeEventListener('mousedown', beginDrag);
    }

    ball.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    prevX = currentX;
    prevY = currentY;
}

function endDrag() {
    if (distance > 3000) {
        distance = 0;
    }

    ball.style.transform = 'none';

    ball.removeEventListener('touchmove', drag);
    ball.removeEventListener('mousemove', drag);
    ball.removeEventListener('touchend', endDrag);
    ball.removeEventListener('mouseup', endDrag);
}

function randomAnswer() {
    return answers[Math.floor(Math.random() * answers.length)];
}