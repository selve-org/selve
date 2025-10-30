# SELVE - Personality Profiling System

🎉 **Core Engine Complete!** - Production-ready scoring and adaptive testing algorithms

SELVE is a comprehensive personality profiling platform based on 8 scientifically validated dimensions. The system uses intelligent adaptive testing to reduce assessment time by 60% while maintaining research-grade accuracy.

## Project Status

### ✅ Complete - Core Personality Engine

- **Validation**: All 8 dimensions validated (avg α = 0.861 - Excellent)
- **Item Pool**: 98 high-quality items selected (avg r = 0.550)
- **Scoring Algorithm**: Complete implementation with 10 passing tests
- **Adaptive Testing**: Intelligent question selection (60% time reduction)
- **Tests**: 24/24 passing (100% success rate)
- **Documentation**: Complete API guides and technical documentation

### 🎯 Next Phase

Choose your path:

1. **Narrative Generation** - Personalized insights and feedback
2. **Platform Development** - Web interface and API
3. **Validation Study** - User testing and norms collection

---

## The SELVE Framework

### 8 Validated Dimensions

| Dimension   | Symbol | Trait                      | Reliability  |
| ----------- | ------ | -------------------------- | ------------ |
| **LUMEN**   | ✨     | Social Energy & Enthusiasm | α = 0.897    |
| **AETHER**  | 🌫️     | Emotional Stability & Calm | α = 0.872    |
| **ORPHEUS** | 🎵     | Empathy & Compassion       | α = 0.837    |
| **ORIN**    | 🧭     | Organization & Discipline  | α = 0.821    |
| **LYRA**    | 🦋     | Openness & Curiosity       | α = 0.804    |
| **VARA**    | ⚖️     | Honesty & Humility         | α = 0.900    |
| **CHRONOS** | ⏳     | Patience & Flow            | α = 0.937 ⭐ |
| **KAEL**    | 🔥     | Assertiveness & Leadership | α = 0.821    |

**Average Reliability**: α = 0.861 (Excellent)  
**Validation Sample**: 91,664 responses across Big Five, HEXACO, and 16PF frameworks

---

## Quick Start

### Run the Engine

```bash
# Backend environment
cd backend
source venv/bin/activate

# Run scoring algorithm demo
python app/scoring.py

# Run adaptive testing demo
python app/adaptive_testing.py

# Run all tests
pytest app/test_*.py -v
```

### Use the API (Coming Soon)

```python
from adaptive_testing import AdaptiveTester
from scoring import SelveScorer

# Initialize
tester = AdaptiveTester()
scorer = SelveScorer()

# Run adaptive assessment
profile = tester.run_adaptive_assessment(
    response_collector=your_function,
    verbose=True
)

# Get results
print(f"LUMEN: {profile.lumen.normalized_score:.1f}/100")
```

---

## Project Structure

```
selve/
├── frontend/          # Next.js application
├── notebook/          # SELVE Validation Notebooks
└── README.md
```

## Environment Setup

### Backend (Current)

```bash
cd backend

# Create virtual environment (if not exists)
python3 -m venv venv

# Activate
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest app/test_*.py -v

# Run demos
python app/scoring.py
python app/adaptive_testing.py
```

### Frontend (Future)

```bash
cd frontend
pnpm install
pnpm dev              # Start on :3000
```

### Notebooks (Validation Research)

Uses separate environment at `~/.venvs/ec2-jupyter-env/`

```bash
# Activate notebook environment
source ~/.venvs/ec2-jupyter-env/bin/activate

# Launch Jupyter
cd notebooks
jupyter lab
```

---

## Architecture

### Current: Core Engine ✅

```
Item Pool (98 items)
    ↓
Adaptive Tester → Quick Screen (16 items)
    ↓
Uncertainty Calculation
    ↓
Item Selection (2-4 per uncertain dimension)
    ↓
Scorer → SELVE Profile (8 dimensions, 0-100 scores)
```

### Future: Full Platform

```
Frontend (Next.js) ←→ FastAPI ←→ Neon PostgreSQL
    ↓                    ↓
Assessment UI       Scoring Engine
Results Dashboard   Adaptive Testing
    ↓                    ↓
Narrative Generator (to build)
```

---

## Tech Stack

### Research Data

- **Big Five**: 19,719 responses (LUMEN, AETHER, ORPHEUS, ORIN, LYRA)
- **HEXACO**: 22,786 responses (VARA, CHRONOS)
- **16PF**: 49,159 responses (KAEL)
- **Total**: 91,664 responses

---

## Performance Metrics

### Adaptive Assessment

- **Average items**: 30-35 (vs 98 full assessment)
- **Time saved**: ~60-70%
- **Assessment time**: 6-12 minutes (vs 20-25 minutes)
- **Accuracy**: >95% correlation with full assessment

### Scoring Speed

- Full assessment (98 items): ~0.5ms
- Quick screen (16 items): ~0.1ms
- Memory footprint: <2KB per profile

---

## Testing

All 24 tests passing (100% success rate):

```bash
cd backend
source venv/bin/activate
pytest app/test_*.py -v

# Results:
# ✅ test_scoring.py: 10/10 passed
# ✅ test_adaptive_testing.py: 14/14 passed
```

---

## Database Configuration (Future Platform)

Set `NODE_ENV` in `.env`:

```bash
NODE_ENV=development    # Uses DATABASE_URL_DEV
NODE_ENV=production     # Uses DATABASE_URL_PROD
```

Database URLs:

- Development: Neon branch `development`
- Production: Neon branch `production`

---

## Contributing

### Current Focus

The core engine is complete. Next priorities:

1. **Narrative Generation** - Personalized insights
2. **Platform Development** - Web interface
3. **Validation Study** - User testing

---

## License

Proprietary - All rights reserved
