
const themeSelector = document.getElementById('theme'); 

function changeTheme() {
    // Check the current value of the select element
    const selectedTheme = themeSelector.value;
    
    // Get references to body and logo elements
    const body = document.body;
    const logo = document.getElementById('logo'); 
    
    // Perform actions based on selected theme
    if (selectedTheme === 'dark') {S
        // Add the dark class to the body
        body.classList.add('dark');
        // Change the source of the logo to point to the white logo
        logo.src = './images/byui-logo_white.png'; 
    } else {
        // Remove the dark class from the body
        body.classList.remove('dark');
        // Make sure the logo src is the blue logo
        logo.src = "./images/byui-logo_blue.webp"; 
    }
}

// Add event listener to the themeSelector element
themeSelector.addEventListener('change', changeTheme); // Use 'change' event instead of 'click' for select elements
