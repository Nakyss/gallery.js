
let gallery = null
let keydownListener = null; // Stocke la référence de l'écouteur

const createGallery = images => {
    // Creation de la div d'arrière plan, qui contient la galerie
    gallery = document.createElement('div');
    gallery.classList.add('gallery-overlay');
    gallery.classList.add('transition-fade');


    //Div qui regroupe l'image principale et les boutons
    div = document.createElement('div');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';

    // Creation de la div qui contient l'image principale et le titre
    let galleryContainer = document.createElement('div');
    galleryContainer.classList.add('gallery-container');

    // Creation de l'image principale et du titre
    let image = document.createElement('img');
    image.id = 'main-image';
    image.classList.add('gallery-image');
    image.src = images[0].src; 
    image.setAttribute('data-index', '0'); 

    // Creation du titre de l'image
    let title = document.createElement('p');
    title.classList.add('gallery-title');
    title.textContent = images[0].title;


    // Creation de la div qui contient les miniatures
    let divMinia = document.createElement('div');
    divMinia.classList.add('gallery-minia');

    // Creation des miniatures
    images.forEach((img, index) => {
        let miniImage = document.createElement('img');
        miniImage.src = img.src;
        miniImage.classList.add('gallery-minia-image');
        miniImage.setAttribute('data-index', index);

        miniImage.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from propagating to the gallery
            openGallery(images, index); // Open the gallery with the clicked image
        });

        if (index == 0) {
            miniImage.classList.add('active'); 
        }
        
        divMinia.appendChild(miniImage);
    });

    leftButton = document.createElement('button');
    leftButton.classList.add('gallery-button', 'left');
    leftButton.innerHTML = '<span>&lt;</span>'; // Left arrow symbol
    leftButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click from propagating to the gallery
        let currentIndex = parseInt(image.getAttribute('data-index'));
        let newIndex = (currentIndex - 1 + images.length) % images.length; // Go to previous image
        openGallery(images, newIndex);
    });

    rightButton = document.createElement('button');
    rightButton.classList.add('gallery-button', 'right');
    rightButton.innerHTML = '<span>&gt;</span>'; // Right arrow symbol
    rightButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click from propagating to the gallery
        let currentIndex = parseInt(image.getAttribute('data-index'));
        let newIndex = (currentIndex + 1) % images.length; // Go to next image
        openGallery(images, newIndex);
    });


    galleryContainer.appendChild(image);
    galleryContainer.appendChild(title);
    div.appendChild(divMinia);
    div.appendChild(galleryContainer);
    gallery.appendChild(leftButton);
    gallery.appendChild(rightButton);
    gallery.appendChild(div);
    
    // Qunand on clic sur la galerie, on la ferme
    gallery.addEventListener('click', closeGallery);

    // Empêche la propagation du clic sur le container de la galerie
    // pour éviter de fermer la galerie lorsqu'on clique sur l'image ou les miniatures
    galleryContainer.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Ajout de l'écouteur de clavier pour les touches Echap, Droite et Gauche
   keydownListener = (event) => {
        let index;
        if (event.key === 'Escape') {
            closeGallery();
        } else if (event.key === 'ArrowRight') {
            index = (parseInt(image.getAttribute('data-index')) + 1) % images.length; // Go to next image
            openGallery(images, index);
        } else if (event.key === 'ArrowLeft') {
            index = (parseInt(image.getAttribute('data-index')) - 1 + images.length) % images.length; // Go to previous image
            openGallery(images, index);
        }
    };
    document.addEventListener('keydown', keydownListener);

    const body = document.querySelector('body');
    body.appendChild(gallery);

    setTimeout(() => {
        gallery.classList.remove('transition-fade');
    }, 1); 
}

const closeGallery = () => {
    if (gallery) {
        
        gallery.classList.add('transition-fade');
        document.removeEventListener('keydown', keydownListener); // Supprime l'écouteur
        setTimeout(() => {
            gallery.style.display = 'none';
        }, 200); 
    }
}

const openGallery = (images, index) => {
    if (!gallery) {
        createGallery(images);
    }

    const miniImages = gallery.querySelectorAll('.gallery-minia-image');
    miniImages.forEach(miniImage => {
        miniImage.classList.remove('active'); // Remove active class from all mini images
    });

    const image = gallery.querySelector('#main-image');
    const title = gallery.querySelector('p');
    image.src = images[index].src; // Set the clicked image as the current image
    title.textContent = images[index].title; // Set the title of the current image
    image.setAttribute('data-index', index); // Update the index of the current image

    miniImages[index].classList.add('active'); // Add active class to the clicked mini image

    gallery.style.display = 'flex';
    document.addEventListener('keydown', keydownListener); // Réattache l'écouteur si nécessaire

    setTimeout(() => {
        gallery.classList.remove('transition-fade');
    }, 1); 
}

document.addEventListener('DOMContentLoaded', () => {
    images = document.querySelectorAll('.gallery')

    images.forEach((image, index) => {
        image.setAttribute('data-index', index); // Adding a index to each image
        image.addEventListener('click', () => {
            openGallery(images, parseInt(image.getAttribute('data-index'))); 
        });
    });

    buttons = document.querySelectorAll('.open-gallery')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            index = parseInt(button.getAttribute('data-index'));
            if (isNaN(index)) {
                index = 0; 
            }
            else if (index < 0) {
                index = 0; 
            }
            else if (index >= images.length) {
                index = images.length - 1; 
            }
            openGallery(images, index);
        });
    });
});

