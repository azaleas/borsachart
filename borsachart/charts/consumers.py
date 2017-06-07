import json

from channels import Group

def ws_connect(message):
    message.reply_channel.send({'accept': True})
    Group('charts', channel_layer=message.channel_layer).add(
        message.reply_channel)

# def ws_message(message):
#     pass

def ws_disconnect(message):
    Group('charts').discard(message.reply_channel)