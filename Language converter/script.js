const languages = {
  "af": "Afrikaans",
  "sq": "Albanian",
  "am":"Amharic",
  "ar":"Arabic",
  "hy":"Armenian",
  "az":"Azerbaijani",
  "eu":"Basque",
  "be":"Belarusian",
  "bn":"Bengali",
  "bs":"Bosnian",
  "bg":"Bulgarian",
  "ca":"Catalan",
  "ceb":"Cebuano",
  "ny":"Chichewa",
  "zh-CN":"Chinese (Simplified)",
  "zh-TW":"Chinese (Traditional)",
  "co":"Corsican",
  "hr":"Croatian",
  "cs":"Czech",
  "da":"Danish",
  "nl":"Dutch",
  "en":"English",
  "eo":"Esperanto",
  "et":"Estonian",
  "tl":"Filipino",
  "fi":"Finnish",
  "fr":"French",
  "fy":"Frisian",
  "gl":"Galician",
  "ka":"Georgian",
  "de":"German",
  "el":"Greek",
  "gu":"Gujarati",
  "ht":"Haitian Creole",
  "ha":"Hausa",
  "haw":"Hawaiian",
  "iw":"Hebrew",
  "hi":"Hindi",
  "hmn":"Hmong",
  "hu":"Hungarian",
  "is":"Icelandic",
  "ig":"Igbo",
  "id":"Indonesian",
  "ga":"Irish",
  "it":"Italian",
  "ja":"Japanese",
  "jw":"Javanese",
  "kn":"Kannada",
  "kk":"Kazakh",
  "km":"Khmer",
  "rw":"Kinyarwanda",
  "ko":"Korean",
  "ku":"Kurdish (Kurmanji)",
  "ky":"Kyrgyz",
  "lo":"Lao",
  "la":"Latin",
  "lv":"Latvian",
  "lt":"Lithuanian",
  "lb":"Luxembourgish", 
  "mk":"Macedonian",
  "mg":"Malagasy",
  "ms":"Malay",
  "ml":"Malayalam",
  "mt":"Maltese",
  "mi":"Maori",
  "mr":"Marathi",
  "mn":"Mongolian",
  "my":"Myanmar (Burmese)",
  "ne":"Nepali",
  "no":"Norwegian",
  "or":"Odia (Oriya)",
  "ps":"Pashto",
  "fa":"Persian",
  "pl":"Polish",
  "pt":"Portuguese",
  "pa":"Punjabi",
  "ro":"Romanian",
  "ru":"Russian",
  "sm":"Samoan",
  "gd":"Scots Gaelic",
  "sr":"Serbian",
  "st":"Sesotho",
  "sn":"Shona",
  "sd":"Sindhi",
  "si":"Sinhala",
  "sk":"Slovak",
  "sl":"Slovenian",
  "so":"Somali",
  "es":"Spanish",
  "su":"Sundanese",
  "sw":"Swahili",
  "sv":"Swedish",
  "tg":"Tajik",
  "ta":"Tamil",
  "tt":"Tatar",
  "te":"Telugu",
  "th":"Thai",
  "tr":"Turkish",
  "tk":"Turkmen",
  "uk":"Ukrainian",
  "ur":"Urdu",
  "ug":"Uyghur",
  "uz":"Uzbek",
  "vi":"Vietnamese",
  "cy":"Welsh",
  "xh":"Xhosa",
  "yi":"Yiddish",
  "yo":"Yoruba",
  "zu":"Zulu",
  "he":"Hebrew",
  "zh":"Chinese (Simplified)",
};

const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchageIcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row ion-icon");
(translateBtn = document.querySelector("button")),
  selectTag.forEach((tag, id) => {
    for (let lang_code in languages) {
      let selected =
        id == 0
          ? lang_code == "en"
            ? "selected"
            : ""
          : lang_code == "hi"
          ? "selected"
          : "";
      let option = `<option ${selected} value="${lang_code}">${languages[lang_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
    }
  });

fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});
const apiUrl = "https://text-translator2.p.rapidapi.com/translate";
const apiHeaders = {
  'content-type': 'application/x-www-form-urlencoded',
  'X-RapidAPI-Key': '4827f9c72emshb0fa9bb9ddf629bp1a89d7jsn7de384a702be',
  'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
};

// Function to perform translation
async function translateText(text, fromLang, toLang) {
const queryParams = new URLSearchParams({
  target_language: toLang,
  text: text,
  source_language: fromLang,
});

const url = `${apiUrl}?${queryParams}`;

const options = {
  method: "POST",
  headers: apiHeaders,
  body: queryParams,
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

// Create a function to perform translation
async function performTranslation() {
  const fromDropdown = document.querySelector(".from select");
  const toDropdown = document.querySelector(".to select");
  const fromLang = fromDropdown.value;
  const toLang = toDropdown.value;

  const inputText = document.querySelector(".from-text").value;

  try {
    // Display loading state
    let infoContainer = document.querySelector(".to-text");
    infoContainer.innerText = "Translating...";

    const response = await translateText(inputText, fromLang, toLang);
    const parsedResponse = JSON.parse(response);
    const translatedText = parsedResponse.data.translatedText;
    console.log(translatedText);

    // Display translated text
    infoContainer.innerText = translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    // Display error message to the user
    const infoContainer = document.querySelector(".to-text");
    infoContainer.innerText = "Translation error";
  }
}

translateBtn.addEventListener("click", performTranslation);

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    const fromText = document.querySelector(".from-text");
    const toText = document.querySelector(".to-text");

    if (!fromText.value || !toText.value) return;

    if (target.getAttribute("name") === "copy-outline") {
      const textToCopy = target.id === "from" ? fromText.value : toText.value;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log("Text copied to clipboard:", textToCopy);
        })
        .catch((error) => {
          console.error("Error copying text:", error);
        });
    }
  });
});