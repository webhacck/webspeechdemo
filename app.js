var btn = document.getElementById('btn');
var content = document.getElementById('content');

//音声認識APIの使用
var speech = new webkitSpeechRecognition();

//言語を日本語に設定
speech.lang = "ja";

//ボタンクリックで認識開始
btn.addEventListener('click', function() {
  speech.start();
});

//認識されたテキストを使って処理を分岐
speech.addEventListener('result', function(e) {
  var text = e.results[0][0].transcript;

  content.innerHTML = "";
  
  switch(text) {
    case "検索":
      getSearch();
      break;
    case "ビデオ":
      getVideo();
      break;
    case "ラジオ":
      getRadio();
      break;
    case "イベント":
      getEventData();
      break;
    default:
      getTextContents(text);
  }
  
});




//検索
function getSearch() {
    var iframe = document.createElement('iframe');
    
    iframe.width = '400px';
    iframe.height = '400px';
    iframe.src = 'https://duckduckgo.com/';
    content.appendChild(iframe);
}

//ビデオ
function getVideo() {
    var URL = '<iframe width="560" height="315" src="https://www.youtube.com/embed/TBEuMfNqv_k?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1" frameborder="0" allowfullscreen></iframe>';
    
    content.innerHTML = URL;
}

//ラジオ
function getRadio() {
  var URL = '<iframe src="https://tunein.com/embed/player/s48940" style="width:50%;height:100px;" scrolling="no" frameborder="no"></iframe>';
  
  content.innerHTML = URL;
}

//イベント
function getEventData() {
  // キーワードを「東京」に設定
  var baseURL = "https://api.atnd.org/events/?keyword=東京&format=jsonp&count=20&callback=callback";
  var script = document.createElement('script');
  
  script.src = baseURL;
  document.body.appendChild(script);
  
  
  window.callback = function(data) {
    var ul = document.createElement('ul');
    content.appendChild(ul);
    
    for(var item in data.events) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      
      a.href = data.events[item].event.event_url;
      a.textContent = data.events[item].event.title;
      a.target = "_blank";
      li.style.lineHeight = 1.5;
      li.appendChild(a);
      ul.appendChild(li);
    }
    
  };
}

//テキスト表示
function getTextContents(text) {
  content.innerHTML = '<p>認識された言葉</p>' +
                   '<input type="text" value="' + text + '">';
}



