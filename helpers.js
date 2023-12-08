const validateName = async (name = "", nameOrSurname) => {
  const isValid = /^[a-zA-Zа-яА-ЯёЁ]+$/u.test(name);
  console.log(name);
  if (!isValid) {
    if (nameOrSurname === "имя") {
      return { message: "Имя может содержать только буквы", isValid: false };
    }
    return { message: "Фамилия может содержать только буквы", isValid: false };
  }

  if (name.length < 2 || name.length > 30) {
    if (nameOrSurname === "имя") {
      return {
        message: "Длина имени должна быть от 2 до 30 символов",
        isValid: false,
      };
    }
    return {
      message: "Длина фамилии должна быть от 2 до 30 символов",
      isValid: false,
    };
  }

  return { message: name, isValid: true };
};

const validateEmail = async (email) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return {
    isValid,
    message: isValid ? email : "Введите корректный адрес электронной почты",
  };
};

module.exports = { validateName, validateEmail };
