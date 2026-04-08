import {isEscapeKey} from './utils.js';

// Dom-элементы
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

// Открытие и закрытие формы
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

// Изменение масштаба
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

// Эффекты + слайдер

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');

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
  effectLevelInput.value = sliderElement.noUiSlider.get();
});

// применение эффекта
const applyEffect = (effectName, value) => {
  const effect = effects[effectName];

  if (effectName === 'none') {
    previewImage.style.filter = '';
    return;
  }

  previewImage.style.filter =
    `${effect.style}(${value}${effect.unit})`;
};

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
    effectLevel.classList.add('hidden');
    previewImage.style.filter = '';
    return;
  }

  effectLevel.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    step: effect.step,
    start: effect.max
  });

  sliderElement.noUiSlider.set(effect.max);
});

function resetEffects() {
  previewImage.style.filter = '';
  effectLevelContainer.classList.add('hidden');

  const noneEffect = document.querySelector('#effect-none');
  noneEffect.checked = true;

  sliderElement.noUiSlider.set(100);
}

// скрытие слайдера по умолчанию
effectLevelContainer.classList.add('hidden');
resetScale();
resetEffects();
