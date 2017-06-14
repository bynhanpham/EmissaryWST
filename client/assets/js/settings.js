// Declare JQuery global
/* global $ */

window.onload = function() {
    function GetURLParameter(sParam)
    {
        let sPageURL = window.location.search.substring(1);
        let sURLVariables = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++)
        {
            let sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return decodeURIComponent(sParameterName[1]);
            }
        }
    }

    let id = GetURLParameter('code');

    if(id){
        let clientSecret = "764f53937fa8ec4eeb75f261f6312988";
        let clientID = "167311421539.190332505280";
        $.post("https://slack.com/api/oauth.access",
            {
                'client_id': clientID,
                'client_secret': clientSecret,
                'code':id
            },
            function(data){
                console.log(data);
                let webhook  = data.incoming_webhook;
                let channel = webhook.channel;
                console.log("webhook:" + channel);
                console.log("token" + data.access_token);
                localStorage.setItem("slackToken", data.access_token);
                localStorage.setItem("slackChannel", channel);
            });
    }
};
