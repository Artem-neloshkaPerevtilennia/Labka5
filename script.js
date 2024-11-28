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
}

const radius = 3;
writeText("main-content", circleArea(radius));

//task 3
