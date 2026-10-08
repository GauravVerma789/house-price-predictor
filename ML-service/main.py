from fastapi import FastAPI
import joblib
from pydantic import BaseModel
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
model = joblib.load(BASE_DIR / "model.joblib")
app = FastAPI()


class HouseData(BaseModel):
    features: list[float]


@app.get("/")
def Home():
    return {"message":"ml-service running"}

@app.post("/predict")
def predict(data: HouseData):
    prediction = model.predict([data.features])

    return {
        "predicted_price": prediction[0]
    }