
        const score = document.querySelector('.score')
        const startScreen = document.querySelector('.startScreen')
        const gameArea = document.querySelector('.gameArea')

        const keys = {ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false}
        let player = { speed: 5 }

        const fncKeyDown = (e) =>{
          e.preventDefault()
          keys[e.key] = true
        //   console.log(keys);
        //   console.log(e.key); 
        }

        const fncKeyUp = (e) =>{
          e.preventDefault()
          keys[e.key] = false
        //   console.log(e); 
        }

        document.addEventListener('keydown', fncKeyDown)
        document.addEventListener('keyup', fncKeyUp)

        startScreen.addEventListener('click', start)

        function moveLines () {
            let lines = document.querySelectorAll('.lines')
            lines.forEach(function(value){

                if(value.y >= 700){
                    value.y -= 750
                }
                 value.y += player.speed
                 value.style.top = value.y + 'px'
            })
        }

        function moveEnemy () {
            let enemy = document.querySelectorAll('.enemy')
            enemy.forEach(function(value){

                if(value.y >= 750){
                    value.y = -300
                    value.style.left = Math.floor(Math.random() * 350) + 'px'
                }
                 value.y += player.speed
                 value.style.top = value.y + 'px'
            })
        }
        
        function gamePlay () {
            let car = document.querySelector('.car')
            let road = gameArea.getBoundingClientRect()
            console.log('road', road)
            if(player.start){
                
                moveLines() 
                moveEnemy()

                if(keys.ArrowUp && player.y > (road.top + 100)) { player.y -= player.speed}
                if(keys.ArrowDown && player.y < (road.bottom - 70) ) { player.y += player.speed}
                if(keys.ArrowLeft && player.x > 0) { player.x -= player.speed}
                if(keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed}

                car.style.top = player.y + 'px'
                car.style.left = player.x +'px'

                window.requestAnimationFrame(gamePlay)
            }
           
        }

        function start () {
            gameArea.classList.remove('hide')
            startScreen.classList.add('hide')
            player.start = true
            window.requestAnimationFrame(gamePlay)

            for(x=0; x<5; x++){
            let roadLine = document.createElement('div')
            roadLine.setAttribute('class', 'lines')
            roadLine.y = (x*150)
            roadLine.style.top = roadLine.y + 'px'
            gameArea.append(roadLine)
            }

           

            let car = document.createElement('div')
            car.setAttribute('class', 'car')
            // car.innerText = "Hey i am ur car"
            gameArea.appendChild(car)

            player.x = car.offsetLeft
            player.y = car.offsetTop

            // console.log('top', car.offsetTop )
            // console.log('left', car.offsetLeft)

            for(x=0; x<3; x++){
            let enemyCar = document.createElement('div')
            enemyCar.setAttribute('class', 'enemy')
            enemyCar.y = ((x+1) * 350) * -1
            enemyCar.style.top = enemyCar.y + 'px'
            enemyCar.style.background = '#F43C86'
            enemyCar.style.left = Math.floor(Math.random() * 350) + 'px'
            gameArea.append(enemyCar)
            }
        }
