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

export {getRandomInteger, generateCommentId, generatePostId};
