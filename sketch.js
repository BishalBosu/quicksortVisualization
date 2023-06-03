// QuickSort Visualization using p5 library
// Bishal Bosu

let data = []
let columnWidth = 50

let states = []

function setup() {
	createCanvas(windowWidth, windowHeight)
	data = new Array(floor(width / columnWidth))
	for (let i = 0; i < data.length; i++) {
		//for (let i = 0; i < 20; i++) {
		data[i] = random(height)
		states[i] = -1
	}
	quickSort(data, 0, data.length - 1)
}

async function quickSort(arr, start, end) {
	if (start >= end) {
		return
	}
	let index = await partition(arr, start, end)
	states[index] = -1

	await Promise.all([
		quickSort(arr, start, index - 1),
		quickSort(arr, index + 1, end),
	])
}

async function partition(arr, start, end) {
	

	let pivotValue = arr[end]
	let pivotIndex = start
	states[end] = 0
	for (let i = start; i < end; i++) {
        states[i] = -3
        await sleep(1000)
		if (arr[i] < pivotValue) {
            states[i] = -2
            states[pivotIndex] = -2
			await swap(arr, i, pivotIndex)
            states[i] = -1          
			states[pivotIndex] = -1
			pivotIndex++
			states[pivotIndex] = 1
		}
        states[i] = -1
        
	}
	await swap(arr, pivotIndex, end)

	for (let i = start; i < end; i++) {
		if (i !== pivotIndex) {
			states[i] = -1
		}
	}

	return pivotIndex
}

function draw() {
	background(0)

	for (let i = 0; i < data.length; i++) {
		//noStroke();
        //yellow
		if (states[i] === 0) {
            fill("#D6FFB7")	

		} else if (states[i] === 1) {
            //red
			fill("#E0777D")
		} 
        else if (states[i] === -2) {
            //blue
			fill(0, 0, 255)
		} 
        else if (states[i] === -3) {
            //greeen
			fill(0, 255, 0)
		} 
        else {
            //white
			fill(255)
		}
		rect(i * columnWidth, height - data[i], columnWidth, data[i])
	}
}

async function swap(arr, a, b) {
	await sleep(2000)
	let temp = arr[a]
	arr[a] = arr[b]
	arr[b] = temp
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
