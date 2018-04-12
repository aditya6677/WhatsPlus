
var time=5000;

var dotask=setInterval(sendMessage,time);
var index=0;
var spamList={
    "919045321537@c.us":true,
    "16502898894@c.us":true,
    "918218962520@c.us":true,
    "917983354236@c.us":true,
};
var contacts=["917275493769@c.us"];
var delieveryCount=0;

function sendMessage()
{
    if(index==contacts.length) {
        clearInterval(dotask);
        return;
    }
    var Chats = Store.Chat.models;
    var contact = contacts[index];
    var message ="hello world";
//    contact = contact + "@c.us";

    if(contact in spamList) {
       console.log("Number in Spam list "+contact);
       index++;
        return;
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
            delieveryCount++;

        }
    }
    index++;
    console.log("Numbers processed- "+index+" "+"Total Successful Deliveries -  "+delieveryCount);
}