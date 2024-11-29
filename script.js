// task 1
const swapContent = (id1, id2) => {
  const element1 = document.getElementById(id1);
  const element2 = document.getElementById(id2);

  // Ensure both elements exist
  if (element1 && element2) {
    const tempContent = element1.innerHTML;
    element1.innerHTML = element2.innerHTML;
    element2.innerHTML = tempContent;
  } else {
    console.error("One or both elements do not exist.");
  }
};

swapContent("x", "y");

//task 2
const circleArea = (radius) => Math.PI * radius ** 2;
const writeText = (containerName, text) => {
  document.getElementsByClassName(containerName)[0].innerHTML += text;
};

const radius = 3;
writeText("main-content", circleArea(radius));

//task 3
const createInputs = (parentForm) => {
  for (let i = 0; i < 10; i++) {
    const input = document.createElement("input");
    input.className = "numbers";
    input.type = "number";
    input.name = `num${i}`;
    input.placeholder = `Number ${i + 1}`;

    parentForm.appendChild(input);
  }
};

const createButton = (mainContainer, inputForm) => {
  const countBtn = document.createElement("button");
  countBtn.id = "count-btn";
  countBtn.textContent = "count";

  countBtn.addEventListener("click", (event) => {
    setCookie("amount", countMax());
    mainContainer.removeChild(inputForm);
    mainContainer.removeChild(countBtn);
  });

  return countBtn;
};

const createForm = () => {
  const container = document.getElementsByClassName("main-content")[0];
  const form = document.createElement("form");
  form.id = "numbers-form";

  createInputs(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const countBtn = createButton(container, form);

  container.appendChild(form);
  container.appendChild(countBtn);
};

const countMax = () => {
  let counter = 0;
  let maxNum = 0;
  const numbers = document.querySelectorAll("#numbers-form input");

  numbers.forEach((inputText) => {
    const number = parseFloat(inputText.value);

    if (number > maxNum) {
      maxNum = number;
      counter = 1;
    } else if (number == maxNum) counter++;
  });

  return counter;
};

const setCookie = (name, value) =>
  (document.cookie = `${name}=${value}; path=/`);

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");

    if (key === name) {
      return value;
    }
  }

  return null;
};

const deleteCookie = (name) =>
  (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`);

const deleteCookiesPls = (cookieToDelete) => {
  const confDelete = confirm(
    `Видали пряники бубласка. Зараз там знаходиться кількість максимальних чисел - ${getCookie(
      cookieToDelete
    )}`
  );

  if (confDelete) {
    deleteCookie(cookieToDelete);
    createForm();
    console.log(document.cookie);
  } else
    alert(
      "Кому сказав видалить пряники?! Ладно, в тебе ще є шанс: якщо оновиш сторінку, то видалиться"
    );
};

const deleteCookiesRefresh = (name) => {
  if (getCookie(name)) {
    deleteCookiesPls(name);
  } else {
    createForm();
  }
};

deleteCookiesRefresh("amount");

// task 4
const setBlockBackgroundColor = () => {
  const block2 = document.getElementById("block2");
  block2.tabIndex = 0;

  const savedColor = localStorage.getItem("block2-bc");
  if (savedColor) {
    block2.style.backgroundColor = savedColor;
  }

  block2.addEventListener("click", () => {
    const newColor = prompt(
      "Ось ти і попався... Введи новий колір для цього блоку"
    );
    if (newColor) {
      localStorage.setItem("block2-bc", newColor);
      block2.style.backgroundColor = newColor;
    }
  });
};

setBlockBackgroundColor();

//task 5
const initializeEditableBlocks = () => {
  const numberBlocks = document.querySelectorAll(".number-block");

  numberBlocks.forEach((block) => {
    block.addEventListener("dblclick", () => {
      const currentContent = block.innerHTML;

      const form = document.createElement("form");
      const input = document.createElement("input");
      const saveButton = document.createElement("button");

      input.type = "text";
      input.value = currentContent;

      saveButton.type = "submit";
      saveButton.textContent = "Save";

      form.appendChild(input);
      form.appendChild(saveButton);

      block.innerHTML = "";
      block.appendChild(form);

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newContent = input.value;

        localStorage.setItem(block.id, newContent);

        block.innerHTML = newContent;

        block.style.backgroundColor = getRandomColor();

        addResetButton(block, currentContent);
      });
    });
  });
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const addResetButton = (block, originalContent) => {
  const existingButton = block.nextElementSibling;
  if (existingButton && existingButton.classList.contains("reset-btn")) return;

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.className = "reset-btn";

  resetButton.addEventListener("click", () => {
    const savedContent = originalContent;

    block.innerHTML = savedContent;

    resetButton.remove();
    localStorage.removeItem(block.id);
  });

  block.parentNode.insertBefore(resetButton, block.nextSibling);
};

initializeEditableBlocks();
