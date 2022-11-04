// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

const main = async() => {

  // Initialize LIFF app)
  await liff.init({ liffId: '1657621734-qG6EXY06' });
  const sysOS = liff.getOS();
  // Try a LIFF function
  switch (sysOS) {
    case 'android':
      body.style.backgroundColor = '#d1f5d3';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
    case 'web':
      body.style.backgroundColor = '#DFDFFC';
      break;
  }

  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
      getUserProfile();
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  } else {
    btnShare.style.display = 'block';
    btnSend.style.display = 'block';
    getUserProfile();
  }

  if (liff.isInClient() && sysOS === 'android') {
    btnScanCode.style.display = 'block';
  }

  btnOpenWindow.style.display = "block";

  if(! await getFriend()){
    alert("Please add our chatbot first");
    window.location = "https://line.me/R/ti/p/@289fvqaa";
  }
}

const getUserProfile = async () => {
  const pf = await liff.getProfile();
  pictureUrl.src = pf.pictureUrl;
  userId.innerHTML = `<b>userId:</b>${pf.userId}`;
  statusMessage.innerHTML = `<b>statusMessage:</b>${pf.statusMessage}`;
  displayName.innerHTML = `<b>displayName:</b>${pf.displayName}`;
  email.innerHTML = `<b>email:</b>${await liff.getDecodedIDToken().email}`;
};

const getFriend = async () =>{
  const friend= await liff.getFriendship();
  return friend.friendFlag;
}

const shareMsg = async () =>{
  await liff.shareTargetPicker([
    {
      type: 'image',
      originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
      previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
    },
  ]);
}

const sendMsg = async () =>{
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'สวัสดีครับ ผมมีรางวัลมาแจก....',
      },
    ]);
    //alert('Message sent');
    liff.closeWindow();
  }
}

const scanCode = async () =>{
  const result = await liff.scanCode();
  code.innerHTML = '<b>Code: </b>' + result.value;
}

btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

btnSend.onclick = () => {
  sendMsg();
};

btnShare.onclick = () => {
  shareMsg();
};

btnScanCode.onclick = () => {
  scanCode();
};

btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: window.location.href,
    external: true
  })
}

main();
