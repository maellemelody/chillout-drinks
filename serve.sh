#!/bin/bash
# Simple script to start a local development server

echo "🍺 Starting Student Bar Menu local server..."
echo ""

# Check for Python 3
if command -v python3 &> /dev/null; then
    echo "Using Python 3..."
    echo "Server running at: http://localhost:8000"
    echo "Press Ctrl+C to stop"
    echo ""
    python3 -m http.server 8000
# Check for Python 2
elif command -v python &> /dev/null; then
    echo "Using Python 2..."
    echo "Server running at: http://localhost:8000"
    echo "Press Ctrl+C to stop"
    echo ""
    python -m SimpleHTTPServer 8000
# Check for Node.js
elif command -v node &> /dev/null && command -v npx &> /dev/null; then
    echo "Using Node.js..."
    echo "Server running at: http://localhost:8000"
    echo "Press Ctrl+C to stop"
    echo ""
    npx http-server -p 8000
else
    echo "❌ Error: No web server available"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3: https://www.python.org/downloads/"
    echo "  - Node.js: https://nodejs.org/"
    exit 1
fi
