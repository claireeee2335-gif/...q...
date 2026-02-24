const messages = [
  "Daily Special: Heartberry cookies + cocoa. Sweet note: You make ordinary moments feel like warm pastries.",
  "Daily Special: Cinnamon cloud roll. Sweet note: You are someone’s favorite cozy thought.",
  "Daily Special: Honey paw buns. Sweet note: Your kindness rises like perfect dough.",
  "Daily Special: Marshmallow mocha. Sweet note: May your day be soft, bright, and gently magical.",
  "Daily Special: Strawberry star tart. Sweet note: You deserve tiny joys and big smiles today."
];

const specialBtn = document.getElementById("specialBtn");
const messageEl = document.getElementById("specialMessage");
const chimeBtn = document.getElementById("chimeBtn");

function pickDailyMessage() {
  const daySeed = Math.floor(Date.now() / 86400000);
  const index = daySeed % messages.length;
  return messages[index];
}

specialBtn.addEventListener("click", () => {
  messageEl.textContent = pickDailyMessage();
  messageEl.animate(
    [
      { transform: "translateY(6px)", opacity: 0.35 },
      { transform: "translateY(0)", opacity: 1 }
    ],
    { duration: 240, easing: "ease-out" }
  );
});

let audioCtx;
let chimeInterval;

function playChime() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.35);

  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.11, audioCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.62);
}

chimeBtn.addEventListener("click", () => {
  if (chimeInterval) {
    clearInterval(chimeInterval);
    chimeInterval = null;
    chimeBtn.textContent = "🔔 Soft Chimes: Off";
    return;
  }

  playChime();
  chimeInterval = setInterval(playChime, 7000);
  chimeBtn.textContent = "🔔 Soft Chimes: On";
});
