from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
import pandas as pd
import pickle
import os
from tensorflow.keras.models import load_model
import os
from PIL import Image
from io import BytesIO
from fastapi.responses import JSONResponse

# Load the saved model
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from numpy import asarray


app = FastAPI()

# Define a Pydantic model for input data
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


class InputData1(BaseModel):
    module_temperature: float
    ambient_temperature: float
    irradiation: float
    time_category_encoded: float


class InputData2(BaseModel):
    array: list = []


@app.post("/predict/")
async def predict_solar_power(data: InputData1):
    # Create a dictionary to match the model's input format

    if data.irradiation < 0.0001:
        return {"predicted_solar_power_kW": 0}

    with open("newmodel.pkl", "rb") as file:
        model = pickle.load(file)

    # morn 3, noon 2, eve 1, night 0
    input_data = {
        "AMBIENT_TEMPERATURE": [data.ambient_temperature],
        "MODULE_TEMPERATURE": [data.module_temperature],
        "Time_Category_Encoded": [data.time_category_encoded],
        "IRRADIATION": [data.irradiation],
    }

    input_df = pd.DataFrame(input_data)
    print(input_df)
    prediction = model.predict(input_df)
    print(prediction)
    # Return the prediction as a float

    return {"predicted_solar_power_kW": float(prediction)}


import shutil


@app.post("/predictive/")
async def upload_image(image: UploadFile = File(...)):
    try:
        model = tf.keras.models.load_model("predictivemodel.h5")
        image_bytes = await image.read()
        # print(image_bytes)
        # print("hello")
        # image_tensor = tf.io.decode_image(image_bytes)
        # # print(image_tensor)
        # image_array = image_tensor.numpy()
        # print(image_array)
        # x = tf.keras.applications.vgg16.preprocess_input(image_array)

        # predictions = model.predict(tf.expand_dims(x, 0))

        image_array = tf.image.decode_image(image_bytes)  # Decode image bytes
        image_array = tf.image.resize(
            image_array, [244, 244]
        )  # Resize image to match VGG16 input shape

        image_array = tf.expand_dims(image_array, axis=0)  # Add batch dimension
        # print(image_array)
        predictions = model.predict(image_array)

        print(predictions)
        score = tf.nn.softmax(predictions)
        class_names1 = [
            "Bird-drop",
            "Clean",
            "Dusty",
            "Electrical-damage",
            "Physical-Damage",
            "Snow-Covered",
        ]
        print(class_names1[np.argmax(score)])
        # class_names1[np.argmax(score)]

        return {"filename": image.filename, "result": class_names1[np.argmax(score)]}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
