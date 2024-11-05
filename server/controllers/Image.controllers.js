
import Message from "../models/FooterMessage.model.js"

const url= "http://localhost:8000";



export const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({ message: "File not found" });
    }

    try {
        const { senderId, receiverId, conversationId, type, text,} = req.body;
        console.log("this backend sender id file",senderId);
        console.log("this backend receiver id file",receiverId);
        console.log("this backend conversation id  file",conversationId);
        console.log("this backend type of  file",type);
        console.log("this backend text of  file",text);

        const {filename :fileName, path:fileUrl}= req.file;

        const message = new Message({
            senderId,
            receiverId,
            conversationId,
            type,
            text,
            fileUrl: "http://localhost:8000\\"+fileUrl, // For file messages
            fileName // For file messages
        });

        await message.save();
       return res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: "Error saving message", error });
    }
};


