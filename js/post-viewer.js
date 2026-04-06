import {isEscapeKey, isEnterKey} from './utils.js';
import { posts } from './thumbnails.js';

// элементы DOM
const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.pictures');
const userModalCloseElement = document.querySelector('#picture-cancel');

// комментарии
const COMMENTS_STEP = 5;

let currentComments = [];
let shownCommentsCount = 0;

const commentsContainer = userModalElement.querySelector('.social__comments');
const commentsLoader = userModalElement.querySelector('.comments-loader');
const commentsCountBlock = userModalElement.querySelector('.social__comment-count');
const shownCountElement = userModalElement.querySelector('.social__comment-shown-count');
const totalCountElement = userModalElement.querySelector('.social__comment-total-count');

// обработчик Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

// создание одного комментария (dom-элемента)
const createCommentElement = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  comment.innerHTML = `
    <img class="social__picture"
         src="${avatar}"
         alt="${name}"
         width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  return comment;
};

// отрисовка части комментариев
const renderComments = () => {
  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_STEP
  );

  nextComments.forEach((comment) => {
    commentsContainer.append(createCommentElement(comment));
  });

  shownCommentsCount += nextComments.length;

  // обновляет счётчики
  shownCountElement.textContent = shownCommentsCount;
  totalCountElement.textContent = currentComments.length;

  // скрытие кнопки, если показаны все комментарии
  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

// заполнение модалки данными
const fillModal = (photo) => {
  // фото
  userModalElement.querySelector('.big-picture__img img').src = photo.url;
  // лайки
  userModalElement.querySelector('.likes-count').textContent = photo.likes;
  // описание
  userModalElement.querySelector('.social__caption').textContent = photo.description;
  // комментарии (количество)
  currentComments = photo.comments;
  shownCommentsCount = 0;

  commentsContainer.innerHTML = '';

  commentsCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // первый рендер (5 комментариев)
  renderComments();
};

// открытие модалки
function openUserModal (photo) {
  userModalElement.classList.remove('hidden');
  fillModal(photo);
  document.body.classList.add('modal-open'); // чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.addEventListener('keydown', onDocumentKeydown);
}

// закрытие
function closeUserModal () {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// открытие по клику — делегирование
userModalOpenElement.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');

  if (!picture) {
    return;
  }

  evt.preventDefault();

  const id = Number(picture.dataset.id);
  const photo = posts.find((post) => post.id === id); // находит нужный объект

  openUserModal(photo);
});

// открытие по Enter
userModalOpenElement.addEventListener('keydown', (evt) => {
  const picture = evt.target.closest('.picture');

  if (!picture) {
    return;
  }

  if (isEnterKey(evt)) {
    evt.preventDefault();

    const id = Number(picture.dataset.id);
    const photo = posts.find((post) => post.id === id);

    openUserModal(photo);
  }
});

// кнопка Загрузить ещё
commentsLoader.addEventListener('click', () => {
  renderComments();
});

// закрытие
userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

userModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
});
