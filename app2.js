const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')

startScreen.addEventListener('click', start)

let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false }
let player = { speed: 5, score: 0 }

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function keyDown(e) {
    e.preventDefault()
    keys[e.key] = true
    //     console.log('keys', keys)
    //    console.log('e', e.key)
}

function keyUp(e) {
    e.preventDefault()
    keys[e.key] = false
    // console.log('e', e.key)
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect()
    bRect = b.getBoundingClientRect()

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) || (aRect.left > bRect.right)
    )
}

function moveLines() {
    let lines = document.querySelectorAll('.lines')
    lines.forEach(function (item) {

        if (item.y >= 700) {
            item.y -= 750
        }

        item.y += player.speed
        item.style.top = item.y + "px"
    })
}

function endGame(){
    player.start = false
    startScreen.classList.remove('hide')
    // gameArea.classList.add('hide')
    startScreen.innerHTML="Game Over <br> Your Final Score is:" + player.score + 
    "<br> Press here to start again"
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy')
    enemy.forEach(function (item) {

        if (isCollide(car, item)) {
            console.log('boom')
            endGame()
        }

        if (item.y >= 750) {
            item.y = -300
            item.style.left = Math.floor(Math.random() * 350) + 'px'
        }

        item.y += player.speed
        item.style.top = item.y + "px"
    })
}

function gamePlay() {
    // console.log('cliked')

    let car = document.querySelector('.car')
    let road = gameArea.getBoundingClientRect()
    // console.log('road', road)

    if (player.start) {
        moveLines()
        moveEnemy(car)

        if (keys.ArrowUp && player.y > (road.top + 200)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y +  'px'
        car.style.left = player.x + 'px'

        window.requestAnimationFrame(gamePlay)
        // console.log('player.score++', player.score++)
        score.innerText = `Score: ${player.score++}`
    }
}

function start() {
    // gameArea.classList.remove('hide')
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    // score.classList.remove('hide')
    player.start = true
    player.score = 0

    for (x = 0; x < 5; x++) {
        let roadLines = document.createElement('div')
        roadLines.setAttribute('class', 'lines')
        roadLines.y = x * 150
        roadLines.style.top = roadLines.y + 'px'
        gameArea.appendChild(roadLines)
    }

    let car = document.createElement('div')
    car.setAttribute('class', 'car')
    car.innerText = 'i am a car'
    gameArea.appendChild(car)

    player.x = car.offsetLeft
    player.y = car.offsetTop

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div')
        enemyCar.setAttribute('class', 'enemy')
        enemyCar.y = ((x + 1) * 350) * -1
        enemyCar.style.top = enemyCar.y + 'px'
        enemyCar.style.backgroundColor = randomColor()
        enemyCar.style.left = Math.floor(Math.random() * 350) + 'px'
        gameArea.appendChild(enemyCar)
    }

    window.requestAnimationFrame(gamePlay)
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16)
        return ("0" + String(hex)).substr(-2)
    }
    return "#"+c()+c()+c()
}