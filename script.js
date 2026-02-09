// SCREEN SWITCH
function nextScreen(num) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(`screen${num}`).classList.add("active");

  if (num === 4) startTyping();
}

// 🎵 MUSIC (FIXED)
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
let playing = false;

btn.addEventListener("click", async () => {
  try {
    music.load();
    if (!playing) {
      await music.play();
      btn.textContent = "⏸ Pause Music";
      playing = true;
    } else {
      music.pause();
      btn.textContent = "▶ Play Music";
      playing = false;
    }
  } catch (e) {
    alert("Tap once on the screen, then try again 💗");
  }
});

// ⏳ COUNTDOWN
const targetDate = new Date("Feb 20, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff < 0) return;

  document.getElementById("days").textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").textContent = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").textContent = Math.floor((diff / 1000) % 60);
}, 1000);

// ⌨️ TYPING LETTER
const letterText = `Hey my love,

Some people walk into your life quietly,
and somehow change everything.

You are my favorite part of every day.
With you, love feels gentle, safe, and real.

As your birthday gets closer,
I just want you to know how deeply you are loved.

This is only the beginning of our story.
I love you — always. 💗`;

let i = 0;
function startTyping() {
  const el = document.getElementById("typedText");
  el.textContent = "";
  i = 0;

  const typing = setInterval(() => {
    el.textContent += letterText.charAt(i);
    i++;
    if (i >= letterText.length) clearInterval(typing);
  }, 40);
}

// ✨ GLITTER CURSOR
document.addEventListener("mousemove", e => {
  const g = document.createElement("div");
  g.className = "glitter";
  g.textContent = "✨";
  g.style.left = e.pageX + "px";
  g.style.top = e.pageY + "px";
  document.body.appendChild(g);
  setTimeout(() => g.remove(), 1000);
});
