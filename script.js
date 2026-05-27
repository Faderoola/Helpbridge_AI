const chatModal =
document.getElementById("chatModal");

const openChat =
document.getElementById("openChat");

const heroChat =
document.getElementById("heroChat");

const closeChat =
document.getElementById("closeChat");

const sendBtn =
document.getElementById("sendBtn");

const userInput =
document.getElementById("userInput");

const chatBox =
document.getElementById("chatBox");

const anonymousToggle =
document.getElementById("anonymousToggle");

const sampleQuestions =
document.querySelectorAll(".sample-question");

const themeToggle =
document.getElementById("themeToggle");

/* OPEN CHAT */

function openChatModal(){

  chatModal.style.display = "flex";

}

openChat.addEventListener(
  "click",
  openChatModal
);

heroChat.addEventListener(
  "click",
  openChatModal
);

/* CLOSE CHAT */

closeChat.addEventListener(
  "click",
  ()=>{

    chatModal.style.display =
    "none";

  }
);

/* CLICK OUTSIDE */

chatModal.addEventListener(
  "click",
  (e)=>{

    if(
      e.target === chatModal
    ){

      chatModal.style.display =
      "none";

    }

  }
);

/* SAMPLE QUESTIONS */

sampleQuestions.forEach((button)=>{

  button.addEventListener(
    "click",
    ()=>{

      userInput.value =
      button.innerText;

    }
  );

});

/* USER MESSAGE */

function addUserMessage(message){

  const div =
  document.createElement("div");

  div.classList.add(
    "user-message"
  );

  div.innerHTML = message;

  chatBox.appendChild(div);

  chatBox.scrollTop =
  chatBox.scrollHeight;

}

/* BOT MESSAGE */

function addBotMessage(
  message,
  urgency
){

  const div =
  document.createElement("div");

  div.classList.add(
    "bot-message"
  );

  let colorClass = "green";

  if(urgency === "Medium"){
    colorClass = "yellow";
  }

  if(urgency === "High"){
    colorClass = "red";
  }

  div.innerHTML = `
    <div class="tag ${colorClass}">
      ${urgency} Urgency
    </div>

    <div class="typing-text"></div>
  `;

  chatBox.appendChild(div);

  const typingText =
  div.querySelector(
    ".typing-text"
  );

  let index = 0;

  function type(){

    if(index <= message.length){

      typingText.innerHTML =
      message.slice(0,index);

      index++;

      setTimeout(type,8);

    }

  }

  type();

  chatBox.scrollTop =
  chatBox.scrollHeight;

}

/* AI RESPONSE */

function generateResponse(text){

  text = text.toLowerCase();

  if(
    text.includes("school") ||
    text.includes("bully")
  ){

    return{

      urgency:"Medium",

      response:`

      <h3>Situation Summary</h3>

      <p>
      This may involve
      bullying or school stress.
      </p>

      <br>

      <h3>Next Steps</h3>

      <p>

      • Speak to a trusted adult

      <br><br>

      • Document incidents safely

      <br><br>

      • Avoid unsafe confrontation

      </p>

      <br>

      <a
      href="https://www.stopbullying.gov/"
      target="_blank">
      StopBullying.gov
      </a>

      `

    };

  }

  else if(
    text.includes("stress") ||
    text.includes("anxiety")
  ){

    return{

      urgency:"Medium",

      response:`

      <h3>Situation Summary</h3>

      <p>
      This may involve
      emotional stress.
      </p>

      <br>

      <h3>Next Steps</h3>

      <p>

      • Rest properly

      <br><br>

      • Talk to someone trusted

      <br><br>

      • Reach out for support

      </p>

      <br>

      <a
      href="https://988lifeline.org/"
      target="_blank">
      988 Lifeline
      </a>

      `

    };

  }

  else if(
    text.includes("housing") ||
    text.includes("eviction")
  ){

    return{

      urgency:"High",

      response:`

      <h3>Situation Summary</h3>

      <p>
      This may involve
      housing instability.
      </p>

      <br>

      <h3>Next Steps</h3>

      <p>

      • Contact housing support

      <br><br>

      • Keep documents safe

      <br><br>

      • Reach out to trusted family

      </p>

      <br>

      <a
      href="https://www.hud.gov/"
      target="_blank">
      HUD.gov
      </a>

      `

    };

  }

  else{

    return{

      urgency:"Low",

      response:`

      <h3>Situation Summary</h3>

      <p>
      Thank you for sharing.
      HelpBridge AI is here
      to help you move from
      confusion to clarity.
      </p>

      `

    };

  }

}

/* SEND MESSAGE */

function sendMessage(){

  const message =
  userInput.value.trim();

  if(message === "")
  return;

  addUserMessage(message);

  userInput.value = "";

  if(
    !anonymousToggle.checked
  ){

    localStorage.setItem(
      "helpbridge_last_message",
      message
    );

  }

  const thinking =
  document.createElement("div");

  thinking.classList.add(
    "bot-message"
  );

  thinking.innerHTML = `
    <div class="typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  chatBox.appendChild(thinking);

  setTimeout(()=>{

    thinking.remove();

    const ai =
    generateResponse(message);

    addBotMessage(
      ai.response,
      ai.urgency
    );

  },1500);

}

sendBtn.addEventListener(
  "click",
  sendMessage
);

userInput.addEventListener(
  "keypress",
  (e)=>{

    if(e.key === "Enter"){
      sendMessage();
    }

  }
);

/* DARK MODE */

themeToggle.addEventListener(
    "click",
    ()=>{
  
      document.body.classList.toggle(
        "dark-mode"
      );
  
      if(
        document.body.classList.contains(
          "dark-mode"
        )
      ){
  
        themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';
  
      }
  
      else{
  
        themeToggle.innerHTML =
        '<i class="fa-solid fa-moon"></i>';
  
      }
  
    }
  );

/* LANGUAGE SWITCHER */

const languageSwitcher =
document.getElementById(
  "languageSwitcher"
);

const translations = {

  english:{
    hero:
    "Turn confusion into clear next steps. An empathetic assistant for the moments you don't know what to do.",
    learn:
    "Learn More →"
  },

  french:{
    hero:
    "Transformer la confusion en étapes claires.",
    learn:
    "En savoir plus →"
  },

  spanish:{
    hero:
    "Convierte la confusión en pasos claros.",
    learn:
    "Aprender más →"
  },

  yoruba:{
    hero:
    "Yi idamu pada si igbesẹ to ye.",
    learn:
    "Kọ diẹ sii →"
  },

  igbo:{
    hero:
    "Gbanwee mgbagwoju anya ka ọ bụrụ nzọụkwụ doro anya.",
    learn:
    "Mụtakwuo →"
  },

  hausa:{
    hero:
    "Mayar da rikicewa zuwa matakai masu kyau.",
    learn:
    "Ƙara Koyo →"
  }

};

languageSwitcher.addEventListener(
  "change",
  ()=>{

    const lang =
    languageSwitcher.value;

    document.querySelector(
      ".hero-text"
    ).innerHTML =

    translations[lang].hero;

    document.querySelector(
      ".secondary-btn"
    ).innerHTML =

    translations[lang].learn;

  }
);