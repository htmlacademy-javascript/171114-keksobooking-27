const Link = {
  GETTING_DATA: 'https://27.javascript.pages.academy/keksobooking/data',
  SENDING_DATA: 'https://27.javascript.pages.academy/keksobooking',
};

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(Link.GETTING_DATA);
    if (!response.ok) {
      throw new Error ('Не удалось загрузить объявления');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      Link.SENDING_DATA,
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error ('Не удалось отправить данные');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export {getData, sendData};
