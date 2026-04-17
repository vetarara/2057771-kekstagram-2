import {getRandomInteger, generateCommentId, generatePostId} from './utils.js';
import { DESCRIPTIONS, NAMES, MESSAGES } from './data.js';

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const START_NUMBER_AVATAR = 1;
const FINAL_NUMBER_AVATAR = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const POSTS_COUNT = 25;

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {string} avatar
 * @property {string} message
 * @property {string} name
 */

/**
 * Создаёт функцию-генератор комментариев.
 * @returns {Comment} Функция, возвращающая объект комментария
 */
const createComment = () => {
  const idAvatar = getRandomInteger(START_NUMBER_AVATAR, FINAL_NUMBER_AVATAR);
  const indexMessageArr = getRandomInteger(0, MESSAGES.length - 1);
  const indexNameArr = getRandomInteger(0, NAMES.length - 1);

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${idAvatar}.svg`,
    message: `${MESSAGES[indexMessageArr]}`,
    name: `${NAMES[indexNameArr]}`,
  };
};

/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} url
 * @property {string} description
 * @property {number} likes
 * @property {Comment[]} comments
 */

/**
 * Создаёт функцию-генератор постов.
 * @returns {Post} Функция, возвращающая объект поста
 */
const createPost = () => {
  const postId = generatePostId();
  const indexDescriptionsArr = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const numComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);

  return {
    id: postId,
    // +1 добавила, т.к. иначе GET http://localhost:3001/photos/0.jpg 404 (Not Found)
    url: `photos/${postId + 1}.jpg`,
    description: `${DESCRIPTIONS[indexDescriptionsArr]}`,
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: numComments}, createComment)
  };
};

