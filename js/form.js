import {isEscapeKey} from './utils.js';
import { sendData } from './api.js';
import { appendNotification } from './notification-module.js';

// DOM-элементы
const uploadInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const previewImage = document.querySelector('.img-upload__preview img');

// масштаб
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

// эффекты
const effectsList = document.querySelector('.effects__list');

// слайдер
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');

// текст
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');


// Константы
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

// Подключение Pristine

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

// Проверка хэштегов
// превращаеm строку тегов в массив
const getHashtags = () =>
  hashtagsInput.value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((tag) => tag.length > 0);

// проверка формата
const validateHashtagFormat = () => {
  const hashtags = getHashtags();
  return hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

// проверка количества тегов - не больше 5
const validateHashtagCount = () => {
  const hashtags = getHashtags();
  return hashtags.length <= MAX_HASHTAGS;
};

// проверка уникальности - не должны повторяться
const validateHashtagUnique = () => {
  const hashtags = getHashtags();
  const unique = new Set(hashtags);
  return unique.size === hashtags.length;
};

// проверка комментария
const validateComment = () =>
  commentInput.value.length <= MAX_COMMENT_LENGTH;


//подключение валидаторов
pristine.addValidator(
  hashtagsInput,
  validateHashtagFormat,
  'Неправильный хэштег'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagCount,
  'Нельзя указать больше пяти хэштегов'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagUnique,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Длина комментария не больше 140 символов'
);

// эффекты
const effects = {
  none: {
    style: 'none',
    unit: '',
    min: 0,
    max: 0,
    step: 0
  },
  chrome: {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  }
};

// открытие / закрытие формы
const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeydown);

  form.reset();
  pristine.reset();

  resetScale();
  resetEffects();

  uploadInput.value = '';
};

function onEscKeydown(evt) {
  if (!isEscapeKey(evt)) {
    return;
  }

  const isInputFocused =
    document.activeElement === hashtagsInput ||
    document.activeElement === commentInput;

  if (!isInputFocused) {
    evt.preventDefault();
    closeForm();
  }
}

uploadInput.addEventListener('change', openForm);
closeButton.addEventListener('click', closeForm);


// масштаб фото
let currentScale = 100;

const updateScale = () => {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
};

function resetScale () {
  currentScale = 100;
  updateScale();
}

scaleSmaller.addEventListener('click', () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
});

scaleBigger.addEventListener('click', () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale();
  }
});

// эффекты + слайдер
const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

// обновление значения
sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  const currentEffect =
    document.querySelector('.effects__radio:checked').value;

  effectLevelInput.value = value; // запись для формы
  applyEffect(currentEffect, value);
});

// применение эффекта
function applyEffect (effectName, value) {
  const effect = effects[effectName];

  if (effectName === 'none') {
    previewImage.style.filter = '';
    return;
  }

  previewImage.style.filter =
    `${effect.style}(${value}${effect.unit})`;
}

// движение слайдера
sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  const currentEffect =
    document.querySelector('.effects__radio:checked').value;

  effectLevelInput.value = value;
  applyEffect(currentEffect, value);
});

// переключение эффектов
effectsList.addEventListener('change', (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const effectName = evt.target.value;
  const effect = effects[effectName];

  if (effectName === 'none') {
    effectLevelContainer.classList.add('hidden');
    previewImage.style.filter = '';
    sliderElement.noUiSlider.set(0);
    effectLevelInput.value = 0; // запись для формы
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    step: effect.step,
    start: effect.max
  });

  sliderElement.noUiSlider.set(effect.max);
  effectLevelInput.value = effect.max; // запись для формы
});

// сброс эффектов
function resetEffects() {
  previewImage.style.filter = '';
  effectLevelContainer.classList.add('hidden');

  const noneEffect = document.querySelector('#effect-none');
  noneEffect.checked = true;

  sliderElement.noUiSlider.set(100);
}

// стартовая инициализация
effectLevelContainer.classList.add('hidden');

resetScale();
resetEffects();

// =======

// ДОБАВЛЯЕТ ИНТЕРАКТИВНОСТЬ НА КНОПКУ
const formSubmitButton = form.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Сохранить', //начальное состояние
  SENDING: 'Сохраняю...',
};

// метод, который блокирует кнопку
const disabledButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;
};

// метод, который разблокировывает кнопку
const enableButton = (text) => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = text;
};

// ДОБАВЛЯЕТ ОТПРАВКУ ФОРМЫ
const templateSuccess = document.querySelector('#success').content.firstElementChild;
const templateError = document.querySelector('#error').content.firstElementChild;

const sendFormData = async (formElement) => {
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  disabledButton(SubmitButtonText.SENDING);

  try {
    await sendData(new FormData(formElement));

    closeForm();

    appendNotification(templateSuccess);

  } catch (error) {
    appendNotification(templateError);
  } finally {
    enableButton(SubmitButtonText.IDLE);
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

form.addEventListener('submit',
  formSubmitHandler);
