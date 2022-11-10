const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json();
      }
      else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
