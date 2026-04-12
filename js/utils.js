import { findTemplate } from './dom.js';

/**
 * Возвращает случайное целое число в заданном диапазоне (включительно).
 * @param {number} min - Минимальное значение
 * @param {number} max - Максимальное значение
 * @returns {number} Случайное целое число
 */
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

/**
 * Создаёт генератор уникальных идентификаторов.
 * При каждом вызове возвращает следующее число.
 * @returns {function(): number} Функция-генератор id
 */
const createIdGenerator = () => {
  let id = 0;
  return () => id++;
};

/**
 * Генераторы id для комментариев и постов
 * @type {function(): number}
 */
const generateCommentId = createIdGenerator();
const generatePostId = createIdGenerator();

/**
 * Проверяет, нажата ли клавиша Escape.
 *
 * @param {KeyboardEvent} evt - Объект события клавиатуры.
 * @returns {boolean} Возвращает true, если нажата клавиша Escape, иначе false.
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

// =======
// ошибка загрузки миниатюр  - ОБРАБОТКА ВОЗМОЖНЫХ ОШИБОК ПРИ ЗАГРУЗКЕ
const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorLoadDataTemplate = document.querySelector('#data-error').content;
const body = document.body;

const showErrorMessage = (message) => {
  const errorElement = errorLoadDataTemplate.cloneNode(true);

  if (message) {
    errorElement.querySelector('.data-error__title').textContent = message;
  }

  body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const showDataError = () => {
  const template = findTemplate('data-error');
  const node = template.cloneNode(true);

  document.body.append(node);

  setTimeout(() => {
    node.remove();
  }, 5000);
};

export {
  getRandomInteger,
  generateCommentId,
  generatePostId,
  isEscapeKey,
  isEnterKey,
  showErrorMessage,
  showDataError
};
