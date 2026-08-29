const 投影片們 = [...document.querySelectorAll('.投影片')];
const 上一頁按鈕 = document.querySelector('#上一頁');
const 下一頁按鈕 = document.querySelector('#下一頁');
const 頁碼 = document.querySelector('#頁碼');
const 頁面名稱 = document.querySelector('#頁面名稱');
let 目前頁面 = 0;

// 顯示指定頁面，並同步更新右下角的導覽資訊。
function 顯示頁面(頁面索引) {
  目前頁面 = Math.max(0, Math.min(頁面索引, 投影片們.length - 1));

  投影片們.forEach((投影片, 索引) => {
    投影片.classList.toggle('顯示中', 索引 === 目前頁面);
    if (索引 === 目前頁面) 投影片.scrollTop = 0;
  });

  頁碼.textContent = `${目前頁面 + 1} / ${投影片們.length}`;
  頁面名稱.textContent = 投影片們[目前頁面].dataset.標題;
  上一頁按鈕.disabled = 目前頁面 === 0;
  下一頁按鈕.disabled = 目前頁面 === 投影片們.length - 1;
}

上一頁按鈕.addEventListener('click', () => 顯示頁面(目前頁面 - 1));
下一頁按鈕.addEventListener('click', () => 顯示頁面(目前頁面 + 1));

document.addEventListener('keydown', (事件) => {
  if (事件.key === 'ArrowRight' || 事件.key === ' ') {
    事件.preventDefault();
    顯示頁面(目前頁面 + 1);
  }
  if (事件.key === 'ArrowLeft') {
    事件.preventDefault();
    顯示頁面(目前頁面 - 1);
  }
  if (事件.key === 'Home') 顯示頁面(0);
  if (事件.key === 'End') 顯示頁面(投影片們.length - 1);
});

document.querySelector('.簡報').addEventListener('click', (事件) => {
  // 按鈕與超連結要保留原本功能，不把點擊當成換頁。
  if (事件.target.closest('button, a')) return;
  顯示頁面(目前頁面 + 1);
});

document.querySelectorAll('[data-前往]').forEach((按鈕) => {
  按鈕.addEventListener('click', () => 顯示頁面(Number(按鈕.dataset.前往)));
});

顯示頁面(0);
