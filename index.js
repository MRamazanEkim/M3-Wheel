// State
let wheelState = {
    sectionCount: 6,
    sectionTexts: ['Bölme 1', 'Bölme 2', 'Bölme 3', 'Bölme 4', 'Bölme 5', 'Bölme 6'],
    sectionImages: Array(6).fill(null), // Array to store image data URLs
    colors: ['#e74c3c', '#3498db'],
    isSpinning: false,
    currentRotation: 0,
    topLogo: {
        text: '1. Logo',
        image: null,
        color: '#333333'
    },
    bottomLogo: {
        text: '2. Logo',
        image: null,
        color: '#333333'
    },
    background: {
        color: '#f5f5f5',
        image: null
    },
    buttonImage: 'button.png' // Default button image
};

// DOM Elements
const wheel = document.getElementById('wheel');
const wheelImage = document.getElementById('wheelImage');
const settings = document.getElementById('settings');
const sectionCount = document.getElementById('sectionCount');
const increaseSections = document.getElementById('increaseSections');
const decreaseSections = document.getElementById('decreaseSections');
const sectionTextInputs = document.getElementById('sectionTextInputs');
const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const applySettings = document.getElementById('applySettings');
const resultModal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const closeModal = document.getElementById('closeModal');
const topLogo = document.getElementById('topLogo');
const bottomLogo = document.getElementById('bottomLogo');
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');
const wheelButton = document.getElementById('wheelButton');
const buttonImage = document.getElementById('buttonImage');
const buttonImageInput = document.getElementById('buttonImageInput');
const uploadButtonImage = document.getElementById('uploadButtonImage');
const clearButtonImage = document.getElementById('clearButtonImage');
const buttonImagePreview = document.getElementById('buttonImagePreview');

// Logo settings elements
const topLogoText = document.getElementById('topLogoText');
const clearTopLogoText = document.getElementById('clearTopLogoText');
const topLogoPreview = document.getElementById('topLogoPreview');
const topLogoImage = document.getElementById('topLogoImage');
const uploadTopLogo = document.getElementById('uploadTopLogo');
const clearTopLogo = document.getElementById('clearTopLogo');
const topLogoColor = document.getElementById('topLogoColor');

const bottomLogoText = document.getElementById('bottomLogoText');
const clearBottomLogoText = document.getElementById('clearBottomLogoText');
const bottomLogoPreview = document.getElementById('bottomLogoPreview');
const bottomLogoImage = document.getElementById('bottomLogoImage');
const uploadBottomLogo = document.getElementById('uploadBottomLogo');
const clearBottomLogo = document.getElementById('clearBottomLogo');
const bottomLogoColor = document.getElementById('bottomLogoColor');
const bgColor = document.getElementById('bgColor');
const bgImage = document.getElementById('bgImage');
const bgImagePreview = document.getElementById('bgImagePreview');
const uploadBgImage = document.getElementById('uploadBgImage');
const clearBgImage = document.getElementById('clearBgImage');

// Initialize wheel and settings
createWheel();
updateSectionInputs();
initLogoSettings();
initBackgroundSettings();
initButtonSettings();

// Event Listeners
document.addEventListener('keydown', handleKeyPress);
increaseSections.addEventListener('click', () => changeSectionCount(1));
decreaseSections.addEventListener('click', () => changeSectionCount(-1));
applySettings.addEventListener('click', applyWheelSettings);
wheelButton.addEventListener('click', () => spinWheel());

// Logo event listeners
topLogoText.value = wheelState.topLogo.text;
bottomLogoText.value = wheelState.bottomLogo.text;

clearTopLogoText.addEventListener('click', (e) => {
    e.preventDefault();
    topLogoText.value = '';
});

clearBottomLogoText.addEventListener('click', (e) => {
    e.preventDefault();
    bottomLogoText.value = '';
});

uploadTopLogo.addEventListener('click', (e) => {
    e.preventDefault();
    topLogoImage.click();
});

uploadBottomLogo.addEventListener('click', (e) => {
    e.preventDefault();
    bottomLogoImage.click();
});

topLogoImage.addEventListener('change', handleTopLogoUpload);
bottomLogoImage.addEventListener('change', handleBottomLogoUpload);

clearTopLogo.addEventListener('click', (e) => {
    e.preventDefault();
    wheelState.topLogo.image = null;
    topLogoPreview.innerHTML = '';
    uploadTopLogo.textContent = 'Resim Ekle';
    clearTopLogo.style.display = 'none';
    updateLogos();
});

clearBottomLogo.addEventListener('click', (e) => {
    e.preventDefault();
    wheelState.bottomLogo.image = null;
    bottomLogoPreview.innerHTML = '';
    uploadBottomLogo.textContent = 'Resim Ekle';
    clearBottomLogo.style.display = 'none';
    updateLogos();
});

// Background event listeners
bgColor.addEventListener('change', (e) => {
    wheelState.background.color = e.target.value;
    applyBackgroundSettings();
});

uploadBgImage.addEventListener('click', (e) => {
    e.preventDefault();
    bgImage.click();
});

bgImage.addEventListener('change', handleBgImageUpload);

clearBgImage.addEventListener('click', (e) => {
    e.preventDefault();
    wheelState.background.image = null;
    bgImagePreview.innerHTML = '';
    uploadBgImage.textContent = 'Arkaplan Resmi Ekle';
    clearBgImage.style.display = 'none';
    applyBackgroundSettings();
});

// Initialize background settings
function initBackgroundSettings() {
    bgColor.value = wheelState.background.color;
    
    // Pre-populate preview if background image exists
    if (wheelState.background.image) {
        const img = document.createElement('img');
        img.src = wheelState.background.image;
        bgImagePreview.appendChild(img);
        uploadBgImage.textContent = 'Resim Değiştir';
        clearBgImage.style.display = 'inline-block';
    }
    
    applyBackgroundSettings();
}

// Handle background image upload
function handleBgImageUpload() {
    const file = this.files[0];
    if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = function(e) {
            wheelState.background.image = e.target.result;
            
            // Update preview
            bgImagePreview.innerHTML = '';
            const img = document.createElement('img');
            img.src = e.target.result;
            bgImagePreview.appendChild(img);
            
            // Update button texts
            uploadBgImage.textContent = 'Resim Değiştir';
            clearBgImage.style.display = 'inline-block';
            
            // Apply background settings
            applyBackgroundSettings();
        };
        reader.readAsDataURL(file);
    }
}

// Apply background settings to the page
function applyBackgroundSettings() {
    if (wheelState.background.image) {
        document.body.style.backgroundImage = `url('${wheelState.background.image}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundColor = wheelState.background.color; // Fallback color
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = wheelState.background.color;
    }
}

// Add event listeners for color pickers
topLogoColor.addEventListener('change', (e) => {
    wheelState.topLogo.color = e.target.value;
    if (!wheelState.topLogo.image && topLogo.textContent) {
        topLogo.style.color = wheelState.topLogo.color;
    }
});

bottomLogoColor.addEventListener('change', (e) => {
    wheelState.bottomLogo.color = e.target.value;
    if (!wheelState.bottomLogo.image && bottomLogo.textContent) {
        bottomLogo.style.color = wheelState.bottomLogo.color;
    }
});

// Function to close modal
function closeModalFunc() {
    resultModal.classList.remove('visible');
    wheelState.isSpinning = false;
}

closeModal.addEventListener('click', closeModalFunc);

// Handle keyboard shortcuts
function handleKeyPress(event) {
    if (event.code === 'Space') {
        // Space key to spin
        event.preventDefault(); // Prevent scrolling with spacebar
        spinWheel();
    } else if (event.ctrlKey) {
        // Control key to toggle settings
        event.preventDefault(); // Prevent default control behavior
        toggleSettings();
    }
}

// Initialize logo settings
function initLogoSettings() {
    topLogoText.value = wheelState.topLogo.text;
    bottomLogoText.value = wheelState.bottomLogo.text;
    topLogoColor.value = wheelState.topLogo.color;
    bottomLogoColor.value = wheelState.bottomLogo.color;
    updateLogos();
    
    // Pre-populate previews if images exist
    if (wheelState.topLogo.image) {
        const img = document.createElement('img');
        img.src = wheelState.topLogo.image;
        topLogoPreview.appendChild(img);
        uploadTopLogo.textContent = 'Resim Değiştir';
        clearTopLogo.style.display = 'inline-block';
    }
    
    if (wheelState.bottomLogo.image) {
        const img = document.createElement('img');
        img.src = wheelState.bottomLogo.image;
        bottomLogoPreview.appendChild(img);
        uploadBottomLogo.textContent = 'Resim Değiştir';
        clearBottomLogo.style.display = 'inline-block';
    }
}

// Handle logo image uploads
function handleTopLogoUpload() {
    const file = this.files[0];
    if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = function(e) {
            wheelState.topLogo.image = e.target.result;
            
            // Update preview
            topLogoPreview.innerHTML = '';
            const img = document.createElement('img');
            img.src = e.target.result;
            topLogoPreview.appendChild(img);
            
            // Update button texts
            uploadTopLogo.textContent = 'Resim Değiştir';
            clearTopLogo.style.display = 'inline-block';
            
            // Update logo display
            updateLogos();
        };
        reader.readAsDataURL(file);
    }
}

function handleBottomLogoUpload() {
    const file = this.files[0];
    if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = function(e) {
            wheelState.bottomLogo.image = e.target.result;
            
            // Update preview
            bottomLogoPreview.innerHTML = '';
            const img = document.createElement('img');
            img.src = e.target.result;
            bottomLogoPreview.appendChild(img);
            
            // Update button texts
            uploadBottomLogo.textContent = 'Resim Değiştir';
            clearBottomLogo.style.display = 'inline-block';
            
            // Update logo display
            updateLogos();
        };
        reader.readAsDataURL(file);
    }
}

// Update logo displays
function updateLogos() {
    // Update top logo
    if (wheelState.topLogo.image) {
        topLogo.innerHTML = `<img src="${wheelState.topLogo.image}" alt="Top Logo">`;
    } else if (wheelState.topLogo.text) {
        topLogo.innerHTML = wheelState.topLogo.text;
        topLogo.style.color = wheelState.topLogo.color;
    } else {
        topLogo.innerHTML = '';
    }
    
    // Update bottom logo
    if (wheelState.bottomLogo.image) {
        bottomLogo.innerHTML = `<img src="${wheelState.bottomLogo.image}" alt="Bottom Logo">`;
    } else if (wheelState.bottomLogo.text) {
        bottomLogo.innerHTML = wheelState.bottomLogo.text;
        bottomLogo.style.color = wheelState.bottomLogo.color;
    } else {
        bottomLogo.innerHTML = '';
    }
}

/* Calculate result after spinning */
function calculateResult(totalRotation) {
    const sectionAngle = 360 / wheelState.sectionCount;
    
    // Normalize rotation to 0-360 range
    const normalizedRotation = (totalRotation % 360 + 360) % 360;
    
    // When the wheel rotates clockwise, the section positions are reversed
    // We need to invert the angle for correct section calculation
    const invertedAngle = (360 - normalizedRotation) % 360;
    
    // Find which section contains this angle
    const sectionIndex = Math.floor(invertedAngle / sectionAngle);
    
    // Handle edge case for full rotation
    return sectionIndex < wheelState.sectionCount ? sectionIndex : 0;
}

// Functions
function createWheel() {
    // Clear existing sections
    wheel.innerHTML = '';
    
    // Reset the transition to default (needed after changing it during spinning)
    wheel.style.transition = `transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    
    const sectionAngle = 360 / wheelState.sectionCount;
    
    // Draw each section
    for (let i = 0; i < wheelState.sectionCount; i++) {
        // Calculate the angles for this section
        const startAngleDeg = i * sectionAngle;
        const endAngleDeg = (i + 1) * sectionAngle;
        
        // Convert to radians for calculations
        const startAngle = (startAngleDeg) * (Math.PI/180);
        const endAngle = (endAngleDeg) * (Math.PI/180);
        
        // Create the wheel section
        const section = document.createElement('div');
        section.className = 'wheel-section';
        
        // Set color (alternate between the two colors)
        const colorIndex = i % 2;
        section.style.backgroundColor = wheelState.colors[colorIndex];
        
        // Create curved pie slice using multiple points along the arc
        let clipPath = "polygon(50% 50%";
        
        // Add multiple points along the arc for a smoother curve
        const pointCount = 10; // Number of points on the arc (more = smoother)
        for (let p = 0; p <= pointCount; p++) {
            const pointAngle = startAngle + (endAngle - startAngle) * (p / pointCount);
            const px = 50 + 50 * Math.sin(pointAngle);
            const py = 50 - 50 * Math.cos(pointAngle);
            clipPath += `, ${px}% ${py}%`;
        }
        
        clipPath += ")";
        section.style.clipPath = clipPath;
        
        wheel.appendChild(section);
        
        // Add section image if available
        if (wheelState.sectionImages[i]) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'section-image-container';
            
            const imageElement = document.createElement('img');
            imageElement.src = wheelState.sectionImages[i];
            imageElement.className = 'section-image';
            
            // Calculate position - move closer to the center
            const textAngleDeg = startAngleDeg + (sectionAngle / 2); // Middle of the section
            const textRadians = textAngleDeg * (Math.PI / 180);
            const imageRadius = 180; // Reduced from 250 to move closer to center
            
            // Calculate x and y positions
            const imageX = Math.sin(textRadians) * imageRadius + 300; // 300 is half of wheel size
            const imageY = -Math.cos(textRadians) * imageRadius + 300;
            
            // Position image container
            imageContainer.style.left = `${imageX - 60}px`; // 60 is half of image container width
            imageContainer.style.top = `${imageY - 60}px`; // 60 is half of image container height
            imageContainer.style.transform = `rotate(${textAngleDeg}deg)`;
            
            imageContainer.appendChild(imageElement);
            wheel.appendChild(imageContainer);
        }
        
        // Add the text label (only if there's text and no image)
        if (wheelState.sectionTexts[i] && !wheelState.sectionImages[i]) {
            const textElement = document.createElement('div');
            textElement.className = 'section-text';
            textElement.textContent = wheelState.sectionTexts[i];
            
            // Calculate text position - in the middle of the section
            const textAngleDeg = startAngleDeg + (sectionAngle / 2); // Middle of the section
            const textRadians = textAngleDeg * (Math.PI / 180);
            const textRadius = 250; // Distance from center - increased for larger wheel
            
            // Calculate x and y positions precisely
            const textX = Math.sin(textRadians) * textRadius + 300; // 300 is half of wheel size
            const textY = -Math.cos(textRadians) * textRadius + 300;
            
            // Position text
            textElement.style.left = `${textX - 40}px`; // 40 is half of text width
            textElement.style.top = `${textY - 10}px`; // 10 is half of text height
            textElement.style.transform = `rotate(${textAngleDeg}deg)`; // Rotate text to be readable
            
            wheel.appendChild(textElement);
        }
    }

    // Reset wheel position
    wheel.style.transform = `rotate(${wheelState.currentRotation}deg)`;
    // Don't rotate the wheel image
}

function updateSectionInputs() {
    sectionTextInputs.innerHTML = '';
    
    for (let i = 0; i < wheelState.sectionCount; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        // Section label
        const label = document.createElement('label');
        label.textContent = `Bölme ${i + 1}`;
        label.setAttribute('for', `Bölme-${i}`);
        
        // Text input
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `bölme-${i}`;
        input.className = 'bölme-text-input';
        input.value = wheelState.sectionTexts[i] || '';
        input.placeholder = `Bölme ${i + 1}`;
        
        // Clear text button
        const clearTextBtn = document.createElement('button');
        clearTextBtn.className = 'clear-text-btn';
        clearTextBtn.textContent = 'Yazıyı Sil';
        clearTextBtn.onclick = function(e) {
            e.preventDefault();
            input.value = '';
        };
        
        // Image upload container
        const imageUploadContainer = document.createElement('div');
        imageUploadContainer.className = 'image-upload-container';
        
        // Image preview
        const imagePreview = document.createElement('div');
        imagePreview.className = 'image-preview';
        imagePreview.id = `image-preview-${i}`;
        
        if (wheelState.sectionImages[i]) {
            const img = document.createElement('img');
            img.src = wheelState.sectionImages[i];
            img.alt = `Bölme ${i+1} image`;
            imagePreview.appendChild(img);
        }
        
        // File input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = `bölme-image-${i}`;
        fileInput.className = 'bölme-image-input';
        fileInput.accept = 'image/png';
        fileInput.style.display = 'none';
        
        // Upload button
        const uploadButton = document.createElement('button');
        uploadButton.className = 'upload-image-btn';
        uploadButton.textContent = wheelState.sectionImages[i] ? 'Resim Değiştir' : 'Resim Ekle';
        uploadButton.onclick = function(e) {
            e.preventDefault();
            fileInput.click();
        };
        
        // Clear button (only show if image exists)
        const clearButton = document.createElement('button');
        clearButton.className = 'clear-image-btn';
        clearButton.textContent = 'Sil';
        clearButton.style.display = wheelState.sectionImages[i] ? 'inline-block' : 'none';
        clearButton.onclick = function(e) {
            e.preventDefault();
            wheelState.sectionImages[i] = null;
            imagePreview.innerHTML = '';
            uploadButton.textContent = 'Resim Ekle';
            clearButton.style.display = 'none';
        };
        
        // Handle file selection
        fileInput.onchange = function() {
            const file = this.files[0];
            if (file && file.type === 'image/png') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Store image data URL
                    wheelState.sectionImages[i] = e.target.result;
                    
                    // Update preview
                    imagePreview.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = `Bölme ${i+1} image`;
                    imagePreview.appendChild(img);
                    
                    // Update button texts
                    uploadButton.textContent = 'Resim Değiştir';
                    clearButton.style.display = 'inline-block';
                };
                reader.readAsDataURL(file);
            }
        };
        
        // Add buttons to container
        imageUploadContainer.appendChild(uploadButton);
        imageUploadContainer.appendChild(clearButton);
        
        // Assemble the input group
        inputGroup.appendChild(label);
        
        // Text input and clear button container
        const textContainer = document.createElement('div');
        textContainer.className = 'text-input-container';
        textContainer.appendChild(input);
        textContainer.appendChild(clearTextBtn);
        inputGroup.appendChild(textContainer);
        
        inputGroup.appendChild(imagePreview);
        inputGroup.appendChild(imageUploadContainer);
        inputGroup.appendChild(fileInput);
        
        sectionTextInputs.appendChild(inputGroup);
    }
}

function changeSectionCount(change) {
    let newCount = wheelState.sectionCount + change;
    
    // Limit to 4-8 sections
    newCount = Math.max(4, Math.min(8, newCount));
    
    if (newCount !== wheelState.sectionCount) {
        wheelState.sectionCount = newCount;
        sectionCount.textContent = newCount;
        
        // Adjust section texts and images arrays
        if (change > 0) {
            // Add new sections
            for (let i = wheelState.sectionTexts.length; i < newCount; i++) {
                wheelState.sectionTexts.push(`Bölme ${i + 1}`);
                wheelState.sectionImages.push(null);
            }
        } else {
            // Remove excess sections
            wheelState.sectionTexts = wheelState.sectionTexts.slice(0, newCount);
            wheelState.sectionImages = wheelState.sectionImages.slice(0, newCount);
        }
        
        updateSectionInputs();
    }
}

function applyWheelSettings() {
    // Update section texts from inputs
    for (let i = 0; i < wheelState.sectionCount; i++) {
        const input = document.getElementById(`bölme-${i}`);
        if (input) {
            wheelState.sectionTexts[i] = input.value;
        }
        // Note: Image data is already updated in wheelState when files are selected
    }
    
    // Update logo texts and colors
    wheelState.topLogo.text = topLogoText.value;
    wheelState.bottomLogo.text = bottomLogoText.value;
    wheelState.topLogo.color = topLogoColor.value;
    wheelState.bottomLogo.color = bottomLogoColor.value;
    updateLogos();
    
    // Update colors and background
    wheelState.colors[0] = color1Input.value;
    wheelState.colors[1] = color2Input.value;
    wheelState.background.color = bgColor.value;
    applyBackgroundSettings();
    
    // Recreate wheel with new settings
    createWheel();
    
    // Hide settings
    settings.classList.remove('visible');
}

function spinWheel() {
    if (wheelState.isSpinning) return;
    
    wheelState.isSpinning = true;
    
    // Generate random spin duration between 5 and 8 seconds
    const spinDuration = 6 + Math.random() * 2; // Random duration between 5-8 seconds
    
    // Set a longer transition duration for the wheel
    wheel.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    
    // Random rotation between 5 and 10 full spins
    const spinAngle = 3600 + Math.floor(Math.random() * 1800); // 10-15 full rotations (3600-5400 degrees)
    const totalRotation = wheelState.currentRotation + spinAngle;
    
    // Play the spinning sound
    spinSound.currentTime = 0; // Reset the audio to the beginning
    spinSound.play();
    
    // Start spinning the wheel
    wheel.style.transform = `rotate(${totalRotation}deg)`;
    wheelState.currentRotation = totalRotation;
    
    // Show result after spin completes
    setTimeout(() => {
        winSound.currentTime = 0; // Reset win sound to beginning
        winSound.play();

        // Calculate which section is selected
        const sectionIndex = calculateResult(totalRotation);
        const resultImageContainer = document.getElementById('resultImageContainer');
        const timerDisplay = document.getElementById('timerDisplay');
        resultImageContainer.innerHTML = '';
        
        // Check if the selected section has an image
        if (wheelState.sectionImages[sectionIndex]) {
            // Show custom message with image
            resultText.textContent = "Tebrikler";
            
            // Add the image
            const img = document.createElement('img');
            img.src = wheelState.sectionImages[sectionIndex];
            img.alt = `Bölme ${sectionIndex + 1} image`;
            resultImageContainer.appendChild(img);
            
            // Add "Kazandınız" text after the image
            const winText = document.createElement('p');
            winText.textContent = "Kazandınız";
            winText.style.marginTop = "10px";
            winText.style.fontSize = "24px";
            winText.style.fontWeight = "bold";
            resultImageContainer.appendChild(winText);
        } else if (wheelState.sectionTexts[sectionIndex]) {
            // Show custom message with section text
            resultText.textContent = "Tebrikler";
            
            // Add the section text
            const textElement = document.createElement('p');
            textElement.textContent = wheelState.sectionTexts[sectionIndex];
            textElement.style.fontSize = "32px";
            textElement.style.fontWeight = "bold";
            textElement.style.margin = "20px 0";
            textElement.style.color = "#333";
            resultImageContainer.appendChild(textElement);
            
            // Add "Kazandınız" text
            const winText = document.createElement('p');
            winText.textContent = "Kazandınız";
            winText.style.marginTop = "10px";
            winText.style.fontSize = "24px";
            winText.style.fontWeight = "bold";
            resultImageContainer.appendChild(winText);
        } else {
            // Show generic result if no text and no image
            resultText.textContent = `Bölme ${sectionIndex + 1}`;
        }
        
        // Show the modal with timer
        resultModal.classList.add('visible');
        
        // Set up countdown timer
        let timeLeft = 4;
        timerDisplay.textContent = timeLeft;
        
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                resultModal.classList.remove('visible');
                wheelState.isSpinning = false;
            }
        }, 1000);
        
        // Allow manual close with the OK button
        closeModal.onclick = function() {
            clearInterval(timerInterval);
            resultModal.classList.remove('visible');
            wheelState.isSpinning = false;
        };
    }, spinDuration * 1000); // Convert seconds to milliseconds
}

function toggleSettings() {
    settings.classList.toggle('visible');
}

// Initialize button settings
function initButtonSettings() {
    // Pre-populate preview if button image exists
    if (wheelState.buttonImage) {
        const img = document.createElement('img');
        img.src = wheelState.buttonImage;
        buttonImagePreview.appendChild(img);
        uploadButtonImage.textContent = 'Resim Değiştir';
        clearButtonImage.style.display = 'inline-block';
    }
}

// Handle button image upload
uploadButtonImage.addEventListener('click', (e) => {
    e.preventDefault();
    buttonImageInput.click();
});

buttonImageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = function(e) {
            wheelState.buttonImage = e.target.result;
            
            // Update preview
            buttonImagePreview.innerHTML = '';
            const img = document.createElement('img');
            img.src = e.target.result;
            buttonImagePreview.appendChild(img);
            
            // Update button image
            buttonImage.src = e.target.result;
            
            // Update button texts
            uploadButtonImage.textContent = 'Resim Değiştir';
            clearButtonImage.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
});

clearButtonImage.addEventListener('click', (e) => {
    e.preventDefault();
    wheelState.buttonImage = 'button.png';
    buttonImagePreview.innerHTML = '';
    buttonImage.src = 'button.png';
    uploadButtonImage.textContent = 'Buton Resmi Ekle';
    clearButtonImage.style.display = 'none';
    buttonImageInput.value = ''; // Clear the file input value
});
