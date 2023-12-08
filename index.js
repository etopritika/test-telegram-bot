const TelegramApi = require("node-telegram-bot-api");

require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramApi(token, { polling: true });

const { validateName, validateEmail } = require("./helpers");

const {
  startButton,
  firstQuestion,
  secondQuestion,
  contactButton,
  ipButton,
} = require("./buttons");

const { questions } = require("./questions");

let chatStates = {};

let userData = {
  name: "",
  surname: "",
  phone: "",
  email: "",
};

const startQuiz = async (chatId, { question, reply_markup }) => {
  const { text, picture } = question;
  await bot.sendPhoto(chatId, picture);
  await bot.sendMessage(chatId, text, { reply_markup });
};

const askQuestion = async (chatId, question) => {
  const { text, picture } = question;
  if (picture) {
    await bot.sendPhoto(chatId, picture);
    await bot.sendMessage(chatId, text);
    return;
  }
  await bot.sendMessage(chatId, text);
};

const start = () => {
  bot.setMyCommands([{ command: "/start", description: "Начать опрос" }]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Внимание! Количество мест на платформе ограничено. Чтобы не упустить этот шанс, нажмите на кнопку ниже и пройдите опрос прямо сейчас!",
        startButton
      );
    }

    switch (chatStates[chatId]) {
      case 4:
        const { message: messageName, isValid: validName } = await validateName(
          text,
          "имя"
        );

        chatStates[chatId] = validName ? 5 : 4;

        if (validName) {
          userData.name = messageName;
          await askQuestion(chatId, questions[1]);
        } else {
          await bot.sendMessage(chatId, messageName);
        }

        break;
      case 5:
        const { message: messageSurname, isValid: validSurname } =
          await validateName(text, "фамилия");

        chatStates[chatId] = validSurname ? 6 : 5;

        if (validSurname) {
          userData.surname = messageSurname;
          await askQuestion(chatId, questions[2]);
        } else {
          await bot.sendMessage(chatId, messageSurname);
        }

        break;
      case 6:
        const { isValid, message } = await validateEmail(text);

        chatStates[chatId] = isValid ? 7 : 6;

        if (isValid) {
          userData.email = message;
          await askQuestion(chatId, questions[3]);
          await bot.sendMessage(
            chatId,
            `Тут має бути логіка відправки до бази данних - ${JSON.stringify(
              userData
            )}`,
            ipButton
          );
          // console.log(userData);
        } else {
          await bot.sendMessage(chatId, message);
        }
        break;

      default:
        break;
    }

    // return bot.sendMessage(chatId, "Я тебе не розумію, спробуй ще раз.");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const state = chatStates[chatId];

    if (data === "start_quiz") {
      chatStates[chatId] = 1;
      await startQuiz(chatId, firstQuestion);
    }

    if (data === "quiz_1" && chatStates[chatId] === 1) {
      chatStates[chatId] = 2;
      await startQuiz(chatId, secondQuestion);
    }

    if (data === "quiz_2" && chatStates[chatId] === 2) {
      chatStates[chatId] = 3;
      await bot.sendMessage(
        chatId,
        'Что бы поделиться номером телефона нажмите на кнопку "Поделиться контактами"',
        contactButton
      );
    }
  });

  bot.on("contact", async (msg) => {
    const chatId = msg.chat.id;
    const phoneNumber = msg.contact.phone_number;

    if (phoneNumber && chatStates[chatId] === 3) {
      userData.phone = phoneNumber;
      chatStates[chatId] = 4;
      await askQuestion(chatId, questions[0]);
    }
  });

  // bot.on("location", async (msg) => {
  //   const chatId = msg.chat.id;
  //   const location = msg.location;
  //   const longitude = msg.location.longitude;

  //   console.log(location);
  // });
};

start();
