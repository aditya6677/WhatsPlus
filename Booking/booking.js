var chats=Store.Chat.models;
var ownId="919045321537@c.us";
var recievers1=[];
var messages1=[];
var recievers2=[];
var messages2=[];
var processedMessages={};
var time=30000;
var globalSender="";
var dowork=setInterval(main,time);
var runCount=0;

function  main() {


    getMessages();
    sendMessagesUserToHospitals();
    sendMessagesHospitalsToUser();

    runCount++;
    console.log(runCount);
}

function getMessages() {

    for (chat in chats) {
        var conversation = chats[chat];
        if (isNaN(chat)) {
            continue;
        }

        if (conversation.unreadCount > 0) {

            if(conversation.isUser) {
                var newMsgCount = conversation.unreadCount;
                var getMsgs = conversation.getAllMsgs();
                var unreadMsgs = getMsgs.splice(getMsgs.length - newMsgCount, getMsgs.length);
//            console.log(unreadMsgs);
                for (var i = 0; i < unreadMsgs.length; i++) {
                    var Msg = unreadMsgs[i];
                    var sender = Msg.__x_from;
                    var body = Msg.__x_body;
                    var msgId = Msg.__x_id.id;
                    if(msgId in processedMessages)
                        continue;
                    processedMessages[msgId]=true;
                    if (sender != ownId && sender != undefined) {


                        if (body[0] === '#') {
                            console.log(conversation);
                            console.log(sender);
                            console.log(body);
                            var sender=sender.substring(0,sender.length-5);
                            var splitArray=body.split(",");
                            var reciever = splitArray[0];
                            reciever = reciever.substring(1, reciever.length).toLowerCase();
                            var message = splitArray[1];
                            console.log("Reciever is - ", reciever);
                            console.log("Message is- "+sender+" says "+message);
                            var finalMessage="*"+sender+"*"+" says - "+message;
                            recievers1.push(reciever);
                            messages1.push(finalMessage);
                        }

                      else  if(body[0]==='$'){

                            console.log(conversation);
                            var sender=sender.substring(0,sender.length-5);
                            console.log(sender);
                            globalSender=sender;
                            console.log(body);
                            var disease=body.substring(1,body.length);
                            var endpoint='http://18.221.40.67:7676/'+disease;
                            $.ajax({
                                type: 'GET',
                                url: endpoint,
                                success: function(data,sender) {
                                    console.log(data.disease[0].name);
                                    console.log(data.disease[0].symptoms);
                                    console.log(data.disease[0].medicine);
                                    console.log(data);
                                    var finalMsg="*Disease* - "+data.disease[0].name+" *Symptoms* -"+data.disease[0].symptoms+" *Recommended Medicines* - "+data.disease[0].medicine;
                                    console.log(finalMsg);
                                    sendMessageUtility2(finalMsg);
                                    },
                                contentType: "application/json; charset=utf-8",
                                dataType: 'json'
                            });
                        }

                    }
                }
            }
            else{

                var newMsgCount = conversation.unreadCount;
                var getMsgs = conversation.getAllMsgs();
                var unreadMsgs = getMsgs.splice(getMsgs.length - newMsgCount, getMsgs.length);
//            console.log(unreadMsgs);
                for (var i = 0; i < unreadMsgs.length; i++) {
                    var Msg = unreadMsgs[i];
                    var sender = Msg.__x_from;
                    var body = Msg.__x_body;
                    var msgId = Msg.__x_id.id;
                    var groupName = conversation.__x_formattedTitle;
                    if(msgId in processedMessages)
                        continue;
                    processedMessages[msgId]=true;
                    if (sender != ownId && sender != undefined) {
                        if(body[0]==='#') {
                            console.log(conversation);
                            console.log(body);
                            var splitArray = body.split(",");
                            var reciever = splitArray[0];
                            reciever = reciever.substring(1, reciever.length);
                            var message = splitArray[1];
                            // console.log("Reciever is - ", reciever);
                            // console.log("Message is - ",message);
                            var finalMessage = "*" + groupName + "*" + " says - " + message;
                            recievers2.push(reciever);
                            messages2.push(finalMessage);
                            console.log(reciever);
                            console.log(finalMessage);
                        }
                    }
                }

                    }
        }
         conversation.sendSeen();
    }
}


function sendMessagesUserToHospitals() {
   // var reciepent = "hospital a";
   // var message = "hello";
for(var i=0;i<recievers1.length;i++){
    var chat = Store.Chat.models;
    for (chat in chats) {
        if (isNaN(chat)) {
            continue;
        }
        var conversation = chats[chat];
        var groupName = conversation.__x_formattedTitle;
        groupName = groupName.toLowerCase();
        if (groupName === recievers1[i]) {
            console.log(groupName);
            conversation.sendMessage(messages1[i]);
            break;
        }
    }
}
recievers1=[];
    messages1=[];
}






function sendMessagesHospitalsToUser(){

    for(var i=0;i<recievers2.length;i++){
    sendMessageUtility(recievers2[i],messages2[i]);
    }
    recievers2=[];
    messages2=[];
}

function  sendMessageUtility(contact,message) {
    var Chats = Store.Chat.models;
    contact = contact + "@c.us";


    flag = false;

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.contact = Chats[chat].__x__formattedTitle;
        temp.id = Chats[chat].__x_id;
        if (temp.id.search(contact) != -1) {
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
        if (temp.id.search(contact) != -1) {
            Chats[chat].sendMessage(message);

        }
    }

}

function  sendMessageUtility2(message) {
    var Chats = Store.Chat.models;
    contact=globalSender;
    contact = contact + "@c.us";


    flag = false;

    for (chat in Chats) {
        if (isNaN(chat)) {
            continue;
        }
        ;
        var temp = {};
        temp.contact = Chats[chat].__x__formattedTitle;
        temp.id = Chats[chat].__x_id;
        if (temp.id.search(contact) != -1) {
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
        if (temp.id.search(contact) != -1) {
            Chats[chat].sendMessage(message);

        }
    }

}