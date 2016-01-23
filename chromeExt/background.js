// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
  chrome.extension.getBackgroundPage().console.log('foo');
  console.log(socket)
  var socket = io.connect('http://192.241.182.93:3000/');
  socket.emit('chat message', 'Hi from a Chrome Extension!');
  socket.on('chat message', function(msg){
    console.log(msg);
  });
});



