// utils/DragAndDropUtility.js
export default function initializeDragAndDrop(menuController) {
    const dishList = document.getElementById('manage-menus-dish-list');
    const associatedList = document.getElementById('manage-menus-associated-list');

    let draggedElement = null;

    function handleDragStart(event) {
        const dishElement = event.target.closest('.menu-dish-item');
        if (dishElement) {
            draggedElement = dishElement;
            event.dataTransfer.setData('text/plain', dishElement.textContent);
            event.dataTransfer.effectAllowed = 'move';
            dishElement.classList.add('dragging');
            console.log('Drag started for dish:', dishElement.textContent);
        }
    }

    function handleDragEnd(event) {
        const dishElement = event.target.closest('.menu-dish-item');
        if (dishElement) {
            dishElement.classList.remove('dragging');
            console.log('Drag ended for dish:', dishElement.textContent);
            draggedElement = null;
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        const targetDish = event.target.closest('.menu-dish-item');
        if (targetDish && targetDish !== draggedElement) {
            targetDish.classList.add('dragover');
        }
    }

    function handleDragLeave(event) {
        const targetDish = event.target.closest('.menu-dish-item');
        if (targetDish) {
            targetDish.classList.remove('dragover');
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        const draggedDishName = event.dataTransfer.getData('text/plain');
        const targetDish = event.target.closest('.menu-dish-item');

        if (targetDish && draggedDishName !== targetDish.textContent) {
            const parent = targetDish.parentNode;
            if (parent) {
                const dishes = Array.from(parent.children).filter(child => child.classList.contains('menu-dish-item'));
                const draggedIndex = dishes.findIndex(dish => dish.textContent === draggedDishName);
                const targetIndex = dishes.findIndex(dish => dish === targetDish);

                if (draggedIndex !== -1 && targetIndex !== -1) {
                    const [draggedDish] = dishes.splice(draggedIndex, 1);
                    dishes.splice(targetIndex, 0, draggedDish);

                    parent.innerHTML = '';
                    dishes.forEach(dish => parent.appendChild(dish));

                    console.log('Dishes reordered:', draggedDishName, 'to', targetDish.textContent);
                    menuController.reorderDishes(draggedDishName, targetDish.textContent);

                    initializeEventListeners(dishList);
                    initializeEventListeners(associatedList);
                }
            }
        }
        if (targetDish) {
            targetDish.classList.remove('dragover');
        }
    }

    function initializeEventListeners(container) {
        const items = container.querySelectorAll('.menu-dish-item');
        items.forEach(item => {
            item.removeEventListener('dragstart', handleDragStart);
            item.removeEventListener('dragend', handleDragEnd);
            item.removeEventListener('dragover', handleDragOver);
            item.removeEventListener('dragleave', handleDragLeave);
            item.removeEventListener('drop', handleDrop);

            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('dragleave', handleDragLeave);
            item.addEventListener('drop', handleDrop);
        });
    }

    initializeEventListeners(dishList);
    initializeEventListeners(associatedList);
}
