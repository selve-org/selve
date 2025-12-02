# SELVE Backend - Makefile
# Backend-focused development commands

.PHONY: help install dev test clean

# Default target
help:
	@echo "SELVE Backend Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make install     Install Python dependencies"
	@echo ""
	@echo "Development:"
	@echo "  make dev         Start FastAPI server"
	@echo "  make run         Start FastAPI server (alias)"
	@echo ""
	@echo "Testing:"
	@echo "  make test        Run backend tests"
	@echo "  make health      Check backend health"
	@echo "  make question    Test question endpoint"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean       Remove Python cache files"
	@echo ""

# Installation
install:
	@echo " Setting up Python virtual environment..."
	python3 -m venv .venv
	@echo "📦 Installing backend dependencies..."
	./.venv/bin/pip install -r requirements.txt
	@echo "✅ Backend dependencies installed"

# Development
dev:
	@echo "▶️  Starting FastAPI server on http://localhost:8000"
	./.venv/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

run: dev

# Testing
test:
	@echo "🧪 Running backend tests..."
	./.venv/bin/pytest

health:
	@echo "🏥 Checking backend health..."
	@curl -s http://localhost:8000/health | python3 -m json.tool || echo "❌ Backend not running"

question:
	@echo "❓ Testing next-question endpoint..."
	@curl -s "http://localhost:8000/api/next-question?sessionId=test" | python3 -m json.tool || echo "❌ Backend not running"

# Cleanup
clean:
	@echo "🧹 Cleaning Python cache files..."
	cd backend && rm -rf venv __pycache__ app/__pycache__
	find backend -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find backend -type f -name "*.pyc" -delete
	@echo "✅ Cleaned"
