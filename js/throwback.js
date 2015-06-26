// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function getYearData(){
    var year = document.getElementById('year').value;
    onYouTubeIframeAPIReady(year);
}

function getVideoList(year){
    
    httpGet('https://www.googleapis.com/youtube/v3/search?videoEmbeddable=true&publishedAfter=2009-01-01T00%3A00%3A00Z&order=viewCount&part=snippet&publishedBefore=2010-01-01T00%3A00%3A00Z&type=video&videoCategoryId=Music&maxResults=10&key={YOUR_API_KEY}')
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function onYouTubeIframeAPIReady(year) {
//    var results = searchByKeyword(year);
    player = new YT.Player('player', {
        width: '1280',
        height: '720',
        videoId: 'EeWgOo9SEo8',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

//GET 

function searchByKeyword(year) {
    var results = YT.Search.list('id,snippet', {
        q: 'dogs',
        maxResults: 10
    });
    for (var i in results.items) {
        var item = results.items[i];
        console.log('Title: %s, ViewCount: %s', item.snippet.title, item.id.viewCount);
    }
    return results;
}