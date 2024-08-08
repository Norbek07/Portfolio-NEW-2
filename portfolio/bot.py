import requests
from environs import Env
env = Env()
env.read_env()
def send_message(text):
    BOT_TOKEN=env.str("BOT_TOKEN")
    CHAT_ID=env.str("CHAT_ID")
    PHOTO="https://www.thoughtco.com/thmb/w9h2eusNboflTm20DRXO1NL7Sbw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/a-right-hand-of-asian-skin-is-sending-letter-to-post-box-974020720-5c5f239646e0fb0001ca87ba.jpg"
    TEXT=text
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendphoto?chat_id={CHAT_ID}&photo={PHOTO}&caption={TEXT}"
    response = requests.get(url)
#   print(response.status_code)