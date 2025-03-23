FROM python:3.10.14-slim

WORKDIR /model_app

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

COPY requirements.txt .
RUN pip install -r requirements.txt 

COPY api/  /model_app/api/
COPY saved_model/  /model_app/saved_model/
COPY startup.sh /model_app/startup.sh

WORKDIR /model_app
RUN chmod +x startup.sh

ENTRYPOINT [ "./startup.sh" ]
