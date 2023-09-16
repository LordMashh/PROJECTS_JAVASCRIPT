const API_KEY = "";

const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".image-section");
// selecting loading div
const loader = document.querySelector("#loading");

const getImages = async (event) => {
  loader.classList.add("display");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: inputElement.value,
      n: 2,
      size: "1024x1024",
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();

    console.log(data);

    data?.data.forEach((imageObject) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", imageObject.url);
      imageContainer.append(imageElement);
      imageSection.append(imageContainer);
      loader.classList.remove("display");
    });
  } catch (error) {
    console.error(error);
  }
};
submitIcon.addEventListener("click", getImages);
inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getImages(event);
  }
});
