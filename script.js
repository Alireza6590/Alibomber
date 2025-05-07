// متغیرهای全局
let score = 0;
let username = "";

// تابع ورود کاربر
function login() {
    username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("نام کاربری و رمز عبور را وارد کنید!");
        return;
    }

    document.getElementById("loginPanel").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("welcomeText").innerText = `خوش آمدید ${username}!`;

    loadGame();
}

// ساخت صفحه بازی
function loadGame() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    const tiles = Array(16).fill().map((_, index) => ({
        id: index,
        isBomb: Math.random() < 0.2,
        isDiamond: Math.random() < 0.1,
        isRevealed: false
    }));

    tiles.forEach(tile => {
        const tileElement = document.createElement("div");
        tileElement.className = "tile";
        tileElement.onclick = () => revealTile(tile, tileElement);
        grid.appendChild(tileElement);
    });
}

// نمایش المان‌ها هنگام کلیک
function revealTile(tile, element) {
    if (tile.isRevealed) return;

    tile.isRevealed = true;
    element.classList.add("revealed");

    if (tile.isBomb) {
        element.innerText = "💣";
        score -= 300;
        playSound("sounds/bomb.mp3");
    } else if (tile.isDiamond) {
        element.innerText = "💎";
        score += 500;
        playSound("sounds/diamond.mp3");
    }

    updateScore();
}

// آپدیت امتیاز
function updateScore() {
    document.getElementById("score").innerText = score;
    localStorage.setItem(`${username}_score`, score); // ذخیره در localStorage
}

// پخش صدا
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

// بازیابی امتیاز از localStorage
window.onload = () => {
    const savedScore = localStorage.getItem(`${username}_score`);
    if (savedScore) score = parseInt(savedScore);
};
