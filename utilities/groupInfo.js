
$(document).ready()
{
    var chats = Store.Chat.models;
    for (chat in chats) {
        var conversation = chats[chat];
        if (conversation.__x_isGroup === true) {
            var groupName = conversation.__x_formattedTitle;
            var groupId = conversation.__x_id;
            if (groupName.search("cclub") != -1) {   /*If group is cclub then*/

                var participants = conversation.__x_groupMetadata.participants.models;
                console.log(participants);
                if(participants.length===0)
                    continue;
                for (i in participants){
                    var userId=participants[i].__x_id;
                    console.log(userId+" "+groupId);
                    if(userId===undefined||groupId===undefined)
                        continue;
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/user',
                        data: JSON.stringify({"UserId":userId,"GroupId":groupId,"GroupName":groupName}), // or JSON.stringify ({name: 'jonas'}),
                        success: function(data) {console.log(data); },
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json'
                    });
                }
                console.log("\n");

            }
        }
    }
}
