import React, { useContext,useEffect,useRef,useState } from 'react';
import { Box,styled } from '@mui/material';
import Footer from './Footer';
import { AccountContext } from '../../context/AccountProvider';
import { newMessage, uploadFile } from '../../drawer/service/Api';
import { getMessages } from '../../drawer/service/Api';
import ShowMessage from './ShowMessage';


const Wrapper=styled(Box)`
    background-image:url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size:50%;
    
`

const Component=styled(Box)`
    height:65vh;
    overflow-y:scroll;
    padding-bottom:55px;
    
`

const Wrap=styled(Box)`
    padding:1px 80px;
`

const Messages = ({person,conversation}) => {

    console.log("person message",person)
    console.log("conversatio message",conversation)
    const [FooterText,setFooterText] = useState('');
    const [messages, setMessages] = useState([]);
    const{account,socket,newMessageFlag,setnewMessageFlag} = useContext(AccountContext);
    
    const [file,setFile]=useState();
    const [incomingMessage,setIncomingMessage]=useState(null);
    

    useEffect(() => {
        socket.current.on("getMessage", data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            });
        });
    }, []);
    
    
    useEffect(() => {
        const getMessagesDetails = async () => {
            if (conversation && conversation._id) {  
                const data = await getMessages(conversation._id);  
                // console.log("Fetched messages:", data);
                setMessages(data);  // Update the state with fetched messages
            } else {
                console.log("No conversation._id available");
            }
        };
        conversation._id && getMessagesDetails();
    }, [conversation._id, person._id, newMessageFlag]);
    

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId)
        && setMessages(prev => [...prev, incomingMessage]);
    }, [incomingMessage, conversation]);
    
    

    const SendText = async (e) => {
        const Code = e.keyCode || e.which;
        if (Code === 13) {
            e.preventDefault(); // Prevent default behavior (e.g., new line)
    
            if (file) {
                // Handle file upload if there's a file
                const formData = new FormData();
                formData.append("senderId", account.sub); 
                formData.append("receiverId", person.sub); 
                formData.append("conversationId", conversation._id); 
                formData.append("type", 'file');
                formData.append("file", file); 
                
                try {
                    
                    const response = await uploadFile(formData);
                    const fileUrl = response.data.imageUrl;
    
                    const message = { //replace fileMessage
                        senderId: account.sub,
                        receiverId: person.sub,
                        conversationId: conversation._id,
                        type: 'file',
                        fileUrl: fileUrl,
                        fileName: file.name,
                    };
    
                    await newMessage(message);
                    setFile(null); // Clear the file state
                    document.getElementById('fileInput').value = ''; // Clear the file input
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            } else {
                // Handle text message
                const message = {   //replace texMessage
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: FooterText,
                };
                
                socket.current.emit("sendMessage",message);

                await newMessage(message);
                setFooterText(''); // Clear the input field
            }
    
            // Toggle the flag to refresh the messages
            setnewMessageFlag(prev => !prev);
        }
    };
    
    const scrollRef=useRef();

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);
    

    return (
        <>
            <Wrapper>
                <Component>
                    {
                        messages && messages.length > 0 ? (
                            messages.map(message => (
                                <Wrap key={message._id} ref={scrollRef}>
                                    <ShowMessage message={message} />
                                </Wrap>
                            ))
                        ) : (
                            <div>No messages available</div>
                        )
                    }
                </Component>
                

                <Footer 
                    
                    SendText={SendText}
                    setFooterText={setFooterText}
                    FooterText={FooterText}
                    file={file}
                    setFile={setFile}
                    account={account}
                    person={person}
                    conversation={conversation}
                />
            </Wrapper>
        </>
    );
}


export default Messages;











