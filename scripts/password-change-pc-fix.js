// Fix password change button for PC
document.addEventListener('DOMContentLoaded', function() {
    console.log('??? Starting PC password button fix...');
    
    function findAndBindPasswordButtons() {
        console.log('?? Searching for password buttons...');
        
        // Search in all possible elements
        const allElements = document.querySelectorAll('a, button, .btn, .dashboard-btn, .menu-item, .list-item, [onclick], [data-action]');
        
        allElements.forEach((element, index) => {
            const text = element.textContent || element.innerText || '';
            const href = element.getAttribute('href') || '';
            const onclick = element.getAttribute('onclick') || '';
            const title = element.getAttribute('title') || '';
            
            // Search for password-related content
            const isPasswordButton = 
                text.includes('???? ??????') ||
                text.includes('????? ????') ||
                text.includes('????? ????') ||
                text.includes('???? ????') ||
                href.includes('password') ||
                onclick.includes('password') ||
                title.includes('???? ??????');
            
            if (isPasswordButton && 
                !element.hasAttribute('data-pc-password-fixed') &&
                element.tagName !== 'SCRIPT' &&
                element.tagName !== 'STYLE') {
                
                console.log('?? Found password button:', text.trim());
                
                // Remove existing events and links
                element.removeAttribute('href');
                element.removeAttribute('onclick');
                element.style.cursor = 'pointer';
                
                // Create new element to remove old event listeners
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
                
                // Add new event listener
                newElement.addEventListener('click', function(e) {
                    console.log('?? Password button clicked (PC)');
                    
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    // Hide all open modals
                    const allModals = document.querySelectorAll('.modal, [id*="modal"], [class*="modal"], .popup, [class*="popup"]');
                    
                    allModals.forEach(modal => {
                        if (modal && modal.style) {
                            modal.style.display = 'none';
                            modal.style.visibility = 'hidden';
                            modal.style.opacity = '0';
                        }
                    });
                    
                    // Open password change modal
                    if (window.showPasswordChangeModal) {
                        window.showPasswordChangeModal();
                    } else {
                        console.error('? showPasswordChangeModal function not found');
                    }
                    
                    return false;
                }, true);
                
                newElement.setAttribute('data-pc-password-fixed', 'true');
                console.log('? Button bound successfully');
            }
        });
    }
    
    // Run search immediately
    findAndBindPasswordButtons();
    
    // Re-search after different intervals
    setTimeout(findAndBindPasswordButtons, 500);
    setTimeout(findAndBindPasswordButtons, 1000);
    setTimeout(findAndBindPasswordButtons, 2000);
    setTimeout(findAndBindPasswordButtons, 3000);
    
    // Monitor clicks on profile-related elements
    document.addEventListener('click', function(e) {
        const target = e.target;
        const text = target.textContent || target.innerText || '';
        const className = target.className || '';
        const id = target.id || '';
        
        const isProfileRelated = 
            text.includes('????? ??????') ||
            text.includes('profile') ||
            text.includes('??????') ||
            text.includes('????? ??????') ||
            className.includes('profile') ||
            id.includes('profile');
        
        if (isProfileRelated) {
            console.log('?? Profile window opened, re-searching...');
            setTimeout(findAndBindPasswordButtons, 100);
            setTimeout(findAndBindPasswordButtons, 300);
        }
    });
    
    console.log('? PC password button fix system ready');
});
