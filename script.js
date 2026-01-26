const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const question = document.getElementById('question');

const phrases = [
    "No",
    "Are you sure?",
    "Really sure??",
    "Pretty please?",
    "I'm gonna cry...",
    "You're breaking my heart ;(",
    "RECONSIDER PLEASE",
    "I'm not taking no for an answer!",
    "Okay, now you're just being mean!"
];

let clickCount = 0;

noButton.addEventListener('click', () => {
    clickCount++;
    
    // 1. Change the text
    if (clickCount < phrases.length) {
        noButton.innerText = phrases[clickCount];
    }

    // 2. Make Yes button bigger & Handle Pulse Scale
    const currentSize = 1 + (clickCount * 0.4);
    yesButton.style.transform = `scale(${currentSize})`;
    // This variable tells the CSS animation where to start its pulse from
    yesButton.style.setProperty('--current-scale', currentSize);

    // 3. THE SHAKE: Increase intensity
    const shakeIntensity = clickCount * 0.5; 
    noButton.style.setProperty('--shake-dist', `${shakeIntensity}px`);
  

    if (!noButton.classList.contains('apply-shake')) {
        noButton.classList.add('apply-shake');
    }

    // 4. THE GLOW: Increase intensity and brightness
    const opacity = Math.min(0.3 + (clickCount * 0.1), 1.0);
    const blur = clickCount * 4; 
    
    yesButton.style.setProperty('--glow-color', `rgba(232, 30, 99, ${opacity})`);
    yesButton.style.setProperty('--glow-blur', `${blur}px`);
    
    const brightness = 100 + (clickCount * 10);
    yesButton.style.filter = `brightness(${brightness}%)`;

    // Ensure pulse class is added
    if (!yesButton.classList.contains('apply-pulse')) {
        yesButton.classList.add('apply-pulse');
    }

    // 5. Gap logic: Keeps them centered but separated
    const newGap = 20 + (clickCount * 45); 
    document.querySelector('.buttons').style.gap = `${newGap}px`;

    // 6. Runaway Button Logic
    if (clickCount === phrases.length - 1) {
        // This is the last phrase, start moving the button
        noButton.style.position = "absolute";
        moveButton();
    } else if (clickCount > phrases.length - 1) {
        // If she manages to click it AFTER it starts moving
        showError();
    }

    if (clickCount === 3) document.title = "Wait, come back! 🥺";
if (clickCount === 6) document.title = "STOP CLICKING NO!";
if (clickCount >= phrases.length - 1) document.title = "ERROR: NO NOT FOUND";
});

// Runaway Logic: Fired when she moves mouse over the button
noButton.addEventListener('mousemove', () => {
    if (clickCount >= phrases.length - 1) {
        noButton.style.position = "absolute";
        moveButton();
    }
});

noButton.addEventListener('click', () => {
  const audio = new Audio("sounds/mainPage/vine-boom.mp3");
    clickCount++;
    // TRIGGER THE POP-UP
    spawnPopImage();
    audio.play()

});

// Backup runaway for fast movements
noButton.addEventListener('mouseover', () => {
    if (clickCount >= phrases.length - 1) {
        noButton.style.position = "absolute";
        moveButton();
    }
});

function moveButton() {
    const yesRect = yesButton.getBoundingClientRect();
    const noWidth = noButton.offsetWidth;
    const noHeight = noButton.offsetHeight;
    
    let x, y;
    let isOverlapping = true;
    let attempts = 0;

    // Try to find a spot that doesn't overlap with the Yes button
    while (isOverlapping && attempts < 50) {
        x = Math.random() * (window.innerWidth - noWidth);
        y = Math.random() * (window.innerHeight - noHeight);

        // Check for overlap with Yes button (with a 20px buffer)
        if (x < yesRect.right + 20 && x + noWidth > yesRect.left - 20 &&
            y < yesRect.bottom + 20 && y + noHeight > yesRect.top - 20) {
            isOverlapping = true;
        } else {
            isOverlapping = false;
        }
        attempts++;
    }

    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
}

function showError() {
    document.getElementById('errorPopup').style.display = 'flex';
}

function closeError() {
    document.getElementById('errorPopup').style.display = 'none';
}

// Success Screen
yesButton.addEventListener('click', () => {
    window.location.href = 'yes.html';
});

// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('img');
    
    // REPLACE THE URL BELOW WITH YOUR IMAGE
    trail.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0icmVkIj48cGF0aCBkPSJNMTIgMjEuMzVsLTEuNDUtMS4zMkM1LjQgMTUuMzYgMiAxMi4yOCAyIDguNSAyIDUuNDIgNC40MiAzIDcuNSAzYzEuNzQgMCAzLjQxLjgxIDQuNSAyLjA5QzEzLjA5IDMuODEgMTQuNzYgMyAxNi41IDMgMTkuNTggMyAyMiA1LjQyIDIyIDguNWMwIDMuNzgtMy40IDYuODYtOC41NSAxMS41NEwxMiAyMS4zNXoiLz48L3N2Zz4='; 
    
    trail.className = 'trail';
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    trail.style.width = '30px';
    trail.style.height = '30px';


    document.body.appendChild(trail);

    // Animate fade out
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }, 10);

    // Remove from DOM after animation finishes
    setTimeout(() => {
        trail.remove();
    }, 500);
});

function spawnPopImage() {
    const img = document.createElement('img');
    
    // Replace 'sad-cat.png' with whatever image you want to pop up
    img.src = "images/mainPage/dogSideEye.jpg"; 
    img.classList.add('pop-image');
    
    // Set a width for the pop-up
    img.style.width = '300px'; 
    
    document.body.appendChild(img);

    // Remove the image from the folder after 1.5 seconds so the site stays fast
    setTimeout(() => {
        img.remove();
    }, 1500);
}