import { isEscapeKey } from './utils';
const body = document.body;

export const onBodyInteraction = (evt) => {
  evt.stopPropagation(); // событие не всплывёт выше body
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('click', onBodyInteraction);
    body.removeEventListener('keydown', onBodyInteraction);
  }
};

export const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onBodyInteraction);
  body.addEventListener('keydown', onBodyInteraction);
};
