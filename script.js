//the width is going to be 28 squares of 15px each
const width = 28
//we grab the .grid and the #score form the HTML file
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
//The squares array is created in the createLayout function. Going to use it for to style the layout together with the layout array.
let squares = []
let score = 0

//The layout is going to be 28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
	1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
	1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
	1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
	4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
	1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
	1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
	1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
	1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
	1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
	1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
	1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
	1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
	1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

function createLayout() {
	for (let i = 0; i < layout.length; i++) {
		//creates the square div to put in the div with class grid.
		const square = document.createElement('div')
		//appends the square to the grid in the html
		grid.appendChild(square)
		//pushes the square to the squares array. This is going to be used to style the layout together with the layout array
		squares.push(square)

		// 0 - pac-dots
		// 1 - wall
		// 2 - ghost-lair
		// 3 - power-pellet
		// 4 - empty
		if (layout[i] === 0) {
			squares[i].classList.add("pac-dot")
		} else if (layout[i] === 1) {
			squares[i].classList.add("wall")
		} else if (layout[i] === 2) {
			squares[i].classList.add("ghost-lair")
		} else if (layout[i] === 3) {
			squares[i].classList.add("power-pellet")
		}
	}
}

createLayout()

//Inital positon of Pacman
let pacmanCurrentIndex = 490
//adds class pacman to the pacmanCurrentIndex in the squares array.
squares[pacmanCurrentIndex].classList.add('pacman')

//up key - 38
// left - 37
// right - 39
//down key - 40

function control(event) {
	squares[pacmanCurrentIndex].classList.remove('pacman')
	switch (event.keyCode) {
		case 40:
			//if the positon is more than 784 then we are outside of the layout AND the index + 28 where we are moving does not have a class of wall AND does not have class of ghost-lair
			if (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex + width].classList.contains('wall') && pacmanCurrentIndex + width < 784) pacmanCurrentIndex += width
			break
		case 39:
			//if module is 27 we are in the last row in the right side of the layout AND the index + 1 where we are moving does not have a class of wall AND does not have class of ghost-lair
			if (!squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && pacmanCurrentIndex % width < width - 1) pacmanCurrentIndex += 1
			//if pacman is in 364 we will make him use the shortcut to the other side of the layout so we can set his position to the corresponding index in the squares array
			if (pacmanCurrentIndex === 391) {
				pacmanCurrentIndex = 364
			}
			break
		case 38:
			// if we are less than 0 on the index of squares we are outside of the layout AND the index - 28 where we are moving does not have a class of wall AND does not have class of ghost-lair
			if (!squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex - width].classList.contains('wall') && pacmanCurrentIndex - width >= 0) pacmanCurrentIndex -= width
			break
		case 37:
			//if the modulus is = 0 then we are on the first row on the left side of the left AND the index - 1 where we are moving does not have a class of wall AND does not have class of ghost-lair
			if (!squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && pacmanCurrentIndex % width !== 0) pacmanCurrentIndex -= 1
			//if pacman is in 391 we will make him use the shortcut to the other side of the layout so we can set his position to the corresponding index in the squares array
			if (pacmanCurrentIndex === 364) {
				pacmanCurrentIndex = 391
			}
			break
	}
	squares[pacmanCurrentIndex].classList.add('pacman')
	dotEaten()
	powerDotEaten()
}

document.addEventListener('keyup', control)

//checks if the position has the class pac-dot if so updates the score + 1
function dotEaten() {
	if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
		squares[pacmanCurrentIndex].classList.remove('pac-dot')
		score++
		//updates the html side
		scoreDisplay.innerHTML = score
		squares[pacmanCurrentIndex].classList.remove('pac-dot')
	}
}

function powerDotEaten() {
	if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
		squares[pacmanCurrentIndex].classList.remove('power-pellet')
		score += 10
		ghosts.forEach (ghost => ghost.isScared = true)
		setTimeout(unscareGhosts, 10000);
	}
}

function unscareGhosts() {
	ghosts.forEach(ghost => ghost.isScared = false)
}

//creates the template for our ghosts
class Ghost {
	constructor(className, startIndex, speed) {
		this.className = className
		this.startIndex = startIndex
		this.speed = speed
		//from here is other variables stored in the constructor
		this.currentIndex = startIndex
		this.isScared = false //if true pacman can eat the ghost
		this.timerId = NaN //will set this one later
	}
}

//Store the ghosts in an array and inside the index we create a new ghost using the constructor
const ghosts = [
	new Ghost('blinky', 348, 250),
	new Ghost('pinky', 376, 400),
	new Ghost('inky', 351, 300),
	new Ghost('clyde', 379, 500)
]

// for each ghost in the array, we use the startIndex value to style the squares array wiht the class of each ghost
ghosts.forEach(ghost => {
	squares[ghost.startIndex].classList.add(ghost.className)
	//this class is imaginary in the sense that does not style anything but we will use it to detect if there is colision between ghosts
	squares[ghost.startIndex].classList.add('ghost')
	})

//for each ghost we want to call a fusntion to move them 
ghosts.forEach(ghost => moveGhost(ghost))

//This fucntion will move all the ghosts in the array ghosts
function moveGhost(ghost) {
	const possibleDirections = [+1, +28, -1, -28]
	//Math random will creata a random number between 0 to less than 1 then multiply by the possibleDirections lenght (4) the result trough math floor will be round downward to the closest integer 
	let direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
	console.log(direction)
	
	//create a timer function to move each ghost at its speed
	ghost.timerId = setInterval(function() {
		if (!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
			//remove the ghost className on the currentIndex
			squares[ghost.currentIndex].classList.remove(ghost.className)
			squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
			//add direction to currentIndex
			ghost.currentIndex += direction

			//add ghost className to the new currentIndex
			squares[ghost.currentIndex].classList.add(ghost.className)
			squares[ghost.currentIndex].classList.add('ghost')
		} else direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
		
		//sets the style to scared-ghost if isScaredis true
		if (ghost.isScared){
			squares[ghost.currentIndex].classList.add('scared-ghost')
		}
	}, ghost.speed)

}

