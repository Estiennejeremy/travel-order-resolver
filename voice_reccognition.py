import speech_recognition
import pyttsx3

recogni = speech_recognition.Recognizer()

record_btn = True

while record_btn:
    try:
        with speech_recognition.Microphone() as mic:
            recogni.adjust_for_ambient_noise(mic, duration=0.2)
            audio = recogni.listen(mic)

            text = recogni.recognize_google(audio)
            print(f"rec : {text.tolower()}")

    except speech_recognition.UnknownValueError():
        recogni = speech_recognition.Recognizer()
        continue
