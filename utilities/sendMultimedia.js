var chats=Store.Chat.models;
var senderName="cclub admin";
for (chat in chats)
{
    var conversation=chats[chat];
    var groupName = conversation.__x_formattedTitle;
    if(groupName===senderName)
    {
        if(conversation.unreadCount>0)
        {
            var newMsgCount=conversation.unreadCount;
            //console.log(newMsgCount);
            var getMsgs=conversation.getAllMsgs();
            ///console.log(getMsgs);
            var unreadMsgs=getMsgs.splice(getMsgs.length-newMsgCount,getMsgs.length);
            console.log(unreadMsgs);
            sendMessage(unreadMsgs);

            conversation.sendSeen();
        }
    }
}

function  sendMessageMultimedia(unreadMsgs) {
    var recieverName="Bot testing 1";
    for (chat in chats)
    {
        var conversation=chats[chat];
        var groupName = conversation.__x_formattedTitle;
        if(groupName===recieverName)
        {
            conversation.forwardMessages(unreadMsgs);
            break;
        }
    }
}
