(() => {
"use strict";

const TOTAL_SECONDS = 40 * 60;
const csv_url="https://docs.google.com/spreadsheets/d/e/2PACX-1vTl41VXZun8lo3NNY932yA4vuo0Z7ydXtLurgXLBMMDhEaqGr1fLNax40V0J8deUD7BbxvFoFPs9omX/pub?gid=0&single=true&output=csv";
const stages = [
  {
    title:"The Airlock",
    skill:"Addition & subtraction up to 1,000",
    time:"5 min",
    art:"🚀 🔐",
    story:[
      "The station's outer airlock is sealed.",
      "The access computer shows three readings: <strong>275</strong>, <strong>438</strong>, and <strong>196</strong>.",
      "Add the first two readings, then subtract the third. The result is the airlock code."
    ],
    answer:"517",
    hint:"Start with 275 + 438. Then subtract 196.",
    redHerring:"The airlock was last serviced 14 days ago."
  },
  {
    title:"The Supply Robot",
    skill:"Multiplication tables",
    time:"6 min",
    art:"🤖 📦",
    story:[
      "The airlock opens, but the supply robot is blocking the corridor.",
      "The robot has <strong>8 compartments</strong>. Each compartment contains <strong>24 energy cells</strong>.",
      "The robot's battery is at 63%, and it was built 4 years ago. Those details are not needed.",
      "How many energy cells are there altogether?"
    ],
    answer:"192",
    hint:"Think of 8 equal groups of 24: 8 × 24.",
    redHerring:"Battery: 63%. Robot age: 4 years."
  },
  {
    title:"The Reactor Fuel Room",
    skill:"Long division",
    time:"7 min",
    art:"⛽ ⚛️",
    story:[
      "The corridor leads to the reactor fuel room.",
      "The station has <strong>864 units of fuel</strong>. There are <strong>12 fuel tanks</strong>, and each tank must receive exactly the same amount.",
      "The tanks were inspected <strong>3 days ago</strong>. The fuel delivery system can move <strong>48 units per minute</strong>. Six emergency lights are running.",
      "Those extra numbers are distractions. How many units of fuel should be placed in each tank?"
    ],
    answer:"72",
    hint:"You need to share 864 equally between 12 tanks: 864 ÷ 12.",
    redHerring:"3 days, 48 units/minute, and 6 lights are irrelevant."
  },
  {
    title:"The Navigation Computer",
    skill:"Fractions & decimals",
    time:"7 min",
    art:"🧭 🌌",
    story:[
      "The reactor powers the navigation computer.",
      "A display says: <strong>Find 3/4 of 20 stars, then add 2.5.</strong>",
      "The screen also shows a course number of 1207 and a signal strength of 86%. Neither is part of the calculation.",
      "What number should be entered? Give the answer as a decimal."
    ],
    answer:"17.5",
    hint:"First find 3/4 of 20. Then add 2.5.",
    redHerring:"Course 1207 and signal strength 86% are irrelevant."
  },
  {
    title:"The Security System",
    skill:"Order of operations & percentages",
    time:"7 min",
    art:"⚠️ 🖥️",
    story:[
      "Navigation is online, but the security system has detected the team.",
      "The system gives one instruction:",
      "<strong>Calculate 36 ÷ 4 + 7. Then find 20% of the result. Finally, add that amount to 50.</strong>",
      "The alarm has sounded 3 times and the station has 200 rooms. These facts are not needed.",
      "What is the final security code?"
    ],
    answer:"53.2",
    hint:"Do 36 ÷ 4 first, then + 7. After that calculate 20% of the result, then add 50.",
    redHerring:"3 alarms and 200 rooms are irrelevant."
  },
  {
    title:"The Final Door",
    skill:"Mixed operations",
    time:"8 min",
    art:"🚪 🌍",
    story:[
      "The security system falls silent. One final door stands between you and freedom.",
      "The final computer gives four instructions:",
      "<strong>Start with 480. Subtract 125. Take 25% of the result. Multiply that answer by 4, then add 30.</strong>",
      "The door weighs 680 kg, has 4 hinges, and was installed 9 years ago. Ignore those details.",
      "Enter the final escape code."
    ],
    answer:"385",
    hint:"Work in the order given: 480 − 125, then 25%, then ×4, then +30.",
    redHerring:"680 kg, 4 hinges, and 9 years are irrelevant."
  }
];

const screen = document.getElementById("game-screen");
const progress = document.getElementById("progress");
const timerEl = document.getElementById("timer");

let stageIndex = -1;
let remaining = TOTAL_SECONDS;
let timerId = null;
let started = false;
let locked = false;

function formatTime(sec){
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function updateTimer(){
  timerEl.textContent = formatTime(remaining);
  timerEl.classList.toggle("warning", remaining <= 10 * 60 && remaining > 5 * 60);
  timerEl.classList.toggle("danger", remaining <= 5 * 60);
}

function renderProgress(){
  progress.innerHTML = "";
  for(let i=0;i<stages.length;i++){
    const el=document.createElement("span");
    el.className=i<stageIndex ? "done" : i===stageIndex ? "active" : "";
    el.setAttribute("aria-label",`Stage ${i+1}${i<stageIndex?" completed":i===stageIndex?" current":" locked"}`);
    progress.appendChild(el);
  }
}

function startClock(){
  if(timerId) return;
  timerId=setInterval(()=>{
    if(remaining<=0){
      clearInterval(timerId); timerId=null;
      showTimeUp();
      return;
    }
    remaining--;
    updateTimer();
  },1000);
}

function showIntro(){
  stageIndex=-1; renderProgress(); updateTimer();
  screen.innerHTML=`
    <div class="hero">
      <div class="scene-art" aria-hidden="true">🚀 🪐 🔐</div>
      <div class="kicker">CLASSIFIED MISSION</div>
      <h2>Escape from the Secret Space Station</h2>
      <p>Your team has boarded an abandoned research station. The station has entered lockdown and will seal itself permanently in <strong>40 minutes</strong>.</p>
      <p>Six security systems stand between you and freedom. Read carefully, ignore information that does not matter, solve the mathematics, and use each answer as the next access code.</p>
      <div class="intro-grid">
        <div class="stat"><b>6</b><span>mathematical challenges</span></div>
        <div class="stat"><b>40 min</b><span>total mission time</span></div>
        <div class="stat"><b>7 skills</b><span>from arithmetic to percentages</span></div>
      </div>
      <div class="actions">
        <button class="primary" id="start">START MISSION</button>
      </div>
      <p class="small">Recommended: teams of 2–4 children. One person can enter the code while the team checks the calculation.</p>
    </div>`;
  document.getElementById("start").addEventListener("click",()=>{
    if(started) return;
    started=true; stageIndex=0; startClock(); renderStage();
  });
}

function renderStage(){
  locked=false; renderProgress();
  const s=stages[stageIndex];
  screen.innerHTML=`
    <div class="panel">
      <div class="panel-head">
        <div>
          <div class="skill">STAGE ${stageIndex+1} OF 6 · ${s.skill}</div>
          <h2>${s.title}</h2>
        </div>
        <div class="stage-time">Suggested time: ${s.time}</div>
      </div>
      <div class="scene-art" aria-label="Scene illustration">${s.art}</div>
      <div class="story">${s.story.map(p=>`<p>${p}</p>`).join("")}</div>
      <div class="data-card"><span class="lock">🔒 ACCESS CODE REQUIRED</span><p><strong>Ignore the red herrings.</strong> Only use information that is needed to answer the question.</p></div>
      <form id="answer-form">
        <label for="answer"><strong>Enter your answer:</strong></label>
        <div class="code-row" style="margin-top:10px">
          <input id="answer" inputmode="decimal" autocomplete="off" aria-describedby="feedback" />
          <button class="primary" type="submit">UNLOCK</button>
          <button class="hint" type="button" id="hint">SHOW HINT</button>
        </div>
        <div id="feedback" class="feedback" aria-live="assertive"></div>
      </form>
      <div class="teacher">
        <details>
          <summary>Teacher controls</summary>
          <div class="actions">
            <button type="button" id="restart">Restart mission</button>
            <button type="button" id="reveal">Reveal answer</button>
          </div>
        </details>
      </div>
    </div>`;
  document.getElementById("answer").focus();
  document.getElementById("answer-form").addEventListener("submit",checkAnswer);
  document.getElementById("hint").addEventListener("click",()=>{
    const button = document.getElementById("hint");
    const f = document.getElementById("feedback");
    const visible = button.dataset.visible === "true";

    if(visible){
      f.className="feedback";
      f.textContent="";
      button.textContent="SHOW HINT";
      button.dataset.visible="false";
    }else{
      f.className="feedback hint-text";
      f.textContent="💡 "+s.hint;
      button.textContent="HIDE HINT";
      button.dataset.visible="true";
    }
  });
  document.getElementById("restart").addEventListener("click",restart);
  document.getElementById("reveal").addEventListener("click",()=>{
    const f=document.getElementById("feedback");
    f.className="feedback hint-text"; f.textContent=`Teacher answer: ${s.answer}`;
  });
}

function normalize(v){
  return String(v).trim().replace(",",".").replace(/\s+/g,"");
}

function checkAnswer(e){
  e.preventDefault();
  if(locked || remaining<=0) return;
  const input=document.getElementById("answer");
  const f=document.getElementById("feedback");
  const value=normalize(input.value);
  if(!value){
    f.className="feedback bad"; f.textContent="Please enter a code.";
    return;
  }
  if(value===safely(stages[stageIndex].answer)){
    locked=true; f.className="feedback good"; f.textContent="✓ ACCESS CODE ACCEPTED";
    setTimeout(()=>{
      if(stageIndex===stages.length-1) finish();
      else { stageIndex++; renderStage(); }
    },900);
  }else{
    f.className="feedback bad"; f.textContent="✕ Access denied. Check the calculation and try again.";
    input.select();
  }
}

function safely(v){ return String(v).replace(",","."); }

function finish(){
  clearInterval(timerId); timerId=null; renderProgress();
  screen.innerHTML=`
    <div class="hero success">
      <div class="scene-art" aria-hidden="true">🎉 🚀 🌍</div>
      <div class="kicker">MISSION COMPLETE</div>
      <h2>YOU ESCAPED!</h2>
      <p>The final lock clicks open. The station's emergency lights turn green and the escape pod powers up.</p>
      <p><strong>Your team solved all six mathematical security systems.</strong></p>
      <div class="data-card">
        <strong>Time remaining: ${formatTime(remaining)}</strong>
      </div>
      <div class="actions">
        <button class="primary" id="again">PLAY AGAIN</button>
      </div>
    </div>`;
  document.getElementById("again").addEventListener("click",restart);
}

function showTimeUp(){
  screen.innerHTML=`
    <div class="hero">
      <div class="scene-art" aria-hidden="true">⏰ 🚨 🔒</div>
      <div class="kicker">LOCKDOWN</div>
      <h2>TIME IS UP</h2>
      <p>The station has entered permanent lockdown.</p>
      <p>Ask the mission controller to restart the mission and try again.</p>
      <div class="actions"><button class="primary" id="restart">RESTART MISSION</button></div>
    </div>`;
  document.getElementById("restart").addEventListener("click",restart);
}

function restart(){
  clearInterval(timerId); timerId=null;
  remaining=TOTAL_SECONDS; started=false; stageIndex=-1; locked=false;
  showIntro();
}

showIntro();
})();