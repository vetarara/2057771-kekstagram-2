const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте ещё раз',
  [Method.POST]: 'Не удалось отправить данные формы',
};

// С использованием async/await - ЗАГРУЗКА ДАННЫХ
const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, { method, body });
  return response.ok ? await response.json() : Promise.reject({ message: ErrorText[method], status: response.status });
  // в reject добавлены объекты с полями message и status, чтобы получать больше информации
};

const getData = async () => await load(Route.GET_DATA);
const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
