import json

from channels import Group
from channels.sessions import channel_session

def ws_connect(message):
    message.reply_channel.send({'accept': True})
    Group('charts', channel_layer=message.channel_layer).add(
        message.reply_channel)

def ws_message(message):
    print('aaa\n', message['text'])
    data = json.loads(message['text'])
    print('ddd\n', data)
    data['reply_channel'] = message.content['reply_channel']
    Group('charts', channel_layer=message.channel_layer).send(data)

def ws_disconnect(message):
    Group('charts').discard(message.reply_channel)