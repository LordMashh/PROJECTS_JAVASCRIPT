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

  
  translateBtn.addEventListener("click", async () => {
    const fromDropdown = document.querySelector(".from select");
  const toDropdown = document.querySelector(".to select");
  const fromLang = fromDropdown.value;
  const toLang = toDropdown.value;
  
  const inputText = document.querySelector(".from-text").value;
  const response = await translateText(inputText, fromLang, toLang);
  
  const parsedResponse = JSON.parse(response);
  const translatedText = parsedResponse.translatedText;

  // Display detected language and translated text
  const infoContainer = document.querySelector(".to-text");
  infoContainer.innerHTML = `
   ${translatedText}
  `;
  });
  
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