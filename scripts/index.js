const pizzas = [
	{
		class: 'extravaganza-gradient',
		title: 'Extravaganza',
		description: `¡Nuestra Pizza Extravaganza es una delicia que tienes que probar!
        Hecha con jamón, champiñones, cebolla morada y queso de cabra.`,
		pizzaSrc: './assets/extravaganza/pizza-5.png',
		pizzaToppingsSrc: './assets/extravaganza/2 1.png',
	},
	{
		class: 'italiana-gradient',
		title: 'Italiana',
		description: `¿Te gusta la pizza levemente picante? Esta mezcla de sabor te encantará! Prueba nuestra Pizza Italiana con queso mozzarella, champiñones y cebolla morada.
        Ideal para una tarde de películas.`,
		pizzaSrc: './assets/italiana/pizza-2.png',
		pizzaToppingsSrc: './assets/italiana/7 1.png',
	},
	{
		class: 'mexicana-gradient',
		title: 'Mexicana',
		description: `original y clásica masa fresca hecha al momento con orilla dorada y espolvoreada de especias que le dan nuestro toque único junto a ingredientes usados en la cocina mexicana.`,
		pizzaSrc: './assets/mexicana/pizza-1.png',
		pizzaToppingsSrc: './assets/mexicana/3 1.png',
	},
	{
		class: 'veggie-gradient',
		title: 'Veggie',
		description: `Deliciosa y saludable variante que celebra la frescura y la diversidad de los vegetales. Sobre una base de masa perfectamente horneada se despliega un festín de colores y sabores, desde tomates, champiñones frescos, pimientos vibrantes y aceitunas.`,
		pizzaSrc: './assets/veggie/pizza-3.png',
		pizzaToppingsSrc: './assets/veggie/1 1.png',
	},
	{
		class: 'pepperoni-gradient',
		title: 'Pepperoni',
		description: `El ingrediente favorito de muchos combinado en una masa fresca y hecha a mano para los fanáticos del pepperoni.`,
		pizzaSrc: './assets/pepporoni/pizza-6.png',
		pizzaToppingsSrc: './assets/pepporoni/5 1.png',
	},
	{
		class: 'deluxe-gradient',
		title: 'Deluxe',
		description: `Disfrutar esta pizza es todo un lujo. Pepperoni, carne molida, champiñones, pimiento, cebolla. Ingredientes: Pepperoni, Carne Molida, Champiñones Frescos, Pimiento y Cebolla`,
		pizzaSrc: './assets/deluxe/pizza-4.png',
		pizzaToppingsSrc: './assets/deluxe/4 1.png',
	},
	{
		class: 'especial-gradient',
		title: 'Especial',
		description: `La pizza para los amantes de la carne. Pepperoni, jamón, finas hierbas.
        Un deleite para todo tipo de reunión.`,
		pizzaSrc: './assets/especial/pizza-8 1.png',
		pizzaToppingsSrc: './assets/especial/8 1.png',
	},
];

var currentGradientIndex = 0;
var currentRotation = 0;
var activeDotRotation = -60;

var nextBtn = undefined;
var previousBtn = undefined;

document.addEventListener('DOMContentLoaded', function () {
	nextBtn = document.querySelector('#next-pizza');
	previousBtn = document.querySelector('#previous-pizza');

	nextBtn.addEventListener('click', () => {
		toggleMenu('next');
	});

	previousBtn.addEventListener('click', () => {
		toggleMenu('previous');
	});
});

function toggleMenu(type) {
	let pizza = undefined;
	const isNext = Boolean(type == 'next');

	if (isNext) {
		currentGradientIndex += 1;
		prevPizza = pizzas[currentGradientIndex - 1];
	} else {
		currentGradientIndex -= 1;
		prevPizza = pizzas[currentGradientIndex + 1];
	}

	pizza = pizzas[currentGradientIndex];

	document.body.classList.remove(prevPizza.class);
	document.body.classList.add(pizza.class);

	const pizzaTitleElement = document.querySelector('#pizza-title');
	updatePizzaTitle(pizzaTitleElement, pizza.title);

	document.querySelector('#pizza-description').innerText = pizza.description;

	const pizzaToppingsElements = document.querySelectorAll('.pizza-toppings');
	pizzaToppingsElements[0].style.opacity = 0;
	pizzaToppingsElements[1].style.opacity = 0;

	setTimeout(function () {
		pizzaToppingsElements[0].src = pizza.pizzaToppingsSrc;
		pizzaToppingsElements[1].src = pizza.pizzaToppingsSrc;

		pizzaToppingsElements[0].style.opacity = 1;
		pizzaToppingsElements[1].style.opacity = 1;
	}, 300);

	if (isNext) {
		rotateImageRight();
	} else {
		rotateImageLeft();
	}

	validateButtonsDisplay();

	var image = document.querySelector('#pizza-image');
	image.style.opacity = 0; // Fade out the image

	setTimeout(function () {
		image.src = pizza.pizzaSrc;
		image.style.opacity = 1;
	}, 300);
}

function validateButtonsDisplay() {
	if (currentGradientIndex == 0) {
		previousBtn.style.display = 'none';
		nextBtn.style.display = 'flex';
	}

	if (currentGradientIndex > 0) {
		previousBtn.style.display = 'flex';
		nextBtn.style.display = 'flex';
	}

	if (currentGradientIndex == pizzas.length - 1) {
		nextBtn.style.display = 'none';
	}
}

function rotateImageLeft() {
	currentRotation -= 50;
	activeDotRotation -= 20;

	document.querySelector(
		'#dot-container',
	).style.transform = `rotate(${activeDotRotation}deg)`;
	document.querySelector(
		'#pizza-image',
	).style.transform = `rotate(${currentRotation}deg)`;
}

function rotateImageRight() {
	currentRotation += 50;
	activeDotRotation += 20;

	document.querySelector(
		'#dot-container',
	).style.transform = `rotate(${activeDotRotation}deg)`;
	document.querySelector(
		'#pizza-image',
	).style.transform = `rotate(${currentRotation}deg)`;
}

function updatePizzaTitle(element, newTitle) {
	element.classList.remove('tracking-in-expand');
	element.innerText = newTitle;
	void element.offsetWidth;
	element.classList.add('tracking-in-expand');
}
