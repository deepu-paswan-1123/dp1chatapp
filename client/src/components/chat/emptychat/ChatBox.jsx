

import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import { AccountContext } from '../../context/AccountProvider';
import { getConversation } from '../../drawer/service/Api';
import { UserContext } from '../../context/UserProvider';

const ChatBox = () => {
    const { person } = useContext(UserContext);
    const { account } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});
    const [conversationIds, setConversationIds] = useState({ senderConversationId: '', receiverConversationId: '' });
    
   
    
    
    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
            setConversation(data);
        }
        getConversationDetails();
    }, [person.sub]);

    console.log("this is chatbox conversaton ",conversation);
    return (
        <Box>
            <ChatHeader person={person} />
            <Messages
                person={person}
                conversation={conversation}
                // conversationIds={conversationIds}
            />
        </Box>
    );
}

export default ChatBox;

