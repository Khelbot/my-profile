function displayPoem(response) {
  // Display the generated poem
  console.log("poem generated");
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generatePoem(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  // build the API URL
  let apiKey = "a178d9a5o93065abc1483ta8160b31ef";
  let context =
    "You are a romantic poet and love to write short poems. Your mission is to generate a four line poem in basic html (without using the word html) and using only one font size all of the time. Do not include a poem title. Make sure to follow user instructions. Each line of the poem should be on its own line. Always sign the poem with '-SheCodes Ai' inside a <strong> element at the end.";
  let prompt = `User instructions: Generate a poem in French about ${instructionsInput.value}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<span class="generating">⏳</span> Generating a French poem about ${instructionsInput.value}<span class="generating"> .....</span>`;

  console.log("generating poem");
  console.log(`Prompt: ${prompt}`);
  console.log(`Context: ${context}`);

  axios.get(apiUrl).then(displayPoem); // Make a  call to the API
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
