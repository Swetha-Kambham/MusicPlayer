import cv2
import numpy as np 
import base64

from deepface import DeepFace

# Load face cascade classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


def get_emotion_predictions_from_base64_image(base64_string):
    encoded_data = base64_string.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    face_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    try:
        face_img = cv2.cvtColor(face_img, cv2.COLOR_BGR2RGB)
    except:
        pass
    labels=[]
    faces = face_cascade.detectMultiScale(face_img, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Extract the face ROI (Region of Interest)
        face_roi = face_img[y:y + h, x:x + w]

        
        # Perform emotion analysis on the face ROI
        result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)

        # Determine the dominant emotion
        emotion = result[0]['dominant_emotion']
        labels.append(emotion)
    return labels

