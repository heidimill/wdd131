
import experiences from "./experience.mjs";

// Modal Viewer for contact me

function viewerTemplate(src, alt) {
    return `<div class="viewer">
                <button class="close-viewer">X</button>
                <img src="./images/contact-${src}" alt="${alt}" id="modal-image">
            </div>`;
}

function viewHandler(event) {
	// create a variable to hold the element that was clicked on from event.target
    const clicked = event.target
	// get the src attribute from that element and 'split' it on the "-"
    const src = clicked.getAttribute('src');
    const alt = clicked.getAttribute('alt');
    
    const imgsrc = src.split("-")[1]

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

document.querySelector('.email').addEventListener("click", viewHandler)
document.querySelector('.phone').addEventListener("click", viewHandler)


// dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const switchElement = document.getElementById('theme-switch');

    // Check for saved theme in local storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        switchElement.checked = true;
    } else {
        document.body.classList.add('light-mode');
    }

    // Event listener for the toggle switch
    switchElement.addEventListener('change', function() {
        if (switchElement.checked) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const pageType = document.body.getAttribute('data-page');
    
    if (pageType === 'home') {
        // slider java script

            let slideIndex = 0;
            showSlides();

            function showSlides() {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            slides[slideIndex-1].style.display = "block";
            setTimeout(showSlides, 20000); // Change image every 2 seconds
            }



    } else if (pageType === 'resume') {
        
            // Output experience in the resume page


            function descriptionTemplate(descriptions) {
                let html = '';
                descriptions.forEach(description => {
                    html += `<li>${description}</li> `;
                });
                return html;
            }

            function experienceTemplate(experience) {
                const descriptionHTML = descriptionTemplate(experience.description);

                let html = `<div class="experience-work">`;
                html += `<h3>${experience.title}</h3>`;
                html += `<p>${experience.date}</p>`;  
                html += `<h4>${experience.company}</h4>`;
                html += `<p>${experience.location}</p>`;
                html += `<ul>${descriptionHTML}</ul>`;
                html += `</div>`;

                return html;
            }

            function renderWorkExperience(experiencelist) {
                const outputElement = document.querySelector('.work-experience-section'); 
                if (outputElement) {
                    let workExperiencesHTML = "";
                    experiencelist.forEach(experience => {
                        workExperiencesHTML += experienceTemplate(experience);
                    });
                    outputElement.innerHTML = workExperiencesHTML;
                } else {
                    console.error('No element with class "work-experience-section" found.');
                }
            }

            window.onload = () => {
                renderWorkExperience(experiences);
            };
    } else if (pageType === 'projects') {
            // projects page

            document.querySelectorAll('.filter').forEach(filter => {
                filter.addEventListener('change', () => {
                    const selectedLanguages = Array.from(document.querySelectorAll('.filter:checked')).map(checkbox => checkbox.value);

                    if (selectedLanguages.length === 0) {
                        // Show all projects if no filters are selected
                        document.querySelectorAll('.project-info').forEach(project => {
                            project.style.display = 'block';
                            const projectId = project.getAttribute('data-id');
                            document.querySelector(`.project-photo[data-id="${projectId}"]`).style.display = 'block';
                        });
                    } else {
                        // Show/hide projects based on selected filters
                        document.querySelectorAll('.project-info').forEach(project => {
                            const projectLanguages = project.getAttribute('data-languages').split(',');
                            const projectId = project.getAttribute('data-id');

                            if (selectedLanguages.some(lang => projectLanguages.includes(lang))) {
                                project.style.display = 'block';
                                document.querySelector(`.project-photo[data-id="${projectId}"]`).style.display = 'block';
                            } else {
                                project.style.display = 'none';
                                document.querySelector(`.project-photo[data-id="${projectId}"]`).style.display = 'none';
                            }
                        });
                    }
                });
            });

    }
});



