module.exports = {
  startButton: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Пройти опрос",
            callback_data: "start_quiz",
          },
        ],
      ],
    }),
  },
  firstQuestion: {
    question: {
      text: "Какой уровень риска вы готовы принять при инвестировании?",
      picture: "https://ispace.news/storage/cache/images/article/0492.png",
    },
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Низкий риск", callback_data: "quiz_1" },
          { text: "Умеренный риск", callback_data: "quiz_1" },
        ],
        [
          { text: "Высокий риск", callback_data: "quiz_1" },
          { text: "Нужна помощь", callback_data: "quiz_1" },
        ],
      ],
    }),
  },
  secondQuestion: {
    question: {
      text: "Какую сумму вы планируете инвестировать?",
      picture:
        "https://equity.today/wp-content/uploads/s-kakoj-summy-mozhno-nachat-investirovat.jpg",
    },
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "До 10,000 руб.", callback_data: "quiz_2" },
          { text: "10,000-50,000 руб", callback_data: "quiz_2" },
        ],
        [
          { text: "Свыше 50,000 руб.", callback_data: "quiz_2" },
          { text: "Нужен совет", callback_data: "quiz_2" },
        ],
      ],
    }),
  },
  contactButton: {
    reply_markup: JSON.stringify({
      keyboard: [[{ text: "Поделиться контактами", request_contact: true }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  },
  ipButton: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Узнать ip",
            web_app: { url: "https://etopritika.github.io/get-ip-js/" },
          },
        ],
      ],
    }),
  },
};
