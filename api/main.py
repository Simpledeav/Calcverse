"""
CalcVerse API — FastAPI microservice for complex calculation engines.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import amortization, statistics, matrix, retirement

app = FastAPI(
    title="CalcVerse API",
    version="1.0.0",
    description="Advanced calculation engines for CalcVerse calculator platform.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten in production
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

app.include_router(amortization.router, prefix="/api/amortization")
app.include_router(statistics.router, prefix="/api/statistics")
app.include_router(matrix.router, prefix="/api/matrix")
app.include_router(retirement.router, prefix="/api/retirement")


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "version": "1.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
