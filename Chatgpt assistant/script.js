const makeChatGPTCall = async (text, node) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${apikey}`);
  
      // set request payload
      const raw = JSON.stringify({
        model: "text-davinci-003",
        prompt: text,
        max_tokens: 2048,
        temperature: 0,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
      });
  
      // set request options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      // make the api call
      let response = await fetch("https://api.openai.com/v1/completions", requestOptions);
      response = await response.json();
      const { choices } = response;
  
      // remove the spaces from the reponse text
      const text =  choices[0].text.replace(/^\s+|\s+$/g, "");
      
      // populate the node with the response
      node.textContent = text;
    } catch (e) {
      console.error("Error while calling openai api", e);
    }
  };
  // helper function to debounce function calls
function debounce(func, delay) {
    let inDebounce;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
}

// debounced function call
const debouncedScrapText = debounce(scrapText, 1000);

// observe what the user is typing
window.addEventListener("keypress", debouncedScrapText);
  // regex to check the text is in the form "butler: command;"
const getTextParsed = (text) => {
    const parsed = /butler:(.*?)\;/gi.exec(text);
    return parsed ? parsed[1] : "";
};

// helper function to get the nodes, extract their text 
const getTextContentFromDOMElements = (nodes, textarea = false) => {
  if (!nodes || nodes.length === 0) {
    return null;
  }

  for (let node of nodes) {
    const value = textarea ? node.value : node.textContent;
    if (node && value) {
      const text = getTextParsed(value);
      if (text) return [node, text];
      else return null;
    }
  }
};

// function to find the text on active tab
const scrapText = () => {
  const ele = document.querySelectorAll('[contenteditable="true"]');
  const parsedValue = getTextContentFromDOMElements(ele);
  if (parsedValue) {
    const [node, text] = parsedValue;
    makeChatGPTCall(text, node);
}
}