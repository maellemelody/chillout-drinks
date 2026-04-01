# Student Bar - Online Drinks Menu

A simple, mobile-responsive online menu for displaying drinks available at the student bar.

## Features

- 📱 **Mobile Responsive** - Optimized for phones, tablets, and desktops
- 🎨 **Modern Design** - Clean and easy to read
- ⚡ **Fast Loading** - Simple HTML/CSS/JS with no dependencies
- 🔄 **Easy to Update** - Just edit the CSV file to change menu items
- 📊 **CSV-Based** - Edit in Excel, Google Sheets, or any text editor

## Local Testing

To test the menu locally before deploying:

```bash
./serve.sh
```

Then open http://localhost:8000 in your browser.

**Alternative methods:**

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server -p 8000
```

**Note:** You need a local web server because the browser blocks loading local files via `fetch()` for security reasons.

## How to Update the Menu

All menu data is stored in `menu-data.csv`. You can edit it:
- Directly in a text editor
- In Excel, Google Sheets, or any spreadsheet software
- On GitHub's web interface (it has a nice CSV editor!)

### CSV Format

The CSV has these columns:
- `category_id` - Category ID (must match categories defined in script.js: beer, wine, cocktails, soft-drinks, hot-drinks)
- `item_name` - Name of the drink
- `price` - Price as a number (e.g., 3.50)
- `currency` - Currency symbol (e.g., €, $)
- `capacity` - Volume/size (e.g., 0.33L, 0.5L)
- `container` - Type of container (e.g., can, bottle, returnable bottle, glass, draft, pitcher, cup)
- `description` - Additional description (optional)

**Note:** Category names and emojis are defined in `script.js` and don't need to be repeated in the CSV.

### To Add a New Drink

Add a new row with the category info and drink details:
```
beer,Beer,🍺,New Beer Name,5.00,€,0.5L,bottle,Description here
```

### To Add a New Category

Add rows with a new `category_id` and matching `category_name` and `category_emoji`:
```
spirits,Spirits,🥃,Whiskey,7.00,€,0.05L,glass,Single malt scotch
spirits,Spirits,🥃,Vodka Shot,3.50,€,0.04L,glass,Premium vodka
```

### To Change Bar Info

Edit `config.json` to change the bar name, tagline, or opening hours.

## GitHub Pages Setup

To publish this menu online:

1. Go to your GitHub repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Your menu will be live at: `https://[your-username].github.io/[repo-name]/`

## Files

- `index.html` - Main menu page structure
- `menu-data.csv` - **All menu items (edit this to update drinks)**
- `config.json` - Bar name, tagline, and opening hours
- `styles.css` - Styling and responsive design
- `script.js` - Loads CSV data and adds interactive features
- `README.md` - This file

## Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;    /* Main header color */
    --secondary-color: #e74c3c;  /* Price color */
    --accent-color: #f39c12;     /* Section underline */
}
```

### Add New Sections

Copy an existing section in `index.html` and modify the emoji, title, and items.

## License

Feel free to use and modify as needed for your student bar!
