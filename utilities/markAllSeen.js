var chats=Store.Chat.models;
var ownId="917678138666@c.us";
var toSendMessages=[];
for(var chat=0;chat<chats.length;chat++) {
    var conversation = chats[chat];
    if (conversation.isUser) {
        if(conversation.unreadCount>0)
        {

            conversation.sendSeen();
        }
    }
}

