import React, { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import FormatDate from "../../../utils/CommonUtils";
import { AccountContext } from "../../context/AccountProvider";

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;
const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;

`;


const Image=styled('img')({
    width:300,
    height:'100%',
    objectFit:'contain',
    marginTop:20,
    marginBottom:20,
    marginLeft:20,
    
})

const ShowMessage = ({ message }) => {
  const { account } = useContext(AccountContext);

  return (
    <>
      {account.sub === message.senderId ? (
        <Own>
          {message.type === "text" ? (
            <Text>{message.text}</Text>
          ) : (
            message.type === "file" &&
            message.fileUrl && (
              <Image sx={{borderRadius:1}} src={message.fileUrl} alt={message.fileName} />
            )
          )}
          <Time>{FormatDate(message.createdAt)}</Time>
        </Own>
      ) : (
        <Wrapper>
          {message.type === "text" ? (
            <Text>{message.text}</Text>
          ) : (
            message.type === "file" &&
            message.fileUrl && (
              <Image sx={{borderRadius:1}} src={message.fileUrl} alt={message.fileName} />
            )
          )}
          <Time>{FormatDate(message.createdAt)}</Time>
        </Wrapper>
      )}
    </>
  );
};

export default ShowMessage;
