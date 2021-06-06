const burgerBtn = document.querySelector('.js-burger-btn');
const forms = document.querySelectorAll('form');

burgerBtn.addEventListener('click', function() {
	console.log('clicked');
	burgerBtn.classList.toggle('burger-btn-active');
});

const preventD = () => {
	event.preventDefault();
};

forms.forEach((form) =>
	form.addEventListener('submit', () => {
		event.preventDefault();
	})
);
