import {isEscapeKey, isEnterKey} from './utils.js';
import { posts } from './thumbnails.js';

// элементы DOM
const userModalElement = document.querySelector('.big-picture');
const userModalOpenElement = document.querySelector('.pictures');
const userModalCloseElement = document.querySelector('#picture-cancel');

// обработчик Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
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
  userModalElement.querySelector('.social__comment-shown-count').textContent = photo.comments.length;
  // список комментариев
  const commentsContainer = userModalElement.querySelector('.social__comments');
  commentsContainer.innerHTML = '';

  photo.comments.forEach(({ avatar, name, message }) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');

    comment.innerHTML = `
      <img class="social__picture"
           src="${avatar}"
           alt="${name}"
           width="35" height="35">
      <p class="social__text">${message}</p>
    `;

    commentsContainer.append(comment);
  });

  // скрывает блоки счётчика комментариев
  userModalElement.querySelector('.social__comment-count').classList.add('hidden');
  userModalElement.querySelector('.comments-loader').classList.add('hidden');
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

// открытие — делегирование
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
