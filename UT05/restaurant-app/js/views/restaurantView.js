class restaurantView {
    static renderRestaurants(restaurants) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Celar content
        const grid = document.createElement('div');
        grid.className = 'columns is-multiline';
        for (const restaurant of restaurants) {
            const column = document.createElement('div');
            column.className = 'column is-one-third';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                RestaurantController.showRestaurantDetails(restaurant.name);
            };
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            const media = document.createElement('div');
            media.className = 'media';
            const mediaContent = document.createElement('div');
            mediaContent.className = 'media-content';
            const pTitle = document.createElement('p');
            pTitle.className = 'title is-4';
            pTitle.textContent = restaurant.name;
            const pSubtitle = document.createElement('p');
            pSubtitle.className = 'subtitle is-6';
            pSubtitle.textContent = restaurant.description;
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

    static renderRestaurantDetails(restaurant) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = ''; // Clear content
        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = restaurant.name;
        mainContent.appendChild(title);
        const description = document.createElement('p');
        description.textContent = restaurant.description;
        mainContent.appendChild(description);
        const location = document.createElement('p');
        location.textContent = `Location: (${restaurant.location.latitude}, ${restaurant.location.longitude})`;
        mainContent.appendChild(location);
       
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
