


var processedMsgs={};
var chats=Store.Chat.models;
var time=30000;
var doWork=setInterval(main,time);
var speakerGroup="cclub speaker";
var amaGroups=["Bot testing 1","Bot testing 2"];
var speakerName="*Aishwarya Singh*";
var mouthGroup="cclub mouth";
var runCount=0;

function main()
{
    console.log(runCount);
    //adminsToSpeaker();
    speakerTochannels();
    runCount++;
}

function  isCommand(body)
{
    if(body[0]=='#')
        return true;
    else
        return false;
}


function sendMessageToAMA(message)
{
for(var i=0;i<amaGroups.length;i++)
{
    var Chats = Store.Chat.models;
    var groupName = amaGroups[i];


    for (chat in Chats)
    {
        if (isNaN(chat))
        {
            continue;
        }
        ;
        //console.log(chat);
        if (Chats[chat].__x_isGroup === true)
        {
            if (Chats[chat].__x_formattedTitle === groupName)
            {

                Chats[chat].sendMessage(message);
                break;
            }
        }
    }
}
}

function speakerTochannels(){
console.log("speaker->channels");
    var toSendMessages=[];
    for (var i = 0; i < chats.length; i++)
    {
        var conversation = chats[i];
        if (conversation.__x_formattedTitle === speakerGroup)
        {
            if (conversation.unreadCount > 0)
            {
                var newMsgCount = conversation.unreadCount;
                console.log(newMsgCount);
                var getMsgs = conversation.getAllMsgs();
                var unreadMsgs = getMsgs.splice(getMsgs.length - newMsgCount, getMsgs.length);
                console.log(unreadMsgs);
                isnewMsg=false;
                for (var j = 0; j < unreadMsgs.length; j++) {
                    var Msg = unreadMsgs[j];
                    var sender = Msg.__x_author;
                    var body = Msg.__x_body;
                    var id = Msg.__x_id.id;
                    if (id in processedMsgs)
                        continue;
                    console.log(id);
                    processedMsgs[id] = true;
                    var fromMe = Msg.__x_id.fromMe;
                    if (fromMe)
                        continue;
                    console.log(Msg);
                    if(isCommand(body)){

                        console.log('Yes, from speaker and a command');
                        console.log(sender);
                        console.log(body);
                        var t_body=body.slice(1,body.length);
                        var finalMsg=speakerName+" says "+t_body;
                        console.log(finalMsg);
                       // toSendMessages.push(finalMsg);
                        toSendMessages.push(t_body);


                    }


                }
                if(!isnewMsg)
                {
                    console.log("No new Message to process in speaker group");
                }

            }
        }
        conversation.sendSeen();
    }


if(runCount===0)
    return ;
    console.log(toSendMessages);
    for (var i=0;i<toSendMessages.length;i++){
        sendMessageToAMA((toSendMessages[i]));
    }
}

function  adminsToSpeaker() {
    console.log("admins->speaker");
    var chats=Store.Chat.models;
    var toSendMessages=[];
    for (var i = 0; i < chats.length; i++) {
        var conversation = chats[i];
        if (conversation.__x_formattedTitle === mouthGroup) {
            if (conversation.unreadCount > 0) {
                var newMsgCount = conversation.unreadCount;
                console.log(newMsgCount);
                var getMsgs = conversation.getAllMsgs();
                var unreadMsgs = getMsgs.splice(getMsgs.length - newMsgCount, getMsgs.length);
                console.log(unreadMsgs);
                isnewMsg = false;
                for (var i = 0; i < unreadMsgs.length; i++) {
                    var Msg = unreadMsgs[i];
                    var sender = Msg.__x_author;
                    var body = Msg.__x_body;
                    var id = Msg.__x_id.id;
                    if (id in processedMsgs)
                        continue;
                    processedMsgs[id] = true;
                    var fromMe = Msg.__x_id.fromMe;
                    if (fromMe)
                        continue;

                    console.log(Msg);
                    isnewMsg=true;
                    if (isCommand(body)) {
                        console.log('Yes, from Admins and a command');

                        var question=Msg.__x_quotedMsg.body;
                        console.log(question);
                        toSendMessages.push(question);

                    }

                }
                if (!isnewMsg) {
                    console.log("No new Message to process in mouth");
                }
                conversation.sendSeen();
            }
        }
    }
    if(runCount===0)
        return ;

    for(var i=0;i<toSendMessages.length;i++){
        sendMessageToSpeakerGroup(question);
    }

}

function  sendMessageToSpeakerGroup(message)
{
    var Chats = Store.Chat.models;
    var groupName =speakerGroup;


    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        };
        //console.log(chat);
        if (Chats[chat].__x_isGroup === true) {
            if (Chats[chat].__x_formattedTitle === groupName) {

                Chats[chat].sendMessage(message);
            };
        }
    }
}