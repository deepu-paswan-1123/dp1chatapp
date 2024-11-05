import React, { useEffect, useState } from 'react';
import { Box,styled,InputBase } from '@mui/material';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicIcon from '@mui/icons-material/Mic';
import { uploadFile } from '../../drawer/service/Api';


const Container=styled(Box)`
    height:63px;
    background:#ededed;
    display:flex;
    align-items:center;
    padding:0 15px;
    

    & > * {
        margin:5px;
        color:#919191;
    }
`;

const Search=styled(Box)`
    background:#FFFFFF;
    border-radius:5px;
    width:calc(94% - 100px);
`;
const InputField=styled(InputBase)`
    width:100%;
    padding:20px;
    height:20px;
    font-size:14px;
`;

const ClipIcon=styled(AttachFileOutlinedIcon)`
    transform:rotate(40deg)
`


const Footer = ({SendText,setFooterText,FooterText,file,setFile,account,person,conversation}) => {
    
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default action (e.g., new line)
            SendText(e); // Pass the event object to SendText
            setFooterText(''); // Clear the input field
            
        }
    };



    // useEffect(()=>{
    //     const getImage= async()=>{
    //         if(file){
    //             const data=new FormData();
    //             data.append("name",file.name);
    //             data.append("file",file);

    //             await uploadFile(data);
                
    //             setFile(null);
    //             document.getElementById('fileInput').value = '';
    //         }
    //     }
    //     getImage();
    // },[file]);



    // this use effect check tmeporarily
    
    
    useEffect(() => {
        // Check if file is null or not
        if (!file) return;
    
        const getImage = async () => {
            // Create FormData only if there's a file
            if (file) {
                const data = new FormData();
                data.append("senderId", account.sub); 
                data.append("receiverId", person.sub); 
                data.append("conversationId", conversation._id); 
                data.append("type", 'file'); 
                data.append("file", file);
                for (let [key, value] of data.entries()) {
                    console.log(`${key}: ${value}`);
                }
        
                try {
                    // Log the file and form data
                    console.log('Uploading file:', file);
                    const response = await uploadFile(data);
                    console.log('File uploaded successfully:', response);
    
                    // Clear the file state and input field after successful upload
                    setFile(null);
                    document.getElementById('fileInput').value = '';
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        };
    
        // Call the getImage function
        getImage();
    }, [file, account, person, conversation, setFile]);  // Dependency on file state
    

    // this is function is write for select the files by clipicon use below 
    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(e);
        if (selectedFile) {
            setFile(selectedFile);
            setFooterText(selectedFile.name);  // Update FooterText with file name
        }
    };

   
    return (
        <Container>
            <InsertEmoticonOutlinedIcon />
            <label htmlFor="fileInput">
                <ClipIcon/>
            </label>
            <input 
                type="file" 
                id='fileInput' 
                style={{display:'none'}}
                onChange={(e)=>onFileChange(e)}
            />
            <Search>
                <InputField 
                    placeholder="Type a message" 
                    onChange={(e)=>setFooterText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={FooterText}
                    
                />
            </Search>
            <MicIcon />
        </Container>
    );
};


export default Footer;
