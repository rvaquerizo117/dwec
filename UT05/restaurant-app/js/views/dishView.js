class dishView {
    static renderDishes(dishes) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content
        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';
        for (const dish of dishes) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                DishController.showDishDetails(dish.name);
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
            grid.appendChild(column);
        }
        mainContent.appendChild(grid);
    }

    static renderDishDetails(dish) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content
        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = dish.name;
        mainContent.appendChild(title);
        const description = document.createElement('p');
        description.textContent = dish.description;
        mainContent.appendChild(description);
        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.className = 'title is-5';
        ingredientsTitle.textContent = 'Ingredientes:';
        mainContent.appendChild(ingredientsTitle);
        const ingredientsList = document.createElement('ul');
        dish.ingredients.forEach(ingredient => {
            const item = document.createElement('li');
            item.textContent = ingredient;
            ingredientsList.appendChild(item);
        });
        mainContent.appendChild(ingredientsList);
        const allergensTitle = document.createElement('h3');
        allergensTitle.className = 'title is-5';
        allergensTitle.textContent = 'Alérgenos:';
        mainContent.appendChild(allergensTitle);
        const allergensList = document.createElement('ul');
        dish.allergens.forEach(allergen => {
            const item = document.createElement('li');
            item.textContent = allergen.name;
            allergensList.appendChild(item);
        });
        mainContent.appendChild(allergensList);
        const image = document.createElement('img');
        image.src = dish.image;
        image.alt = dish.name;
        mainContent.appendChild(image);
    }

    static updateBreadcrumb(paths) {
        const breadcrumbList = document.getElementById('breadcrumb-list');
        breadcrumbList.innerHTML = ''; // Clear breadcrumb
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

    static renderRandomDishes(dishes) {
        const mainContent = document.getElementById('main-content');
        const randomDishesSection = document.createElement('div');
        randomDishesSection.className = 'random-dishes section';

        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = 'Platos Aleatorios';
        randomDishesSection.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';
        for (const dish of dishes) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                DishController.showDishDetails(dish.name);
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
            grid.appendChild(column);
        }
        randomDishesSection.appendChild(grid);
        mainContent.appendChild(randomDishesSection);
    }
}
