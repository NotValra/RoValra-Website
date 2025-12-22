const featureModal = document.getElementById('featureDetailModal');
if (featureModal) {
    featureModal.addEventListener('show.bs.modal', event => {
        const card = event.relatedTarget;
    
        const title = card.getAttribute('data-feature-title');
        const description = card.getAttribute('data-feature-description');
        const imageSrc = card.getAttribute('data-feature-image'); 
        const category = card.getAttribute('data-feature-category'); 

        const modalTitle = featureModal.querySelector('.modal-title');
        const modalBodyDescription = featureModal.querySelector('#featureModalDescription');
        const modalImage = featureModal.querySelector('#featureModalImage');
        const modalCategoryTitle = featureModal.querySelector('.category-title'); 

        if (modalTitle) modalTitle.textContent = title || 'Feature Details'; 
        if (modalBodyDescription) modalBodyDescription.textContent = description || '';
        if (modalCategoryTitle) modalCategoryTitle.textContent = category || 'Category';
        if (modalImage) {
            if (imageSrc && imageSrc !== '') {
                modalImage.src = imageSrc;
                modalImage.alt = (title || 'Feature') + " Screenshot"; 
                modalImage.style.display = 'block'; 
            } else {
                modalImage.style.display = 'none'; 
                modalImage.src = ''; 
                modalImage.alt = ''; 
            }
        }
    });
} 