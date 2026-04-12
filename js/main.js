import './thumbnails.js';
import './post-viewer.js';
import './form.js';
import { setPosts } from './post-viewer.js';

import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showDataError } from './utils.js';

const bootstrap = async () => {
  try {
    const photos = await getData();
    setPosts(photos);
    renderThumbnails(photos);
  } catch (error) {
    showDataError();
  }
};

bootstrap();
