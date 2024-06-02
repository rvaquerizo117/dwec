class allergenView {
    static renderAllergens(allergens) {
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
                AllergenController.showAllergenDetails(allergen.name);
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

    static renderAllergenDetails(allergen) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content
        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = allergen.name;
        mainContent.appendChild(title);
        const description = document.createElement('p');
        description.textContent = allergen.description;
        mainContent.appendChild(description);
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
}
