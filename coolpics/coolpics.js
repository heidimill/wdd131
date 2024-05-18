const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".container");

function toggleMenu() {
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);


function handleResize() {
    if (window.innerWidth >= 1000) {
        menu.classList.remove("hide")
    } else {
        menu.classList.add("hide")
    }
}

window.addEventListener("resize", handleResize)

function viewerTemplate(path, alt) {
    return `<div class="viewer">
            <button class="close-viewer">X</button>
            <img src=${path} alt=${alt}>
        </div>`;
}

function viewHandler(event) {
	// create a variable to hold the element that was clicked on from event.target
    const clicked = event.target
	// get the src attribute from that element and 'split' it on the "-"
    const src = clicked.getAttribute('src');
    const alt = clicked.getAttribute('alt');
    
    const a = src.split("-")

	// construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
    const imgsrc = a[0] + "-full.jpeg"

	// insert the viewerTemplate into the top of the body element
    const htmlToInsert = viewerTemplate(imgsrc, alt);
    document.body.insertAdjacentHTML('afterbegin', htmlToInsert);

	// add a listener to the close button (X) that calls a function called closeViewer when clicked
    document.querySelector('.close-viewer').addEventListener('click', closeViewer)
}

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove();
    }
}

document.querySelector('.gallery').addEventListener("click", viewHandler)

// function viewerTemplate(pic, alt) {
//     return `<div class="viewer">
//       <button class="close-viewer">X</button>
//       <img src="${pic}" alt="${alt}">
//     </div>`;
//   }
  
//   function viewHandler(event) {
//     // Log the event to see what was clicked
//     console.log('viewHandler called');
    
//     // Create a variable to hold the element that was clicked on from event.target
//     const clicked = event.target;
//     console.log('Clicked element:', clicked);
  
//     // Check if the clicked element is an image
//     if (clicked.tagName !== 'IMG') {
//       console.log('Clicked element is not an image.');
//       return; // Exit if the clicked element is not an image
//     }
  
//     // Get the src attribute from that element and 'split' it on the "-"
//     const src = clicked.getAttribute('src');
//     const alt = clicked.getAttribute('alt');
//     console.log('Image src:', src);
//     console.log('Image alt:', alt);
  
//     if (!src) {
//       console.error('Image src attribute is missing.');
//       return;
//     }
  
//     const a = src.split("-");
    
//     // Construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
//     const imgsrc = a[0] + "-full.jpeg";
//     console.log('Full image src:', imgsrc);
  
//     // Insert the viewerTemplate into the top of the body element
//     const htmlToInsert = viewerTemplate(imgsrc, alt);
//     document.body.insertAdjacentHTML('afterbegin', htmlToInsert);
//     console.log('Viewer HTML inserted');
  
//     // Add a listener to the close button (X) that calls a function called closeViewer when clicked
//     setTimeout(() => {
//       const closeButton = document.querySelector('.close-viewer');
//       if (closeButton) {
//         closeButton.addEventListener('click', closeViewer);
//         console.log('Close viewer listener added');
//       } else {
//         console.error('Close button not found');
//       }
//     }, 0);
//   }
  
//   function closeViewer() {
//     const viewer = document.querySelector('.viewer');
//     if (viewer) {
//       viewer.remove();
//       console.log('Viewer removed');
//     } else {
//       console.error('Viewer not found');
//     }
//   }
  
//   // Add the event listener to the .gallery section
//   const gallery = document.querySelector('.gallery');
//   if (gallery) {
//     gallery.addEventListener('click', viewHandler);
//     console.log('Gallery event listener added');
//   } else {
//     console.error('.gallery element not found.');
//   }
  