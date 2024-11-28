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
    deleteCookiesPls("amount");
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
  (document.cookie = `${name}=, expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`);

createForm();

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
