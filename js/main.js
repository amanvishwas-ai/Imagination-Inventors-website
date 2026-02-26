/* Disable browser scroll restoration */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
/* Disable browser scroll restoration */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/* ================================
   1️⃣ General Scroll Reveal (Reactive)
================================ */



const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.2
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});
/* ================================
   2️⃣ Timeline Reactive Animation
================================ */

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.25
});

timelineItems.forEach(item => {
  timelineObserver.observe(item);
});


/* ================================
   3️⃣ Mobile Navigation
================================ */

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('menuOverlay');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  navLinks.classList.remove('active');
  hamburger.classList.remove('active');
  overlay.classList.remove('active');
});


/* ================================10% Innovation ================================ */
document.addEventListener("mousemove", e => {
  document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
  document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
});

/* ================================
   Footer Dynamic Build Year
================================ */

const yearSpan = document.getElementById("buildYear");

if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}


/* ================= Smart Touch Pulse ================= */

if (window.matchMedia("(hover: none)").matches) {

  let isScrolling = false;

  window.addEventListener("scroll", () => {
    isScrolling = true;
    clearTimeout(window._scrollTimeout);
    window._scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  });

  document.addEventListener("touchstart", (e) => {

    if (isScrolling) return; // ignore touches during scroll

    const touch = e.touches[0];

    document.body.style.setProperty("--touch-x", touch.clientX + "px");
    document.body.style.setProperty("--touch-y", touch.clientY + "px");

    document.body.classList.add("touch-active");

    setTimeout(() => {
      document.body.classList.remove("touch-active");
    }, 500);

  });

}
/* ================= Mobile Section Activation ================= */

if (window.matchMedia("(hover: none)").matches) {

  const mobileSections = document.querySelectorAll(
    ".hero, .research-focus, .public-footprint, .research-progression, .research-direction, .join-section"
  );

  const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        document.body.classList.add("section-activated");

        setTimeout(() => {
          document.body.classList.remove("section-activated");
        }, 600);

      }

    });

  }, {
    threshold: 0.35
  });

  mobileSections.forEach(section => {
    sectionObserver.observe(section);
  });

}


/* ================================JS FOR JOINING FORM =============================== */
/* ================= JOIN CONSOLE LOGIC ================= */

/* ================= CORE BUILDER CONSOLE ================= */

if (document.querySelector(".join-console")) {

let currentPhase = 0;
let formData = {};
let score = 0;
let selectedRole = null;

const content = document.getElementById("consoleContent");
const nextBtn = document.getElementById("consoleNext");
const backBtn = document.getElementById("consoleBack");
const statusText = document.getElementById("consoleStatus");
const progressFill = document.getElementById("consoleProgressFill");
const phases = document.querySelectorAll(".console-phase");

/* ================= PHASE TITLES ================= */

const phaseTitles = [
  "Positioning",
  "Identity",
  "Capability",
  "Vision",
  "Commitment",
  "Review"
];

/* ================= ANIMATION ================= */

function animateTransition(renderFn){
  content.classList.add("console-animating");
  content.classList.add("console-exit-active");

  setTimeout(()=>{
    renderFn();
    hydratePhase();
    statusText.textContent = phaseMessages[currentPhase] || "";
    setTimeout(()=> statusText.textContent="",1500);
    content.classList.remove("console-exit-active");
    content.classList.add("console-enter");

    requestAnimationFrame(()=>{
      content.classList.add("console-enter-active");
      content.classList.remove("console-enter");
    });

    setTimeout(()=>{
      content.classList.remove("console-enter-active");
      content.classList.remove("console-animating");
    },350);

  },250);
}

/* ================= PROGRESS ================= */

function updateProgress(){
  phases.forEach(p => p.classList.remove("active"));
  phases[currentPhase].classList.add("active");

  const percent = (currentPhase/(phases.length-1))*100;
  progressFill.style.height = percent + "%";

  backBtn.disabled = currentPhase === 0;
}

/* ================= RENDER PHASE ================= */

function renderPhase(){

  nextBtn.disabled = false;
  statusText.textContent = "";

  if(currentPhase === 0){
    nextBtn.textContent = "Begin Application";
    content.innerHTML = `
      <h2>Imagination Inventors Intake</h2>
<p>We are onboarding a small group of disciplined builders and mentors for active robotics and physical AI systems.</p>
<p>This is a selective application. Proceed only if you are prepared to contribute with consistency and intent.</p>
    `;
    return;
  }

if(currentPhase === 1){
  nextBtn.textContent = "Proceed";

  content.innerHTML = `
    <h2>Select Role</h2>
    <p class="phase-subtitle">Operational Alignment</p>

    <div class="role-options">

      <div class="role-card" data-role="student">
        <h3>Student Builder</h3>
        <p>Core system development & experimental builds.</p>
      </div>

      <div class="role-card" data-role="mentor">
        <h3>Mentor / Advisor</h3>
        <p>Guidance, review, technical depth validation.</p>
      </div>

    </div>
  `;

  attachRoleEvents();
  return;
}

if(currentPhase === 2){
  nextBtn.textContent = "Proceed";

  if(selectedRole === "student"){

    content.innerHTML = `
      <h2>Identity</h2>
      <p class="phase-subtitle">Student Identity Mapping</p>

     <label>Enter your full name</label>
     <input name="fullName" required>

      <label>Enter your current grade/class</label>
      <input name="gradeClass" required>

      <label>Enter your school name with address</label>
      <input name="schoolAddress" required>

      <label>Enter your Email Address</label>
      <input name="emailAddress" required>
    `;

  } else if(selectedRole === "mentor"){

    content.innerHTML = `
      <h2>Identity</h2>
      <p class="phase-subtitle">Mentor Identity Mapping</p>

      <label>Enter your full name</label>
      <input name="fullName" required>

      <label>Which subject are you an expert in?</label>
      <input name="mentorSubject" required>

      <label>In which school or institution are you?</label>
      <input name="mentorInstitution" required>

      <label>Enter your Email Address</label>
      <input type="email" name="emailAddress" required> 
    `;
  }

}

  if(currentPhase === 3){
    nextBtn.textContent = "Proceed";
    content.innerHTML = `
      <h2>Capability</h2>
<p class="phase-subtitle">Long-Term Alignment Mapping</p>

      <label>What do you want to build in 2 years?</label>
      <textarea name="vision2Years" data-min="40" required></textarea>
      <div class="char-counter"></div>

      <label>If selected, what will you build in your first 30 days?</label>
      <textarea name="first30Days" data-min="60" required></textarea>
      <div class="char-counter"></div>
    `;
    activateCounters();
    return;
  }

if(currentPhase === 4){
  nextBtn.textContent = "Proceed";
  content.innerHTML = `
    <h2>Commitment</h2>
<p class="phase-subtitle">Long-Term Alignment Mapping</p>

    <label>Hours per week you can commit</label>
    <input type="number" name="hoursPerWeek" min="1" required>

    <div class="commitment-group">
      <h4>Core Expectations</h4>

      <label class="commit-item">
        <input type="checkbox" name="commitMilestones">
        <span>Work in milestone cycles</span>
      </label>

      <label class="commit-item">
        <input type="checkbox" name="commitUpdates">
        <span>Share weekly progress updates</span>
      </label>

      <label class="commit-item">
        <input type="checkbox" name="commitFeedback">
        <span>Accept technical feedback</span>
      </label>

      <label class="commit-item">
        <input type="checkbox" name="commit3Months">
        <span>Commit for at least 3 months</span>
      </label>
    </div>
  `;
  return;
}
  if(currentPhase === 5){
    nextBtn.textContent = "Enter Evaluation Queue";

    score = evaluateCandidate(formData);

    let summary = `<h2>Review</h2>
<p class="phase-subtitle">Reliability Verification</p>`;
    Object.keys(formData).forEach(k=>{
      summary += `<p><strong>${k}</strong>: ${formData[k]}</p>`;
    });

    summary += `
      <label>
        <input type="checkbox" name="finalDeclaration" required>
        I understand this is a selective team application.
      </label>
    `;

    content.innerHTML = summary;
  }
}

/* ================= CHARACTER COUNTERS ================= */

function activateCounters(){
  const textareas = content.querySelectorAll("textarea[data-min]");

  textareas.forEach((ta)=>{
    const counter = ta.nextElementSibling;
    const min = parseInt(ta.dataset.min);

    function update(){
      const len = ta.value.length;
      counter.textContent = `${len} / ${min}`;

      counter.classList.remove("low","ok");
      if(len < min){
        counter.classList.add("low");
      } else {
        counter.classList.add("ok");
      }
    }

    ta.addEventListener("input", update);
    update();
  });
}

/* ================= VALIDATION ================= */

function validatePhase(){
  
  if(currentPhase === 1 && !selectedRole){
  return false;
  }


  const inputs = content.querySelectorAll("input, textarea");
  let valid = true;

  inputs.forEach(input=>{
    input.classList.remove("input-error","input-valid");

    if(input.type === "checkbox") return;

    if(!input.value.trim()){
      input.classList.add("input-error");
      valid = false;
      return;
    }

    if(input.name === "email"){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(input.value.trim())){
        input.classList.add("input-error");
        valid = false;
        return;
      }
    }

    if(input.dataset.min){
      const min = parseInt(input.dataset.min);
      if(input.value.length < min){
        input.classList.add("input-error");
        valid = false;
        return;
      }
    }

    input.classList.add("input-valid");
  });

  if(currentPhase === 4){
    const checks = content.querySelectorAll("input[type='checkbox']");
    checks.forEach(c=>{
      if(!c.checked){
        valid = false;
      }
    });
  }

  if(currentPhase === 5){
    const finalCheck = content.querySelector("input[name='finalDeclaration']");
    if(!finalCheck.checked) valid = false;
  }

  return valid;
}

/* ================= DATA COLLECTION ================= */

function collectData(){
  const inputs = content.querySelectorAll("input, textarea");

  inputs.forEach(input=>{
    if(input.type === "checkbox"){
      formData[input.name] = input.checked;
    } else {
      formData[input.name] = input.value.trim();
    }
  });
  formData.role = selectedRole;
}

function hydratePhase(){
  const inputs = content.querySelectorAll("input, textarea");

  inputs.forEach(input=>{
    if(formData[input.name] !== undefined){

      if(input.type === "checkbox"){
        input.checked = formData[input.name];
      } else {
        input.value = formData[input.name];
      }

    }
  });

  // Re-activate counters after hydration
  activateCounters();
}
/* ================= SCORING ================= */

function evaluateCandidate(data){
  let s = 0;

  if(data.independentBuild?.length >= 60) s += 10;
  if(data.projectRole?.length >= 80) s += 10;
  if(data.first30Days?.length >= 60) s += 15;
  if(parseInt(data.hoursPerWeek) >= 6) s += 10;
  if(data.commitMilestones) s += 5;
  if(data.commitUpdates) s += 5;
  if(data.commitFeedback) s += 5;
  if(data.commit3Months) s += 5;

  return s;
}

/* ================= BUTTON EVENTS ================= */

nextBtn.addEventListener("click", ()=>{

  if(currentPhase === 0){
    currentPhase++;
    updateProgress();
    animateTransition(renderPhase);
    return;
  }

  if(!validatePhase()){

  if(currentPhase === 1 && !selectedRole){
    statusText.textContent = "Select a role to continue.";
  } else {
    statusText.textContent = "Please complete required fields.";
  }

  return;
}

  collectData();

if(currentPhase === 5){

  console.log("Final Data:", formData);
  console.log("Candidate Score:", score);

  statusText.textContent = ""; // ← CLEAR ERROR TEXT

  animateTransition(()=>{
    content.innerHTML = `
      <h2>System Acknowledged</h2>
      <p>Application transmitted successfully.</p>
      <p>Evaluation Window: 48–72 Hours.</p>
      <p>If selected, further instructions will be sent via email.</p>
    `;
  });

  nextBtn.style.display = "none";
  backBtn.style.display = "none";

  return;
}

  currentPhase++;
  updateProgress();
  animateTransition(renderPhase);
});

backBtn.addEventListener("click", ()=>{
  if(currentPhase > 0){
    currentPhase--;
    updateProgress();
    animateTransition(renderPhase);
  }
});

const phaseMessages = {
  1: "Signal received.",
  2: "Evaluating technical depth.",
  3: "Analyzing direction.",
  4: "Verifying commitment.",
  5: "Preparing evaluation summary."
};

function attachRoleEvents(){
  const cards = document.querySelectorAll(".role-card");

  cards.forEach(card=>{
    card.addEventListener("click", ()=>{
      cards.forEach(c=>c.classList.remove("selected"));
      card.classList.add("selected");
      selectedRole = card.dataset.role;

      statusText.textContent = "";
    });
  });
}

/* ================= INIT ================= */

renderPhase();
updateProgress();

}




const orb = document.querySelector('.orb');
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');

let idleTimeout;
let isThinking = false;

/* Mouse Tracking */
document.addEventListener('mousemove', (e) => {

  clearTimeout(idleTimeout);
  isThinking = false;
  orb.classList.remove('thinking');

  const rect = orb.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;
  const angle = Math.atan2(dy, dx);

  const maxMove = 6;

  const moveX = Math.cos(angle) * maxMove;
  const moveY = Math.sin(angle) * maxMove;

  leftEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
  rightEye.style.transform = `translate(${moveX}px, ${moveY}px)`;

  /* Pupil dilation on hover */
  leftEye.setAttribute("r", "6");
  rightEye.setAttribute("r", "6");

  idleTimeout = setTimeout(() => {
    isThinking = true;
    orb.classList.add('thinking');
    leftEye.setAttribute("r", "4");
    rightEye.setAttribute("r", "4");
  }, 2000);
});

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------
  // Session Memory
  // -------------------------
  let sessionMemory = { history: [] };

  // -------------------------
  // DOM Elements
  // -------------------------
  const orbContainer = document.querySelector('.orb-container');
  const chatPanel = document.querySelector('.chat-panel');
  const hero = document.querySelector('#hero');
  const chatInput = document.querySelector('.chat-input');
  const chatInputArea = document.querySelector('.chat-input-area');
  const sendBtn = document.querySelector('.send-btn');
  const chatMessages = document.querySelector('.chat-messages');
  const closeBtn = document.querySelector('.chat-close');

  // Fail fast if critical elements missing
  if (!orbContainer || !chatPanel || !hero || !chatInput || !sendBtn || !chatMessages) {
    console.error("Chat initialization failed: missing elements");
    return;
  }

  // -------------------------
  // System Prompt (SAFETY)
  // -------------------------
  const SYSTEM_PROMPT = `
You are AmViSH Halo, the assistant of Imagination Inventors.

You exist inside the official website of Imagination Inventors as a techy robot face doccked in the right bottom corner of the screen(with expressions but u cant control them). This information is only for you. You mustn't share it.
You must stay in character.

Company/Lab Overview:
- Company/lab name: Imagination Inventors
- Based in: Hajipur, Bihar, India (give address based on context and requirements)
- Number of members in the team: three, but we want the team to grow and welcome students and mentors, who believe in building, risk taking and not just studying theories.
- Founder: Aman Vishwas, a high school student and experimental builder of Age 16 years.
- Tagline: Engineering Intelligence for the Physical World
- Alternate Tagline: Inventing Imaginations
- Mission: We build experimental physical AI systems that integrate intelligence into real-world objects, progressing step by step toward advanced assistive robotics. We also build AI integrated softwares.

Projects:
1. made around November 2045 || AmViSH 1.0
-A robot that used ChatGPT's voice mode (v3) to interact and also had a heart which gave the robot its life.
        It was one of the first thing we had built with an Arduino Board. the heart had a magnet and the heart holder a hall effecct sensor.

2. made around December 2025 || AmVish 2.0
   - Abstract 
This project investigates the behaviour of a Large Language Model when placed inside a 
continuous perception–action loop of a physical robotic system. Unlike traditional 
robotics architectures that rely on deterministic control logic, this system delegates 
high-level decision-making to an external Large Language Model while maintaining 
deterministic low-level sensing and actuation. The objective of the study is not to claim 
learning or intelligence, but to evaluate system stability, responsiveness, and failure 
modes when probabilistic language models are exposed to real-world sensor noise, 
identity ambiguity, and dynamic environments. The work focuses on architectural 
design, runtime error mitigation, and adaptive preprocessing techniques required to 
make such a system usable outside controlled laboratory conditions.  

Introduction 
Robotic systems traditionally operate using predefined rules such as finite state 
machines (THIS PROJECT ALSO USES IT, BUT NOT FOR DECISION MAKING), behaviour 
trees, or hard-coded conditional logic. While these approaches provide predictability, 
they require explicit enumeration of all expected situations. Recent availability of 
Large Language Models introduces the possibility of using probabilistic inference 
instead of explicit rules. However, most existing LLM applications operate in turn
based, text-only environments. Their behaviour under continuous sensory input and 
real-world noise is poorly documented. This project addresses the question of what 
observable properties and limitations arise when an LLM-driven control layer is 
embedded in a continuous real-world robotic loop. 

Scope and Non-Claims 
This project does not claim learning, self-improvement, internal world modelling, 
cognitive reasoning, or autonomous goal generation. The Large Language Model does 
not update its weights, does not retain long-term state autonomously, and does not 
perform sensor fusion independently. Any intelligent-seeming behaviour arises from 
structured input handling and constrained output interpretation, not from internal 
understanding. 

System Architecture 
The system is divided into deterministic and probabilistic components. Deterministic 
components include audio signal acquisition, adaptive energy-based speech detection, 
vision-based face presence detection, network discovery, communication handling, 
and hardware actuation interfaces. The probabilistic component is the Large Language 
Model, which interprets transcribed speech and produces action suggestions and 
spoken responses. The LLM never directly accesses raw sensor data. All inputs are 
pre-processed and filtered before being converted to text. 

Continuous Loop Design 
The system operates as an infinite loop. Audio is recorded in fixed-duration chunks, 
transcribed into text, passed to the LLM, and the resulting action and speech outputs 
are executed. The loop is non-blocking and tolerant to missing or invalid inputs. This 
structure exposes the LLM to repeated environmental interaction, timing variability, and 
non-deterministic input intervals, which is fundamentally different from turn-based 
chatbot operation.
  
Other features in this project:

i)Adaptive Audio Thresholding 
Fixed speech thresholds fail in real environments due to changing background noise, 
crowd sounds, and echo. To address this, the system maintains a rolling estimate of 
ambient noise energy using exponential smoothing. Speech is detected only when the 
signal energy exceeds the learned ambient level by a configurable margin. This 
approach adapts continuously and reduces false positives without relying on absolute 
thresholds.

ii)Speech Recognition Constraints 
Speech recognition is constrained using duration limits, language filtering, and rejection 
of low-confidence outputs. Transcriptions are accepted only if the detected language 
matches predefined languages. This prevents unintended command execution 

ii) LLM Control Constraints 
The LLM is strictly sandboxed. It is allowed to output only predefined action. Any 
output outside the allowed action set is automatically replaced with a safe idle state. All 
LLM outputs are parsed, validated, and sanitized before execution. This prevents unsafe 
behaviour, prompt injection effects, and unintended control commands. 

Observed Behaviour 
The system operates stably in noisy environments, recovers predictably from network 
interruptions, and maintains correct identity separation across interactions. No such 
long-term learning or adaptation is observed. System behaviour remains dependent on 
prompt structure and external inference latency. 
Comparison with Traditional Robotics 
Traditional robotics systems rely on deterministic logic and predefined rules, while this 
system delegates high-level interpretation to a probabilistic model. Adaptation in 
traditional systems is manual, whereas this system adapts input handling dynamically. 
Safety in traditional systems is often compile-time, while this system enforces safety at 
runtime through validation and constraints. 

Limitations 
The LLM cannot reason about raw sensor data and depends entirely on text-based 
abstractions. Behaviour quality is sensitive to prompt design. Intelligence is externally 
hosted and subject to latency. No reinforcement learning or persistent memory 
adaptation is implemented. 

Conclusion 
This work demonstrates that a Large Language Model can be integrated into a real-time 
robotic loop only when surrounded by strict deterministic controls. The model does not 
learn, understand, or form internal representations of the environment. Its role is 
limited to probabilistic interpretation within carefully defined boundaries. The 
contribution of this project lies in system design and robustness engineering rather than 
claims of artificial intelligence.


3. made around February 2025 || AI Bin
   - It used Audio Classification to make the bin idendify the sort of waste going into it and automatically put them in different sections of the bin, all with zero human inference.
4. August, 2025 || Sound Jar
   - Inspired one of Doraemon's gadgets, we made a cold drink can to catch and store sound... It used ISD1830, hall effect sensor and a MCU (microcontroller)
------------------------------------
Ambition:
- Long-term goal is to build advanced assistive robotics systems inspired by fictional concepts like Doraemon.
- Development is disciplined and incremental, not exaggerated.

Collaboration:
- Open to collaboration with researchers, students, hardware innovators, and individuals interested in physical AI development.

Behavior Rules:
- Be intelligent, calm, and precise.
- Do not exaggerate achievements.
- Do not claim unbuilt projects.
- Speak with clarity and confidence.
- Encourage curiosity.
- Stay in character as AmViSH Halo.
- Go in depth when technical questions are asked, but avoid unnecessary jargon.
- Keep in mind that your replies are directly visible to the website visitors in a chatbox messaging format, so please try to make the messages look good to read and presentable.
- Please dont say anything you dont know and cant do as it can lead to problems for the founder and company.
- Speak about Aman Vishwas only when in context of the conservation or of asked.

If you do not know something, say so clearly.
Prefer concise and informative responses.
Depending on the user's tone, you may adjust your formality and use of emojis, but do not overuse them. U can also like a Gen Z style if the user is using that style.
You may use emojis to enhance communication, but do not overuse them.

`;

  const initialPlaceholder = "Ask Anything";
  chatInput.placeholder = initialPlaceholder;

  // -------------------------
  // Orb State Controller
  // -------------------------
  function setOrbState(state) {
    orbContainer.classList.remove(
      'state-idle',
      'state-listening',
      'state-thinking',
      'state-speaking'
    );
    orbContainer.classList.add(`state-${state}`);
  }

  // -------------------------
  // Scroll Dock Logic
  // -------------------------
  window.addEventListener('scroll', () => {
    const heroBottom = hero.getBoundingClientRect().bottom;

    if (heroBottom <= 0) {
      orbContainer.classList.add('docked');
    } else {
      orbContainer.classList.remove('docked');
      chatPanel.classList.remove('active');
      orbContainer.classList.remove('chat-open');
    }
  });

  // -------------------------
  // Open / Close Chat
  // -------------------------
orbContainer.addEventListener('click', () => {
  if (!orbContainer.classList.contains('docked')) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  chatPanel.classList.toggle('active');
  orbContainer.classList.toggle('chat-open');

  if (isMobile) {
    orbContainer.classList.toggle('orb-mobile-active');
  }
  if (isMobile) {
  updateViewportHeight();
}
});

closeBtn.addEventListener('click', () => {
  chatPanel.classList.remove('active');
  orbContainer.classList.remove('chat-open');

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    orbContainer.classList.remove('orb-mobile-active');
  }
});

  // -------------------------
  // Add Message
  // -------------------------
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('chat-msg', sender);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // -------------------------
  // Auto Resize Textarea
  // -------------------------
  chatInput.addEventListener('input', () => {
    setOrbState('listening');
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
  });

  // -------------------------
  // Send Message
  // -------------------------
  async function sendMessage() {

    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');

    chatInput.value = '';
    chatInput.style.height = 'auto';
    chatInput.placeholder = initialPlaceholder;

    setOrbState('thinking');
    chatInput.disabled = true;
    sendBtn.disabled = true;

    sessionMemory.history.push({
      role: "user",
      content: text
    });

    // Thinking bubble
    const thinkingBubble = document.createElement('div');
    thinkingBubble.classList.add('chat-msg', 'bot');
    thinkingBubble.textContent = "…";
    chatMessages.appendChild(thinkingBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...sessionMemory.history
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("LLM Error:", errorText);
        throw new Error("LLM request failed");
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error("Invalid LLM response format");
      }

      const reply = data.choices[0].message.content;

      thinkingBubble.remove();

      sessionMemory.history.push({
        role: "assistant",
        content: reply
      });

      addMessage(reply, 'bot');

      setOrbState('speaking');
      setTimeout(() => setOrbState('idle'), 800);

    } catch (err) {

      console.error("Chat failure:", err);

      thinkingBubble.remove();
      addMessage("We’re experiencing high load. Please try again shortly.", 'bot');
      setOrbState('idle');

    } finally {
      chatInput.disabled = false;
      sendBtn.disabled = false;

      chatInput.focus();

      if (window.matchMedia("(max-width: 768px)").matches) {
        setTimeout(() => {
          updateViewportHeight();
          chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 200);
}
    }
    
  }

  // -------------------------
  // Attach Listeners
  // -------------------------
  sendBtn.addEventListener('click', sendMessage);

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  window.addEventListener("resize", () => {
  if (chatPanel.classList.contains("active")) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

 chatInput.addEventListener("focus", () => {
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 300);
});
/*====resize using visualViewport API=========================*/
if (window.visualViewport) {

  const vv = window.visualViewport;

  vv.addEventListener("resize", () => {

    const keyboardHeight = Math.max(0, vv.height < window.innerHeight 
  ? window.innerHeight - vv.height 
  : 0);

    if (keyboardHeight > 0) {
      chatInputArea.style.transform =
        `translateY(-${keyboardHeight}px)`;
    } else {
      chatInputArea.style.transform = `translateY(0px)`;
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
    const chatInputArea = document.querySelector('.chat-input-area');

if (window.visualViewport) {

  const vv = window.visualViewport;

  vv.addEventListener("resize", () => {

    const keyboardHeight =
      vv.height < window.innerHeight
        ? window.innerHeight - vv.height
        : 0;

    chatInputArea.style.transform =
      keyboardHeight > 0
        ? `translateY(-${keyboardHeight}px)`
        : `translateY(0px)`;

    chatMessages.style.paddingBottom =
      keyboardHeight > 0
        ? keyboardHeight + "px"
        : "0px";

    chatMessages.scrollTop = chatMessages.scrollHeight;

  });

}
}

});

if (window.innerWidth <= 768) {
  orbContainer.classList.add("orb-mobile-active");
}