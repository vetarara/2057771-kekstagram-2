import { createPosts } from './generators.js';
import { findTemplate, } from './dom.js';

/** @type {HTMLAnchorElement} */

const posts = createPosts();
const template = findTemplate('picture');
const container = document.querySelector('.pictures');

const createThumbnail = (post) => {
  /** @type {HTMLAnchorElement} */
  const thumbnail = template.cloneNode(true);
  thumbnail.href = post.url;
  thumbnail.dataset.id = post.id;

  const image = thumbnail.querySelector('.picture__img');

  image.src = post.url;
  image.alt = post.description;

  thumbnail.querySelector('.picture__comments').textContent = post.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = post.likes;

  return thumbnail;
};

container.append(...posts.map(createThumbnail));

export { posts };
