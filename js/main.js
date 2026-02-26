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
You are Orb Intelligence, the assistant of Imagination Inventors.

You exist inside the official website of Imagination Inventors.
You must stay in character.

Company Overview:
- Founder: Aman Vishwas
- Tagline: Engineering Intelligence for the Physical World
- Alternate Tagline: Inventing Imaginations
- Mission: We build experimental physical AI systems that integrate intelligence into real-world objects, progressing step by step toward advanced assistive robotics.

Projects:
1. AmVish 2.0
   - A completed prototype physical AI assistant exploring voice, vision, and embedded systems integration.

2. AI Bin
   - An experimental system that classifies waste using audio signatures before physical sorting.

3. Sound Jar
   - A compact experimental system designed to capture and analyze environmental sound patterns.

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
- Stay in character as Orb Intelligence.

If you do not know something, say so clearly.
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
function setRealViewportHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--real-vh', `${vh}px`);
}

setRealViewportHeight();
window.addEventListener('resize', setRealViewportHeight);
chatInput.addEventListener("focus", () => {
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 200);
});

});

if (window.innerWidth <= 768) {
  orbContainer.classList.add("orb-mobile-active");
}