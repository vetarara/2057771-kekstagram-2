const DESCRIPTIONS = [
  'Пляж с высоты птичьего полёта',
  'Путь к пляжу',
  'Лазурные воды',
  'Отдых мечты',
  'Весёлая еда',
  'Моя McLaren',
  'Свежая клубника',
  'Морс',
  'Встречаем самолёт',
  'Удобно хранить обувь',
  'Тропинка к вляжу',
  'Белая ауди',
  'Салат',
  'Которолл',
  'Плюшевые ботинки',
  'Выше облаков',
  'Выступление ансамбля с хором',
  'Импала почти как у Винчестеров',
  'Таинственное освещение',
  'Пальмы у отеля',
  'Боул с лаймом',
  'Закатное море',
  'Крабик',
  'Сбылась мечта',
  'Экстримальный тур'
];

const NAMES = [
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Анна',
  'Максим',
  'Ольга',
  'Иван',
  'София',
  'Михаил',
  'Вета',
  'Владислав',
  'Владислава',
  'Андрей',
  'Таисия',
  'Robert',
  'Olivia',
  'Michael',
  'Isabella',
  'William',
  'Sophia',
  'Daniel',
  'Mia',
  'Christopher',
  'Amelia',
  'Matthew'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const START_NUMBER_AVATAR = 1;
const FINAL_NUMBER_AVATAR = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const POSTS_COUNT = 25;

// Функция-генератор для получения уникальных идентификаторов из указанного диапазона.
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// функция для генерации комментария
const createComment = () => {
  let id = 1;

  return () => {
    const comment = {};

    const idAvatar = getRandomInteger(START_NUMBER_AVATAR, FINAL_NUMBER_AVATAR);
    const indexMessageArr = getRandomInteger(0, MESSAGES.length - 1);
    const indexNameArr = getRandomInteger(0, NAMES.length - 1);
    comment.id = id;
    comment.avatar = `img/avatar-${idAvatar}.svg`;
    comment.message = `${MESSAGES[indexMessageArr]}`;
    comment.name = `${NAMES[indexNameArr]}`;
    id++;
    return comment;
  };
};

// функция для создания объекта поста
const createPost = () => {
  let id = 1;

  return () => {
    const post = {};
    const indexDescriptionsArr = getRandomInteger(0, DESCRIPTIONS.length - 1);
    const numComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
    post.id = id;
    post.url = `photos/${id}.jpg`;
    post.description = `${DESCRIPTIONS[indexDescriptionsArr]}`;
    post.likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
    post.comments = Array.from({length: numComments}, createComment());
    id++;
    return post;
  };
};

// массив постов
const postsArray = Array.from({length: POSTS_COUNT}, createPost());
// console.log(postsArray);
