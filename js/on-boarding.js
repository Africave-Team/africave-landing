const nextBtn = document.querySelectorAll('.js-nxtBtn');
const prevBtn = document.querySelectorAll('.js-prevBtn');
const forms = document.querySelectorAll('form');
const stepsContainer = document.querySelector('.forms');
const formSteps = stepsContainer.querySelectorAll('.step');
const formStepsArray = Array.from(formSteps);
const formStat = document.querySelector('.js-pageStat');
const questions = document.querySelectorAll('.question');
const prevPageBtn = document.querySelectorAll('.js-prevPage');
const listInputs = document.querySelectorAll('.js-list-input');
let currentStepIndex = 0;

listInputs.forEach((input) => {
	input.hasItems = false;
	const typearea = input.querySelector('.js-type-area');
  const list = input.querySelector('.js-list');

	//check if list is empty and make field required
	function checkEmpty() {
		input.hasItems = Boolean(list.innerHTML.trim());
		input.hasItems ? typearea.removeAttribute('required') : typearea.setAttribute('required', true);
	}

	checkEmpty();

	typearea.addEventListener('change', () => {
		const newItem = typearea.value;
		typearea.value = '';
		newItem ? (list.innerHTML += `<p class="item js-item">${newItem}</p>`) : false;
		checkEmpty();

		input.querySelectorAll('.item').forEach((item) => {
			item.onclick = (event) => {
				event.currentTarget.outerHTML = '';
				checkEmpty();
			};
		});
	});
});

forms.forEach((form) =>
	form.addEventListener('submit', () => {
		event.preventDefault();
	})
);

function store_form_data(form, object) {
	//for radios
	form.querySelectorAll('.question').forEach((question) => {
		const question_name = question.getAttribute('name') ? question.getAttribute('name').toLowerCase() : null;
		if (question_name) {
			question.querySelectorAll('input[type=radio]').forEach((e) => {
				e.checked === true ? (object[question_name] = e.value) : '';
			});
		}
	});
	//for selectboxes
	form.querySelectorAll('select').forEach((select) => {
		if (select.getAttribute('name'))
			object[select.getAttribute('name').toLowerCase()] = getSelectedOptionId(select);
	});
	// for text, email, textareas and password inputs
	form
		.querySelectorAll(
			'input[type=text],input[type=email],input[type=password], input[type=number], input[type=url], textarea'
		)
		.forEach((input) => {
			object[input.getAttribute('name').toLowerCase()] = input.value;
		});

	//for list type inputs
	form.querySelectorAll('.js-list-input').forEach((input) => {
		object[input.getAttribute('name').toLowerCase()] = [];
		input.querySelectorAll('.js-item').forEach((item) => {
			object[input.getAttribute('name').toLowerCase()].push(item.innerText);
		});
	});
}

function makeRequired(classname) {
	document.querySelectorAll(classname).forEach((input) => {
		input.setAttribute('required', true);
	});
}
//making all fields required
makeRequired('input:not(.js-not-required)');
makeRequired('select:not(.js-not-required)');

prevPageBtn.forEach((btn) => {
	btn.addEventListener('click', () => {
		history.go(-2);
	});
});

let questionCount = 0;
questions.forEach((question) => {
	questionCount++;
	question.setAttribute('question', `${questionCount}`);
	question.querySelectorAll('input[type=radio]').forEach((e) => {
		e.setAttribute('name', `question-${questionCount}`);
	});
});

const updateCurrentStep = (ev) => {
	//   check if counter is to much
	if (currentStepIndex >= formStepsArray.length) {
		currentStepIndex = formStepsArray.length - 1;
	}
	formStepsArray.forEach((step) => step.classList.remove('active'));
	formStepsArray[currentStepIndex].classList.add('active');

	if (formStat) formStat.innerHTML = `${currentStepIndex + 1} of ${formStepsArray.length}`;
};
nextBtn.forEach((btn) =>
	btn.addEventListener('click', () => {
		if (formStepsArray[currentStepIndex].checkValidity()) {
			currentStepIndex++;
			updateCurrentStep(event);
		}
	})
);
prevBtn.forEach((btn) =>
	btn.addEventListener('click', () => {
		currentStepIndex--;
		updateCurrentStep(event);
	})
);
