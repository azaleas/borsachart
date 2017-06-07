import json

from channels import Group
from channels.sessions import channel_session

from charts.api.helpers import send_redis_data

def ws_connect(message):
    message.reply_channel.send({'accept': True})
    Group('charts', channel_layer=message.channel_layer).add(
        message.reply_channel)
    send_redis_data()

# def ws_message(message):
#     pass

def ws_disconnect(message):
    Group('charts').discard(message.reply_channel)