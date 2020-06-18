console.log("background");

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  // 可以针对sender做一些白名单检查
  // sendResponse返回响应
  console.log(request);
  console.log(sender);
  if (request.type === 'MsgFromPage') {
    sendResponse({
      tyep: 'MsgFromChrome',
      msg: '放回的信息'
    });
  }
});
