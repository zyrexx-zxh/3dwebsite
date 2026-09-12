# Vertex Digital — 3D Web Agency Storefront

A premium, dark/neon 3D marketing site + 8-step project checkout wizard for
a web development agency, built as a clean, config-driven boilerplate.

```
vertex-agency/
├── frontend/   React + Vite + Tailwind + react-three-fiber + Framer Motion
└── backend/    FastAPI + SQLAlchemy (SQLite) invoice verification API
```

## Architecture notes

- **Zero hardcoded content.** Every string, price, and option list in the UI
  is read from `frontend/src/config/siteConfig.js`. Edit that one file to
  rebrand the whole site, change pricing, add FAQ entries, or add a payment
  network — no component code needs to change.
- **The backend never trusts the frontend's math.** `backend/app/catalog.py`
  keeps its own copy of the same catalog and recomputes the order total
  server-side before running verification. Keep the two files in sync when
  pricing changes.
- **Verification is mocked, on purpose.** `backend/app/verification.py`
  simulates a block explorer lookup so the flow works end-to-end without
  API keys. Each function's docstring points to the real explorer endpoint
  (Etherscan, Blockstream, Tronscan) to call in production.

## Running the frontend

```bash
cd frontend
npm install
cp .env.example .env      # points the app at your backend URL
npm run dev                # http://localhost:5173
```

## Running the backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000   # http://localhost:8000
```

The API is documented automatically at `http://localhost:8000/docs`.

## Endpoints

| Method | Path                     | Purpose                                             |
|--------|--------------------------|------------------------------------------------------|
| POST   | `/api/verify-invoice`    | Submit a completed order + tx hash, get order status |
| GET    | `/api/orders/{order_id}` | Look up a previously submitted order                 |
| GET    | `/api/health`            | Liveness check                                        |

## Before going live

1. Replace every placeholder in `siteConfig.js` and `catalog.py` (pricing,
   copy, wallet addresses) with your real values — keep both files in sync.
2. Swap the mock lookup in `verification.py` for real explorer API calls
   and add your API keys as environment variables.
3. Point `CORSMiddleware` in `backend/app/main.py` at your deployed
   frontend origin, and switch SQLite to Postgres for production traffic.
4. Consider adding an email notification when an order's status changes.
