# ChillOut - Carte des Boissons

A mobile-responsive drink menu for the student bar. Features CSV-based data management, dark theme support, and collapsible categories.

## Table of Contents

- [ChillOut - Carte des Boissons](#chillout---carte-des-boissons)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Quick Start](#quick-start)
  - [Local Development](#local-development)
    - [Easy Method](#easy-method)
    - [Alternative Methods](#alternative-methods)
  - [Updating the Menu](#updating-the-menu)
    - [Adding/Editing Drinks](#addingediting-drinks)
    - [Adding New Categories](#adding-new-categories)
    - [Changing Bar Information](#changing-bar-information)
  - [Deployment to GitHub Pages](#deployment-to-github-pages)
    - [Repository Name Options](#repository-name-options)
    - [Deployment Steps](#deployment-steps)
  - [Project Structure](#project-structure)
  - [Customization](#customization)
    - [Changing Colors](#changing-colors)
    - [Managing Categories](#managing-categories)
  - [Technical Details](#technical-details)
    - [How It Works](#how-it-works)
    - [Features](#features-1)
    - [Browser Compatibility](#browser-compatibility)
  - [License](#license)

---

## Features

- 📱 **Mobile-First Design** - Fully responsive for phones, tablets, and desktops
- 🌓 **Dark Theme** - Automatically adapts to system dark mode preference
- 📊 **CSV-Based Data** - Easy editing in Excel, Google Sheets, or any text editor
- 🎯 **Collapsible Categories** - Click category headers to expand/collapse sections
- ⚡ **No Dependencies** - Pure HTML, CSS, and vanilla JavaScript
- 🔄 **Easy Updates** - Just edit the CSV file and push changes
- 📦 **Detailed Info** - Shows capacity (in cL), container type, and descriptions
- 💠 **Visual Pricing** - Uses diamond emoji symbols to represent price levels
- 🚀 **GitHub Pages Ready** - Deploy instantly to a free hosted site

## Quick Start

1. **Clone or download this repository**
2. **Edit the menu:** Open `menu-data.csv` in Excel, Google Sheets, or a text editor
3. **Test locally:** Run `./serve.sh` and open http://localhost:8000
4. **Deploy:** Push to GitHub and enable GitHub Pages in settings

## Local Development

You need a local web server to test the site (browsers block `fetch()` on local files for security).

### Easy Method

```bash
./serve.sh
```

Then open http://localhost:8000 in your browser.

### Alternative Methods

```bash
# Python 3 (recommended)
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000
```

**Note:** The `serve.sh` script automatically detects and uses Python 3, Python 2, or Node.js.

## Updating the Menu

### Adding/Editing Drinks

All drink data is in **`menu-data.csv`**. You can edit it:
- In Excel or Google Sheets
- In any text editor
- On GitHub's web interface (it has a built-in CSV editor)

**CSV Format:**

| Column | Description | Example |
|--------|-------------|---------|
| `category_id` | Category identifier (must match script.js) | `beer`, `soft`, `cider`, `special` |
| `item_name` | Name of the drink | `Brewdog Punk IPA` |
| `price` | Price level (number of diamonds to display) | `3`, `2`, `1` |
| `capacity` | Volume in centiliters (cL) | `33`, `50`, `44` |
| `container` | Container type in French | `canette`, `bouteille`, `consignée` |
| `description` | Optional description | `Sans alcool`, `La fausse blonde` |

**Example CSV row:**

```csv
beer,Brewdog Punk IPA,3,50,canette,
```

**Important Notes:**
- **No currency column** - Price is displayed as diamond emojis (💠), where the number determines how many diamonds to show
- **Capacity is in cL** - The script automatically adds "cL" suffix when displaying
- **Container types**: Common values are `canette` (can), `bouteille` (bottle), `consignée` (returnable bottle)
- Use quotes around descriptions that contain commas: `"Rum, mint, lime"`
- Leave description empty if not needed (but keep the comma)

### Adding New Categories

**Step 1:** Edit `script.js` and add your category to the `CATEGORIES` object (around line 3):

```javascript
const CATEGORIES = {
    'beer': { name: 'Bières', emoji: '🍺' },
    'soft': { name: 'Softs', emoji: '🥤' },
    'cider': { name: 'Cidres', emoji: '🍎' },
    'special': { name: 'Spécial', emoji: '☕' },
    'wine': { name: 'Vins', emoji: '🍷' },  // ← Add new category
};
```

**Step 2:** Add drinks with that category ID to `menu-data.csv`:

```csv
wine,Vin Rouge,2,15,verre,
wine,Vin Blanc,2,15,verre,
```

### Changing Bar Information

Edit **`config.json`** to change:
- Bar name (`barName`)
- Tagline (`tagline`)
- Opening hours (`openingHours`)

```json
{
  "barName": "ChillOut",
  "tagline": "Carte des boissons",
  "openingHours": "Quand il y a du monde derrière le bar!"
}
```

## Deployment to GitHub Pages

### Repository Name Options

**Option 1: Project Site (Recommended)**
- Repository name: Any name (e.g., `menu`, `chillout-menu`)
- URL: `https://[username].github.io/[repo-name]/`

**Option 2: User Site**
- Repository name: `[username].github.io`
- URL: `https://[username].github.io/`

### Deployment Steps

1. **Push your code to GitHub:**
   ```bash
   git remote add origin https://github.com/[username]/[repo-name].git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository **Settings**
   - Click **Pages** in the sidebar
   - Under **Source**, select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

3. **Wait 2-3 minutes** for deployment to complete

4. Your menu will be live at the URL shown at the top of the Pages settings page

**No special configuration needed** - the site works out of the box with GitHub Pages.

## Project Structure

```
menu/
├── index.html          # Main HTML structure
├── menu-data.csv       # All drinks data (EDIT THIS)
├── config.json         # Bar name, tagline, hours
├── script.js           # JavaScript (loads CSV, handles UI)
├── styles.css          # All styling including dark theme
├── serve.sh            # Local development server script
└── README.md           # This file
```

**Key Files to Edit:**
- **`menu-data.csv`** - Add/update drinks (main data file)
- **`config.json`** - Update bar name, tagline, hours
- **`script.js`** - Add new categories (CATEGORIES object)
- **`styles.css`** - Change colors, fonts, styling

## Customization

### Changing Colors

Edit the CSS variables in `styles.css` (around line 1):

```css
:root {
    --primary-color: #2c3e50;    /* Category headers, links */
    --secondary-color: #e74c3c;  /* Hover states */
    --accent-color: #f39c12;     /* Category underlines */
    --bg-color: #ecf0f1;         /* Page background */
    --card-bg: #ffffff;          /* Section card backgrounds */
    --text-color: #2c3e50;       /* Main text color */
    --text-light: #7f8c8d;       /* Secondary text (descriptions) */
}
```

**Dark theme colors** are defined separately in the `@media (prefers-color-scheme: dark)` section.

### Managing Categories

All categories are defined in `script.js` in the `CATEGORIES` object:

```javascript
const CATEGORIES = {
    'beer': { name: 'Bières', emoji: '🍺' },
    'soft': { name: 'Softs', emoji: '🥤' },
    'special': { name: 'Spécial', emoji: '☕' },
    'cider': { name: 'Cidres', emoji: '🍎' },
};
```

**Currently available categories:** `beer`, `soft`, `special`, `cider`

**To add a category:** Add a new entry to this object, then use its ID in the CSV

**To remove a category:** Delete it from this object and remove those drinks from the CSV

**To reorder categories:** The display order follows the order drinks appear in the CSV file (first occurrence of each category_id)

## Technical Details

### How It Works

1. **Data Loading:**
   - `config.json` is loaded for bar information
   - `menu-data.csv` is loaded and parsed by custom CSV parser
   - Categories are matched with metadata from `CATEGORIES` object

2. **Price Display:**
   - Price is displayed as diamond emojis (💠)
   - Number in CSV = number of diamonds shown
   - Example: `3` → 💠💠💠

3. **Capacity Display:**
   - Stored in CSV as plain number (e.g., `33`)
   - Displayed with "cL" suffix (e.g., `33cL`)

4. **Collapsible Categories:**
   - Click category headers to toggle collapsed/expanded state
   - Smooth CSS transitions for open/close animations
   - Chevron indicator (▼) rotates when collapsed

### Features

- **No build process** - Just HTML, CSS, and vanilla JavaScript
- **Custom CSV parser** - Handles quoted values with commas correctly
- **Responsive design** - CSS Grid with mobile breakpoints at 768px and 480px
- **Dark theme** - Uses `prefers-color-scheme` media query for automatic detection
- **Smooth animations** - CSS transitions for collapsing and scroll effects
- **Intersection Observer** - Animates sections as they scroll into view

### Browser Compatibility

- **Chrome/Edge:** Full support
- **Firefox:** Full support
- **Safari:** Full support (iOS 12.2+)
- **IE11:** Not supported (uses modern JavaScript features)

---

## License

Free to use and modify for your bar or any other purpose!
