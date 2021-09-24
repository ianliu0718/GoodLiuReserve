function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            initializeApp();
        })
        .catch((err) => {
            alert('啟動失敗。');
        });
  }

function initializeApp() {
  var h = document.getElementById('result');
  var _message = document.getElementById('Msg');
  h.innerHTML = window.location.href;
  //h.innerHTML = 'isLoggedIn：' + liff.isLoggedIn();
  //liff.login({ redirectUri: 'https://ianliu0718.github.io/GoodLiuReserve' });
  //liff.login();
  //h.innerHTML = 'isLoggedIn：' + liff.isLoggedIn();
  // 登入
  //liff.login({
  //  // 使用者登入後要去到哪個頁面
  //  redirectUri: 'https://www.xxxxxxx.com.tw'
  //});

	if(!liff.isLoggedIn()){
		liff.login();
		liff.sendMessages([
		{
			type: 'text',
			text: 'Hello, World!'
		}
		]);
		
	}
	else{
		liff.sendMessages([
		{
		type: 'text',
		text: _message
		}
		]);
	}
  h.innerHTML = 'isLoggedIn：' + liff.isLoggedIn();
}
  //document.getElementById('result').innerHTML = 'isLoggedIn：' + liff.isLoggedIn();
  //使用 LIFF_ID 初始化 LIFF 應用
  //initializeLiff('1656397971-q9WB8y1b');