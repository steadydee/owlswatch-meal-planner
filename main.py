from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Owl's Watch Meal Planner API is running."}
