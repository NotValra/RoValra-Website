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

        let featureData = null;
        if (typeof featuresData !== 'undefined') {
            for (const sectionKey in featuresData) {
                if (!Object.prototype.hasOwnProperty.call(featuresData, sectionKey)) continue;
                
                const section = featuresData[sectionKey];
                if (section && typeof section === 'object' && section.settings) {
                    for (const key in section.settings) {
                        if (!Object.prototype.hasOwnProperty.call(section.settings, key)) continue;
                        const item = section.settings[key];
                        if (item && (Array.isArray(item.label) ? item.label[0] : item.label) === title) {
                            featureData = item;
                            break;
                        }
                        if (item && item.childSettings) {
                            for (const childKey in item.childSettings) {
                                if (!Object.prototype.hasOwnProperty.call(item.childSettings, childKey)) continue;
                                const child = item.childSettings[childKey];
                                if (child && (Array.isArray(child.label) ? child.label[0] : child.label) === title) {
                                    featureData = child;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (featureData) break;
            }
        }

        if (modalTitle) modalTitle.textContent = title || 'Feature Details'; 
        
        if (modalBodyDescription) {
            modalBodyDescription.innerHTML = ''; 

            if (featureData) {
                const desc = featureData.description;
                if (Array.isArray(desc)) {
                    const ul = document.createElement('ul');
                    ul.style.paddingLeft = '1.2rem';
                    ul.style.marginBottom = '1rem';
                    desc.forEach(line => {
                        const li = document.createElement('li');
                        li.innerHTML = parseMarkdown(line);
                        ul.appendChild(li);
                    });
                    modalBodyDescription.appendChild(ul);
                } else if (desc) {
                    const p = document.createElement('p');
                    p.innerHTML = parseMarkdown(desc);
                    modalBodyDescription.appendChild(p);
                }

                if (featureData.deprecated) createAlert(modalBodyDescription, 'Deprecated', featureData.deprecated, 'danger');
                if (featureData.experimental) createAlert(modalBodyDescription, 'Experimental', featureData.experimental, 'warning');
                if (featureData.beta) createAlert(modalBodyDescription, 'Beta', featureData.beta, 'info');
            } else {
                modalBodyDescription.textContent = description || '';
            }
        }

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

function parseMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
}

function createAlert(container, title, text, type) {
    const div = document.createElement('div');
    div.className = `alert alert-${type} mt-2 p-2`;
    div.innerHTML = `<strong>${title}:</strong> ${parseMarkdown(text)}`;
    container.appendChild(div);
}