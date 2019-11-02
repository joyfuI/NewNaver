"use strict";
function headers(details) {
	const userAgent = ' Whale/2.6.88.10';	// 웨일

	for (let header of details.requestHeaders) {
		if (header.name.toLowerCase() === 'user-agent') {	// 유저 에이전트를
			header.value += userAgent;	// 웨일로 조작
			break;
		}
	}
	return { requestHeaders: details.requestHeaders };
}

let extraInfoSpec = ['blocking', 'requestHeaders'];
if (typeof(browser) === 'undefined') {	// 파이어폭스는 browser, chrome 네임스페이스 모두 지원하는데 크롬은 chrome만 지원. 또, 엣지는 browser만 지원
	var browser = chrome;
	extraInfoSpec.push('extraHeaders');	// 크롬용 옵션
}

let filter = { urls: ['*://*.naver.com/*'] };
try {
	browser.webRequest.onBeforeSendHeaders.addListener(headers, filter, extraInfoSpec);
} catch (e) {	// extraHeaders가 크롬 72 버전부터 추가된거라 구 크로뮴 엔진을 쓰면 에러 발생ㅡㅡ
	extraInfoSpec.pop();
	browser.webRequest.onBeforeSendHeaders.addListener(headers, filter, extraInfoSpec);
}
