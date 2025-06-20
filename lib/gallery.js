class Gallery {
    constructor(
    { 
        images = document.querySelectorAll('.gallery'),
        buttons = document.querySelectorAll('.open-gallery'),
        borderColor = "white",
        miniaBorderColor = "grey",
        textColor = "black"
    } = {}) 
    {
        this.listImages = images;
        this.gallery = null;
        this.keydownListener = null;
        this.miniImages = null;
        this.mainImage = null;
        this.title = null;
        this.indexDisplayed = 0;
        this.rightButton = null;
        this.leftButton = null;

        this.borderColor = borderColor;
        this.textColor = textColor;
        this.miniaBorderColor = miniaBorderColor;

        this.listImages.forEach((image, index) => {
            image.addEventListener('click', () => {
                this.openGallery(index); 
            });
        });

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                let index = parseInt(button.getAttribute('data-index'));
                if (isNaN(index)) {
                    index = 0; 
                }
                else if (index < 0) {
                    index = 0; 
                }
                else if (index >= this.listImages.length) {
                    index = this.listImages.length - 1; 
                }
                this.openGallery(index);
            });
        });
    }

    static init(options) {
        return new Gallery(options); 
    }
    
    closeGallery = () => {
        if (this.gallery) {
            
            this.gallery.classList.add('transition-fade');
            document.removeEventListener('keydown', this.keydownListener); // Supprime l'écouteur
            setTimeout(() => {
                this.gallery.style.display = 'none';
            }, 200); 
        }
    }

    createGallery = () => {

        // Crée les élement HTML de la galerie
        this.createHTMLElement();

        this.personnalize(); // Personnalise la galerie avec les couleurs

        // Ajout des écouteurs d'événements pour les boutons de navigation
        this.leftButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from propagating to the gallery
            let newIndex = (this.indexDisplayed - 1 + this.listImages.length) % this.listImages.length; 
            this.openGallery(newIndex);
        });

        this.rightButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from propagating to the gallery
            let newIndex = (this.indexDisplayed + 1) % this.listImages.length; 
            this.openGallery(newIndex);
        });

        // Qunand on clic sur la galerie, on la ferme
        this.gallery.addEventListener('click', this.closeGallery);

        // Ajout de l'écouteur de clavier pour les touches Echap, Droite et Gauche
        this.keydownListener = (event) => {
            let index;
            if (event.key === 'Escape') {
                this.closeGallery();
            } else if (event.key === 'ArrowRight') {
                index = (this.indexDisplayed + 1) % this.listImages.length; // Go to next image
                this.openGallery(index);
            } else if (event.key === 'ArrowLeft') {
                index = (this.indexDisplayed - 1 + this.listImages.length) % this.listImages.length; // Go to previous image
                this.openGallery(index);
            }
        };
        document.addEventListener('keydown', this.keydownListener);


        document.querySelector('body').appendChild(this.gallery);
        setTimeout(() => {
            this.gallery.classList.remove('transition-fade');
        }, 1); 
    }

    openGallery = index => {
        if (!this.gallery) {
            this.createGallery(this.listImages);
        }

        this.indexDisplayed = index; // Update the index of the currently displayed image

        this.miniImages.forEach(miniImage => {
            miniImage.classList.remove('active'); // Remove active class from all mini images
        });

        this.mainImage.src = this.listImages[this.indexDisplayed].src; // Set the clicked image as the current image
        this.title.textContent = this.listImages[this.indexDisplayed].title; // Set the title of the current image

        this.miniImages[this.indexDisplayed].classList.add('active'); // Add active class to the clicked mini image

        this.gallery.style.display = 'flex';
        document.addEventListener('keydown', this.keydownListener); // Réattache l'écouteur si nécessaire

        setTimeout(() => {
            this.gallery.classList.remove('transition-fade');
        }, 1); 
    }

    createHTMLElement = () => {
        // Creation de la div d'arrière plan, qui contient la galerie
        this.gallery = document.createElement('div');
        this.gallery.classList.add('gallery-overlay');
        this.gallery.classList.add('transition-fade');

        //Div qui regroupe l'image principale et les boutons
        let div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'column';

        // Creation de la div qui contient l'image principale et le titre
        let galleryContainer = document.createElement('div');
        galleryContainer.classList.add('gallery-container');

        // Empêche la propagation du clic sur le container de la galerie
        // pour éviter de fermer la galerie lorsqu'on clique sur l'image ou les miniatures
        galleryContainer.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        // Creation de l'image principale et du titre
        this.mainImage = document.createElement('img');
        this.mainImage.id = 'main-image';
        this.mainImage.classList.add('gallery-image');
        this.mainImage.src = this.listImages[this.indexDisplayed].src; 

        // Creation du titre de l'image
        this.title = document.createElement('p');
        this.title.classList.add('gallery-title');
        this.title.textContent = this.listImages[this.indexDisplayed].title;

        // Creation de la div qui contient les miniatures
        let divMinia = document.createElement('div');
        divMinia.classList.add('gallery-minia');

        // Creation des miniatures
        this.listImages.forEach((img, index) => {
            let miniImage = document.createElement('img');
            miniImage.src = img.src;
            miniImage.classList.add('gallery-minia-image');

            miniImage.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent click from propagating to the gallery
                this.openGallery(index); // Open the gallery with the clicked image
            });

            if (index == this.indexDisplayed) {
                miniImage.classList.add('active'); 
            }
            
            divMinia.appendChild(miniImage);
        });

        this.leftButton = document.createElement('button');
        this.leftButton.classList.add('gallery-button', 'left');
        // Left arrow symbol
        this.leftButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>'; 

        this.rightButton = document.createElement('button');
        this.rightButton.classList.add('gallery-button', 'right');
        // Right arrow symbol
        this.rightButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>';

        // assemblage
        galleryContainer.appendChild(this.mainImage);
        galleryContainer.appendChild(this.title);
        div.appendChild(divMinia);
        div.appendChild(galleryContainer);
        this.gallery.appendChild(this.leftButton);
        this.gallery.appendChild(this.rightButton);
        this.gallery.appendChild(div);

        this.miniImages = this.gallery.querySelectorAll('.gallery-minia-image');
    }

    personnalize = () => {
        this.gallery.style.setProperty('--border-color', this.borderColor);
        this.title.style.setProperty('--text-color', this.textColor);
        this.gallery.style.setProperty('--minia-color', this.miniaBorderColor);
    }

    changeColors = ({ borderColor = this.borderColor,textColor = this.textColor, miniaBorderColor = this.miniaBorderColor } = {}) => {
        this.borderColor = borderColor;
        this.textColor = textColor;
        this.miniaBorderColor = miniaBorderColor;
        if (this.gallery) {
            this.personnalize();
        }
    }
}