var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

var baseURL = 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api';

function createCard(isOnline, data) {
    console.warn('createCard() called with paramters', isOnline, data);
    var card = '';
    console.warn('building card');
    if (isOnline) {
      card += '<div class="card-block online">';
    }
    else {
      card += '<div class="card-block offline">';
    }
    card += '<div class="media">';
    card += '<div class="media-left">';
    card += '<img class="icon" src="' + data.logo + '" alt="Image">';
    card += '</div>';
    card += '<div class="media-body">';
    card += '<h4 class="mt-0">' + data.display_name + '</h4>';
    card += '<a href="' + data.url + '">@' + data.name + '</a> &#8212;';
    card += data.status;
    card += '</div>';
    card += '</div>';
    card += '</div>';
    card += '</div>';
    console.warn(card);
    return $(card);
};

function missingCard(notify) {
    console.warn('missingCard() called with parameter', notify);
    var warning = '';
    warning += '<div class="card missing">';
    warning += notify;
    warning += '</div>';
    return $(warning);
};

function cardContent(isOnline, name) {
  $.getJSON(baseURL + '/channels/' + name + '/', function(data) {
    if (data.status === 404) {
      var warning = missingCard(data.message);
      $('#all').append(warning);
      return;
    }
    var card = createCard(isOnline, data);
    if (isOnline) {
      $(card).appendTo('#all, #online');
    }
    else {
      $(card).appendTo('#all, #offline');
    }  });
};

function checkStatus() {
    channels.forEach(function(channel) {
        $.getJSON(baseURL + '/streams/' + channel + '/', function(data) {
                console.warn('getJSON successful');
                console.warn(data);
                console.warn(data.stream);
                if (data.stream) {
                    console.warn(channel, 'is online');
                    cardContent(true, channel);
                } else {
                    console.warn(channel, 'is offline');
                    cardContent(false, channel);
                }
            }

        )
    })
};

$(document).ready(function() {
    checkStatus();
});
