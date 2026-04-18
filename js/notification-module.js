import { isEscapeKey } from './utils';
const body = document.body;

const getNotificationElements = () => {
  const existElement =
    document.querySelector('.success') ||
    document.querySelector('.error');

  if (!existElement) {
    return null;
  }

  return {
    existElement,
    closeButton: existElement.querySelector('button'),
  };
};

export const onBodyClick = (evt) => {
  evt.stopPropagation(); // событие не всплывёт выше body
  const elements = getNotificationElements();
  if (!elements) {
    return;
  }
  const { existElement, closeButton } = elements;
  if (evt.target === existElement || evt.target === closeButton) {
    existElement.remove();
    body.removeEventListener('click', onBodyClick);
  }
};

export const onBodyKeydown = (evt) => {
  evt.stopPropagation();
  if (!isEscapeKey(evt)) {
    return;
  }
  const elements = getNotificationElements();
  if (!elements) {
    return;
  }

  elements.existElement.remove();
  body.removeEventListener('keydown', onBodyKeydown);
};

export const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onBodyClick);
  body.addEventListener('keydown', onBodyKeydown);
};
