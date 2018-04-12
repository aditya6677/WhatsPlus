var chats=Store.Chat.models;
var ownId="917678138666@c.us";
var toSendMessages=[];
for(var chat=0;chat<chats.length;chat++) {
    var conversation = chats[chat];
    if (conversation.isUser) {
        if(conversation.unreadCount>0)
        {
            var newMsgCount=conversation.unreadCount;
            //console.log(newMsgCount);
            var getMsgs=conversation.getAllMsgs();
            ///console.log(getMsgs);
            var unreadMsgs=getMsgs.splice(getMsgs.length-newMsgCount,getMsgs.length);
            console.log(unreadMsgs);
            for(var i=0;i<unreadMsgs.length;i++){
                var Msg=unreadMsgs[i];
                var sender=Msg.__x_from;
                var body=Msg.__x_body;
                if(sender!=ownId&&sender!=undefined){
                    console.log("Sender is- "+sender);
                    console.log("Message is- "+body);
                    toSendMessages.push(sender+" says- "+body);
                }
            }
            conversation.sendSeen();
        }
    }
}

console.log(toSendMessages);
for (var i=0;i<toSendMessages.length;i++){
    sendMessage((toSendMessages[i]));
}



function sendMessage(message) {

    var Chats = Store.Chat.models;
    var groupName = "cclub mouth";


    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        };
        //console.log(chat);
        if (Chats[chat].__x_isGroup === true) {
            if (Chats[chat].__x_formattedTitle == groupName) {

                Chats[chat].sendMessage(message);
            };
        }
    }

};