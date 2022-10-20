import React, { useEffect, useState } from 'react';
import { Channel, DefaultGenerics, StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/v2/index.css';
import {
  Chat as ChatContainer,
  Channel as ChannelContainer,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window
} from 'stream-chat-react';

function Chat() {

  const [client, setClient] = useState<StreamChat<DefaultGenerics>>();
  const [channel, setChannel] = useState<Channel<DefaultGenerics>>();

  const user = {
    id: 'player'
  }

  useEffect(() => {
    (async () => {
      const client = StreamChat.getInstance('azsx7wv8sqyz');
      await client.connectUser(user, client.devToken(user.id));

      const channel = client.channel('messaging', 'chat', {
        members: [user.id]
      });
      await channel.watch();

      setClient(client);
      setChannel(channel);
    })();
  }, []);

  return (
    <div className="chat-wrapper">
      {client &&
        <ChatContainer client={client} theme='str-chat__theme-dark'>
          <ChannelContainer channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </ChannelContainer>
        </ChatContainer>
      }
    </div>
  );
}

export default Chat;
