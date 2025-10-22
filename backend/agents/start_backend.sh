#!/bin/bash
echo "🚀 Starting ReadMyMRI Backend..."
echo "================================"

# Check Redis
if command -v redis-cli &> /dev/null && redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is running"
else
    echo "⚠️  Redis is not running - caching will be disabled"
    echo "   Start it with: redis-server"
fi

# Check for .env file
if [ -f "../../.env" ]; then
    echo "✅ Found .env file"
else
    echo "⚠️  No .env file found - using demo mode"
fi

# Start API server
echo ""
echo "🔥 Starting Agent Orchestration API..."
echo "Demo mode enabled for investor presentation"
echo ""
python api_server.py
