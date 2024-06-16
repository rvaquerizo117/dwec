class AllergenView {
    constructor(controller) {
        this.controller = controller;
    }

    renderAllergens(allergens) {
        //console.log("Rendering allergens:", allergens);
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content
        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';
        for (const allergen of allergens) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                //console.log("Clicked on allergen:", allergen.name);
                this.controller.showAllergenDetails(allergen.name);
            };
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            const media = document.createElement('div');
            media.className = 'media';
            const mediaContent = document.createElement('div');
            mediaContent.className = 'media-content';
            const pTitle = document.createElement('p');
            pTitle.className = 'title is-4';
            pTitle.textContent = allergen.name;
            const pSubtitle = document.createElement('p');
            pSubtitle.className = 'subtitle is-6';
            pSubtitle.textContent = allergen.description;
            mediaContent.appendChild(pTitle);
            mediaContent.appendChild(pSubtitle);
            media.appendChild(mediaContent);
            cardContent.appendChild(media);
            card.appendChild(cardContent);
            column.appendChild(card);
            grid.appendChild(column);
        }
        mainContent.appendChild(grid);
    }

    renderAllergenDetails(allergen) {
        //console.log("Rendering allergen details:", allergen);
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content

        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = allergen.name;
        mainContent.appendChild(title);

        const description = document.createElement('p');
        description.textContent = allergen.description;
        mainContent.appendChild(description);

        //const dishListTitle = document.createElement('h3');
        //dishListTitle.className = 'title is-5';
        //dishListTitle.textContent = 'Platos con este alergeno:';
        //mainContent.appendChild(dishListTitle);

        const dishGrid = document.createElement('div');
        dishGrid.className = 'columns is-multiline';
        if (allergen.dishes && allergen.dishes.size > 0) {
            allergen.dishes.forEach(dish => {
                const column = document.createElement('div');
                column.className = 'column is-one-third';

                const card = document.createElement('div');
                card.className = 'card';
                card.onclick = () => {
                    this.controller.showDishDetails(dish.name);
                };

                const cardImage = document.createElement('div');
                cardImage.className = 'card-image';
                const figure = document.createElement('figure');
                figure.className = 'image is-4by3';
                const img = document.createElement('img');
                img.src = dish.image;
                img.alt = dish.name;
                figure.appendChild(img);
                cardImage.appendChild(figure);

                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';
                const media = document.createElement('div');
                media.className = 'media';
                const mediaContent = document.createElement('div');
                mediaContent.className = 'media-content';
                const pTitle = document.createElement('p');
                pTitle.className = 'title is-4';
                pTitle.textContent = dish.name;
                const pSubtitle = document.createElement('p');
                pSubtitle.className = 'subtitle is-6';
                pSubtitle.textContent = dish.description;
                mediaContent.appendChild(pTitle);
                mediaContent.appendChild(pSubtitle);
                media.appendChild(mediaContent);
                cardContent.appendChild(media);
                card.appendChild(cardImage);
                card.appendChild(cardContent);
                column.appendChild(card);
                dishGrid.appendChild(column);
            });
        } else {
            const noDishesMessage = document.createElement('p');
            noDishesMessage.textContent = 'No dishes contain this allergen.';
            mainContent.appendChild(noDishesMessage);
        }
        mainContent.appendChild(dishGrid);
    }

    renderError(errorMessage) {
        console.error("Rendering error:", errorMessage);
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<div class="notification is-danger">${errorMessage}</div>`;
    }

    static updateBreadcrumb(paths) {
        const breadcrumbList = document.getElementById('breadcrumb-list');
        breadcrumbList.innerHTML = '';
        paths.forEach((path, index) => {
            const li = document.createElement('li');
            if (index === paths.length - 1) {
                li.className = 'is-active';
                li.innerHTML = `<a href="${path.link}" aria-current="page">${path.name}</a>`;
            } else {
                li.innerHTML = `<a href="${path.link}">${path.name}</a>`;
            }
            breadcrumbList.appendChild(li);
        });
    }
}

export default AllergenView;
