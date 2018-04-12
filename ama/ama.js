var processedMessages={};
var spamList={
    "16502898894@c.us":true,
};
var time=30000;
var dowork=setInterval(main,time);
var firstrun=true;
var consoleGroup="WhatsPlus production";
var mouthGroup="WhatsPlus mouth";

var amaFlag=false;
var amaRunCount=0;
var speakerGroup="WhatsPlus speaker";
var amaGroups=["WhatsPlus AMA 1","WhatsPlus AMA 2","WhatsPlus AMA 3"];
var speakerName="xyz";


function main() {
    pushMessage();
    var newMsg=checkMessage();
    if(firstrun){
        console.log("This was first run");
        firstrun=false;
        return ;
    }
    if(newMsg!=null){
        console.log(newMsg);
        if(isCommand(newMsg)) {
            console.log("It's a command");
            switch (checktype(newMsg))
            {
                case 'i':console.log("individual");
                    processIndividualMessage(newMsg);
                    break;
                case 'g': console.log("group");
                    processGroupParticipants(newMsg);
                    break;
                case 's': console.log("start a Service");
                    console.log(newMsg);
                    var serviceName=processService(newMsg);
                    console.log(serviceName);
                    switch(serviceName)
                    {
                        case 'ama':
                            amaFlag=true;
                            console.log("AMA service is started");
                            break;
                    }
                    break;
                case 'x' : console.log("stop a Service");
                    console.log(newMsg);
                    var serviceName=processService(newMsg);
                    console.log(serviceName);
                    switch(serviceName)
                    {
                        case 'ama':
                            amaFlag=false;
                            amaRunCount=0;
                            console.log("AMA service is stopped");
                            break;
                    }
                    break;
            }

            //process(newMsg);
        }
    }
    else{
        console.log("No new Message to process");
    }
    if(amaFlag)
        ama();
}

function checktype(newMsg) {
    var c=newMsg[8];
    console.log(c);
    return c;
}

function checkMessage() {
    var chats = Store.Chat.models;
    for (chat in chats) {
        var conversation = chats[chat];
        if (conversation.__x_formattedTitle ===consoleGroup) {
            var messages = conversation.__x_previewMessage;
            var msgBody = messages.__x_body;
            var msgId = messages.__x_id.id;
            if(msgId in processedMessages)
                return null;
            else {
                console.log(msgBody+" "+msgId);
                processedMessages[msgId]=true;
                return msgBody;
            }
        }
    }
}

function isCommand(newMsg){
    if(newMsg[0]=='$')
        return true;
    else
        return false;
}

function processGroupParticipants(newMsg) {
    var res=newMsg.slice(10,newMsg.length);
    var groupName="";
    var message="";
    var flag=false;
    for(var i=0;i<res.length;i++){
        if(res[i]===','&&flag===false){
            flag=true;
            continue;
        }
        if(flag)
            message=message+res[i];
        else
            groupName=groupName+res[i];
    }
    console.log("group name is- "+groupName);
    console.log(groupName.length);
    console.log("message is- "+message);

    sendMessageToParticipants(groupName,message);
}

function processIndividualMessage(newMsg) {
    var res=newMsg.slice(10,newMsg.length);
    var individualName="";
    var message="";
    var flag=false;
    for(var i=0;i<res.length;i++){
        if(res[i]===','&&flag===false){
            flag=true;
            continue;
        }
        if(flag)
            message=message+res[i];
        else
            individualName=individualName+res[i];
    }
    console.log("Individual id is- "+individualName);
    console.log(individualName.length);
    console.log("message is- "+message);

    sendMessageToIndividual(individualName,message);
}

function sendMessageToIndividual(contact,message) {

    var Chats = Store.Chat.models;
    contact=contact+"@c.us";

    if(contact in spamList){
        console.log("Number is in spamList");
        return ;
    }

    flag = false;

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.contact = Chats[chat].__x__formattedTitle;
        temp.id = Chats[chat].__x_id;
        if (temp.id.search(contact) != -1 ) {
            flag = true;
        }
    }
    console.log(contact);
    if (!flag) {
        Store.Chat.gadd(contact);
    }

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.contact = Chats[chat].__x__formattedTitle;
        temp.id = Chats[chat].__x_id;
        if (temp.id.search(contact) != -1 ) {
            Chats[chat].sendMessage(message);

        }
    }

}



function sendMessageToParticipants(group,message) {
    console.log(group);
    var chats = Store.Chat.models;
    var map={};


    for (chat in chats) {
        var conversation = chats[chat];
        if (conversation.__x_isGroup === true) {
            var groupName = conversation.__x_formattedTitle;
            var groupId = conversation.__x_id;
            if (groupName===group) {   /*If group is cclub then*/

                var participants = conversation.__x_groupMetadata.participants.models;
                console.log(participants);
                if (participants.length === 0)
                    continue;

                for (i in participants) {

                    var userId = participants[i].__x_id;

                    if(userId in spamList){
                        console.log("Number in spam list");
                        continue;
                    }

                    if (userId === undefined || groupId === undefined)
                        continue;
                    console.log(userId + " " + groupId);

                    //Addded message part here*
                    var Chats = Store.Chat.models;
                    var contact = userId;

                    var flag = false;
                    for (chat in Chats) {
                        if (!isNaN(chat)) {
                            var temp = {};
                            temp.contact = Chats[chat].__x__formattedTitle;
                            temp.id = Chats[chat].__x_id;
                            if (temp.id === contact && temp.id.search('g.us') === -1) {
                                flag = true;
                                break;
                            }
                        }

                    }



                    if (!flag) {
                        Store.Chat.gadd(userId);
                    }
                    var Chats = Store.Chat.models;
                    var contact = userId;


                    var flag = false;
                    for (chat in Chats) {
                        if (!isNaN(chat)) {
                            var temp = {};
                            temp.contact = Chats[chat].__x__formattedTitle;
                            temp.id = Chats[chat].__x_id;
                            if (temp.id === contact) {
                                flag = true;

                                if (temp.id in map)
                                    continue;
                                else
                                    map[temp.id]=true;Chats[chat].sendMessage(message);
                                console.log(temp.id);
                                break;
                            }

                        }


                    }


                }
                console.log("\n");


            }
        }
    }

}

function  pushMessage() {
    var chats=Store.Chat.models;
    var ownId="917678138666@c.us";
    var toSendMessages=[];
    for(var chat=0;chat<chats.length;chat++) {
        var conversation = chats[chat];
        if (conversation.isUser) {
            if(conversation.unreadCount>0)
            {
                conversation.sendSeen();
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
                    var msgId=Msg.__x_id.id;
                    if(msgId in processedMessages)
                        continue;
                    processedMessages[msgId]=true;
                    if(sender!=ownId&&sender!=undefined){
                        console.log("Sender is- "+sender);
                        console.log("Message is- "+body);
                        toSendMessages.push(sender+" says- "+body);
                    }
                }


            }
        }
    }

    console.log(toSendMessages);
    for (var i=0;i<toSendMessages.length;i++){
        sendMessage((toSendMessages[i]));
    }


    function sendMessage(message) {

        var Chats = Store.Chat.models;
        var groupName =mouthGroup;


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
}

function processService(newMsg) {
    var serviceName=newMsg.slice(10,newMsg.length);
    serviceName=serviceName.toLowerCase();
    return serviceName;
}

function ama()
{

    console.log("AMA chal raha hai bhaiya");
    speakerTochannels();
    amaRunCount++;
}

function  speakerTochannels()
{
    console.log("speaker->channels");
    var toSendMessages=[];
    var chats=Store.Chat.models;
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
                    if (id in processedMessages)
                        continue;
                    processedMessages[id] = true;
                    var fromMe = Msg.__x_id.fromMe;
                    if (fromMe)
                        continue;
                    console.log(Msg);
                    if(isAMACommand(body)){
                        console.log('Yes, from speaker and a command');
                        console.log(Msg);
                        console.log(Msg.quotedMsgObj());
                        toSendMessages.push(Msg.quotedMsgObj());
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


    if(amaRunCount===0)
        return ;
    console.log(toSendMessages);
    sendMessageMultimedia(toSendMessages);
}

function  sendMessageMultimedia(unreadMsgs) {

    for(var i=0;i<amaGroups.length;i++) {
        var recieverName=amaGroups[i];
        var chats=Store.Chat.models;
        for (chat in chats) {
            var conversation = chats[chat];
            var groupName = conversation.__x_formattedTitle;
            if (groupName === recieverName) {
                conversation.forwardMessages(unreadMsgs);
                break;
            }
        }
    }
}

function  isAMACommand(body)
{
    if(body[0]=='#')
        return true;
    else
        return false;
}
