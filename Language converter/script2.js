// Language list
const languages = {
  "af" : "Afrikaans",
  "ar" : "Arabic",
  "az" : "Azerbaijani",
  "be" : "Belarusian",
  "bg" : "Bulgarian",
  "bn" : "Bengali",
  "bs" : "Bosnian",
  "ca" : "Catalan",
  "ceb" : "Cebuano",
  "cs" : "Czech",
  "cy" : "Welsh",
  "da" : "Danish",
  "de" : "German",
  "el" : "Greek",
  "en" : "English",
  "eo" : "Esperanto",
  "es" : "Spanish",
  "et" : "Estonian",
  "eu" : "Basque",
  "fa" : "Persian",
  "fi" : "Finnish",
  "fr" : "French",
  "ga" : "Irish",
  "gl" : "Galician",
  "gu" : "Gujarati",
  "ha" : "Hausa",
  "hi" : "Hindi",
  "hmn" : "Hmong",
  "hr" : "Croatian",
  "ht" : "Haitian creole",
  "hu" : "Hungarian",
  "hy" : "Armenian",
  "id" : "Indonesian",
  "ig" : "Igbo",
  "is" : "Icelandic",
  "it" : "Italian",
  "iw" : "Hebrew",
  "ja" : "Japanese",
  "jw" : "Javanese",
  "ka" : "Georgian",
  "kk" : "Kazakh",
  "km" : "Khmer",
  "kn" : "Kannada",
  "ko" : "Korean",
  "la" : "Latin",
  "lo" : "Lao",
  "lt" : "Lithuanian",
  "lv" : "Latvian",
  "mg" : "Malagasy",
  "mi" : "Maori",
  "mk" : "Macedonian",
  "ml" : "Malayalam",
  "mn" : "Mongolian",
  "mr" : "Marathi",
  "ms" : "Malay",
  "mt" : "Maltese",
  "my" : "Myanmar (burmese)",
  "ne" : "Nepali",
  "nl" : "Dutch",
  "no" : "Norwegian",
  "ny" : "Chichewa",
  "pa" : "Punjabi",
  "pl" : "Polish",
  "pt" : "Portuguese",
  "ro" : "Romanian",
  "ru" : "Russian",
  "si" : "Sinhala",
  "sk" : "Slovak",
  "sl" : "Slovenian",
  "so" : "Somali",
  "sq" : "Albanian",
  "sr" : "Serbian",
  "st" : "Sesotho",
  "su" : "Sundanese",
  "sv" : "Swedish",
  "sw" : "Swahili",
  "ta" : "Tamil",
  "te" : "Telugu",
  "tg" : "Tajik",
  "th" : "Thai",
  "tl" : "Filipino",
  "tr" : "Turkish",
  "uk" : "Ukrainian",
  "ur" : "Urdu",
  "uz" : "Uzbek",
  "vi" : "Vietnamese",
  "yi" : "Yiddish",
  "yo" : "Yoruba",
  "zh" : "Chinese (simplified)",
  "zh _TW" :  "Chinese (traditional)",
  "zu" : "Zulu",
};

// API endpoint and headers
const apiUrl = "https://translate-all-languages.p.rapidapi.com/translate";
const apiHeaders = {
  "X-RapidAPI-Key": "4827f9c72emshb0fa9bb9ddf629bp1a89d7jsn7de384a702be",
  "X-RapidAPI-Host": "translate-all-languages.p.rapidapi.com",
};

// Function to perform translation
async function translateText(text, fromLang, toLang) {
  const queryParams = new URLSearchParams({
    toLang: toLang,
    text: encodeURIComponent(text),
    fromLang: fromLang,
  });

  const url = `${apiUrl}?${queryParams}`;

  const options = {
    method: "GET",
    headers: apiHeaders,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return "Translation error";
  }
}

// Function to update language dropdowns
function populateLanguageDropdowns() {
  const fromDropdown = document.querySelector(".from select");
  const toDropdown = document.querySelector(".to select");

  for (const code in languages) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = languages[code];

    fromDropdown.appendChild(option);
    
    // Clone the option element only for the 'to' dropdown and set Hindi as default
    if (code === "hi") {
      toDropdown.appendChild(option.cloneNode(true));
    }
  }

  // Set default languages
  const defaultFromLang = "en"; // English
  const defaultToLang = "hi";   // Hindi
  fromDropdown.value = defaultFromLang;
  toDropdown.value = defaultToLang;
}


// Function to perform translation and update result
async function performTranslation() {
  const fromDropdown = document.querySelector(".from select");
  const toDropdown = document.querySelector(".to select");
  const fromLang = fromDropdown.value;
  const toLang = toDropdown.value;
  
  const inputText = document.querySelector(".from-text").value;
  const response = await translateText(inputText, fromLang, toLang);
  
  const parsedResponse = JSON.parse(response);
  const detectedLanguageCode = parsedResponse.langDetect;
  const detectedLanguageName = languages[detectedLanguageCode];
  const translatedText = parsedResponse.translatedText;

  // Display detected language and translated text
  const infoContainer = document.querySelector(".to-text");
  infoContainer.innerHTML = `
    Detected language: ${detectedLanguageName}
    Translated text: ${translatedText}
  `;
}

// Event listener for translate button
const translateButton = document.querySelector("button");
translateButton.addEventListener("click", performTranslation);

// Initialize language dropdowns
populateLanguageDropdowns();

exchageIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (!fromText.value || !toText.value) return;
    if (target.getAttribute("name") == "copy-outline") {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } 
  });
});