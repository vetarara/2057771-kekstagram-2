import {isEscapeKey, isEnterKey} from './utils.js';
let posts = [];

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

/**
 * Обработчик нажатия клавиш на документе (закрытие по Escape)
 * @param {KeyboardEvent} evt
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

/**
 * Создаёт DOM-элемент комментария
 * @param {{ avatar: string, name: string, message: string }} comment
 * @returns {HTMLLIElement}
 */
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

/**
 * Отрисовывает следующую часть комментариев
 * @returns {void}
 */
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

/**
 * Заполняет модальное окно данными фотографии
 * @param {{ url: string, likes: number, description: string, comments: Array }} photo
 * @returns {void}
 */
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

/**
 * Открывает модальное окно с данными фотографии
 * @param {{ url: string, likes: number, description: string, comments: Array }} photo
 * @returns {void}
 */
function openUserModal (photo) {
  userModalElement.classList.remove('hidden');
  fillModal(photo);
  document.body.classList.add('modal-open'); // чтобы контейнер с фотографиями позади не прокручивался при скролле
  document.addEventListener('keydown', onDocumentKeydown);
}

/**
 * Закрывает модальное окно
 * @returns {void}
 */
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
commentsLoader.addEventListener('click', renderComments);

// закрытие
userModalCloseElement.addEventListener('click', closeUserModal);

/**
 * Обработчик нажатия Enter на кнопке закрытия модального окна
 * @param {KeyboardEvent} evt
 */
function onUserModalKeydown(evt) {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
}

// функция для инициализации
const setPosts = (data) => {
  posts = data;
};

userModalCloseElement.addEventListener('keydown', onUserModalKeydown);

export { setPosts };
