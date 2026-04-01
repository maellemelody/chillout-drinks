// Category metadata - centralized configuration
const CATEGORIES = {
    'beer': { name: 'Bières', emoji: '🍺' },
    'soft': { name: 'Softs', emoji: '🥤' },
    'special': { name: 'Spécial', emoji: '☕' },
    'cider': { name: 'Cidres', emoji: '🍎' },
};

// Load menu data and render the page
async function loadMenu() {
    try {
        // Load configuration
        const configResponse = await fetch('config.json');
        const config = await configResponse.json();
        
        // Load menu data from CSV
        const csvResponse = await fetch('menu-data.csv');
        const csvText = await csvResponse.text();
        const menuData = parseCSV(csvText);
        console.log('Menu data loaded:', menuData);
        
        // Update header
        document.getElementById('bar-name').textContent = config.barName;
        document.getElementById('tagline').textContent = config.tagline;
        document.getElementById('opening-hours').textContent = `Heures d'ouverture:\n${config.openingHours}`;
        
        // Update page title
        document.title = `${config.barName} - ${config.tagline}`;
        
        // Render menu
        renderMenu(menuData);
        
        // Initialize interactive features
        initializeInteractiveFeatures();
        
    } catch (error) {
        console.error('Error loading menu:', error);
        document.getElementById('menu-container').innerHTML = 
            '<div class="error">Failed to load menu. Please refresh the page.</div>';
    }
}

// Parse CSV and group by category
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    const categories = {};
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        
        const categoryId = values[0];
        const itemName = values[1];
        const price = values[2];
        const capacity = values[3];
        const container = values[4];
        const description = values[5];
        
        if (!categories[categoryId]) {
            categories[categoryId] = {
                id: categoryId,
                items: []
            };
        }
        
        categories[categoryId].items.push({
            name: itemName,
            price: price,
            capacity: capacity,
            container: container,
            description: description
        });
    }
    
    return Object.values(categories);
}

// Parse a CSV line, handling quoted values with commas
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

function renderMenu(categories) {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    
    categories.forEach(category => {
        const section = document.createElement('section');
        section.className = 'menu-section';
        section.setAttribute('data-category', category.id);
        
        const heading = document.createElement('h2');
        const categoryInfo = CATEGORIES[category.id] || { name: category.id, emoji: '' };
        heading.textContent = `${categoryInfo.emoji} ${categoryInfo.name}`;
        heading.className = 'collapsible-header';
        
        // Add chevron indicator
        const chevron = document.createElement('span');
        chevron.className = 'chevron';
        chevron.innerHTML = '▼';
        heading.appendChild(chevron);
        
        section.appendChild(heading);
        
        const grid = document.createElement('div');
        grid.className = 'menu-grid';
        
        category.items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            
            // Build the details line with capacity and container
            let details = [];
            if (item.capacity) details.push(`${item.capacity}cL`);
            if (item.container) details.push(item.container);
            const detailsText = details.length > 0 ? details.join(' • ') : '';
            
            // Build description with details
            let fullDescription = '';
            if (detailsText && item.description) {
                fullDescription = `<span class="item-details">${detailsText}</span> • ${item.description}`;
            } else if (detailsText) {
                fullDescription = `<span class="item-details">${detailsText}</span>`;
            } else if (item.description) {
                fullDescription = item.description;
            }
            
            menuItem.innerHTML = `
                <div class="item-header">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">${'💠'.repeat(item.price)}</span>
                </div>
                ${fullDescription ? `<p class="item-description">${fullDescription}</p>` : ''}
            `;
            
            grid.appendChild(menuItem);
        });
        
        section.appendChild(grid);
        container.appendChild(section);
        
        // Add click handler for collapse/expand
        heading.addEventListener('click', function() {
            section.classList.toggle('collapsed');
        });
    });
}

function initializeInteractiveFeatures() {
    // Add animation on scroll for menu sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all menu sections
    const menuSections = document.querySelectorAll('.menu-section');
    menuSections.forEach(section => {
        observer.observe(section);
    });

}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadMenu);
