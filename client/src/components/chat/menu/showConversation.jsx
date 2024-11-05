import React, { useContext,useEffect, useState } from 'react';
import { Typography,Box } from '@mui/material';
import {styled} from '@mui/material';
import { AccountContext } from '../../context/AccountProvider';
import { setConversation } from '../../drawer/service/Api';
import { getConversation } from '../../drawer/service/Api';
import { UserContext } from '../../context/UserProvider';
import FormatDate from '../../../utils/CommonUtils';

const ConversationComponent=styled(Box)`
    display:flex;
    height:45px;
    padding:13px 0;
    cursor:pointer;
`

const Image=styled('img')({
    height:50,
    width:50,
    borderRadius:'50%',
    padding:'0 14px',
})

const Container=styled(Box)`
    display:flex

`;

const Timestamp=styled(Typography)`
    font-size:12px;
    margin-left:auto;
    margin-right:20px;
    color : #00000099;
`;
const Text=styled(Typography)`
    font-size:14px;
    color : rgba(0,0,0,0.6);
    margin-left:20px;
`;


const ShowConversation = ({user}) => {

    
    const {account,setAccount,newMessageFlag,setnewMessageFlag}=useContext(AccountContext);
    const {person,setPerson}=useContext(UserContext);
    const [message,setMessages] = useState({});

    useEffect(()=>{
        const getConversationDeatails = async ()=>{
            const data = await getConversation({senderId:account.sub,receiverId:user.sub});
            console.log("getconversation data of user",data);
            setMessages({text:data?.message,timestamp:data?.updatedAt})
        }
        getConversationDeatails();
    },[newMessageFlag])




    
    
    const GetShowUser=async()=>{
        setPerson(user);
        await setConversation({senderId:account.sub,receiverId:user.sub });
    }
    
  
    

    return (
        <ConversationComponent onClick={()=> GetShowUser()}>
            <Box>
                <Image src={user.picture} alt="dp" />
            </Box>
            <Box style={{width:'100%'}}>
                <Container>
                    <Typography>{user.name}</Typography>
                    {
                        message?.text && 
                        <Timestamp>{FormatDate(message?.timestamp)}</Timestamp>
                    }
                </Container>
                <Text>{message.text}</Text>
            </Box>
        </ConversationComponent>
    );
}

export default ShowConversation;
