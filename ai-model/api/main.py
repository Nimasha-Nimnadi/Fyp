import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
import uvicorn
from io import BytesIO
from PIL import Image
import tensorflow as tf
import cv2
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # add origins
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["*"],

)

# MODEL = tf.keras.models.load_model("/home/chamath/projects/dermatology-diagnostic-tool/ai-model/saved_model/restNet50")  # enter the model path in local computer
MODEL = tf.keras.models.load_model("C:/Users/user/Desktop/ESOFT TOPUP/project/DermaInsight/derm/ai-model/saved_model/restNet50")  # enter the model path in docker container
CLASS_NAMES = ["Eczema", "Psoriasis"]


@app.get("/ping")
async def ping():
    return "Hello"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image = read_file_as_image(image_data)

        # Apply Gaussian blur
        gaussian_blur = cv2.GaussianBlur(image, (7, 7), 2)

        # Perform image sharpening
        sharpened_img = cv2.addWeighted(image, 1.5, gaussian_blur, -0.5, 0)

        # resize image
        resized_image = cv2.resize(sharpened_img, (224, 224))

        img_batch = np.expand_dims(resized_image, 0)
        predictions = MODEL.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
        confidence_precentage = confidence * 100

        return {
            'class': predicted_class,
            'confidence': confidence_precentage
        }

    except HTTPException as http_exc:
        raise http_exc #re-raise HTTPException that has already been created.

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8080)
