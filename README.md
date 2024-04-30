# MusicPlayer

# To run the application

prerequisite
* node version 20 or above
* npm version 10 or above

# Steps to run frontend:

* npm install
* put your audio files in below directories -

   * src/assets/mp3-songs/happy
   * src/assets/mp3-songs/sad
   * src/assets/mp3-songs/anger
   * src/assets/mp3-songs/fear
   * src/assets/mp3-songs/surprise
   * src/assets/mp3-songs/neutral
     
  supported audio formats are -
   "mp3", "mpeg", "opus", "ogg", "oga", "wav", "aac", "caf", "m4a", "m4b", "mp4", "weba", "webm", "dolby", "flac".

* npm run sync-audio
* npm start

# Steps to run backend:

prerequisite
python 3.11.x installed

# To Run
* pip install virtualenv
* virtualenv devenv
* python -m venv devenv
* devenv\Scripts\activate(windows) or source ./devenv/bin/activate env(for mac)
* devenv\Scripts\pip.exe install -r requirements.txt  (for windows) or devenv\bin\pip install -r requirements.txt  (for mac)
* python3 server.py
