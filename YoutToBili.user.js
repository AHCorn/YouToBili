// ==UserScript==
// @name         YouToBili
// @namespace    https://github.com/AHCorn/YouToBili/
// @version      0.1
// @license      GPL-3.0
// @description  在哔哩哔哩搜索 Youtube 视频 / Youtube 跳转至哔哩哔哩
// @author       安和（AHCorn）
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addToBilibiliButton() {
        const titleElement = document.querySelector('h1.style-scope.ytd-watch-metadata yt-formatted-string');
        if (!titleElement) return;

        const button = document.createElement('button');
        button.textContent = 'Bilibili';
        button.style.marginLeft = '10px';
        button.style.padding = '5px 10px';
        button.style.backgroundColor = '#00a1d6';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';

        button.addEventListener('click', function() {
            const title = titleElement.textContent.trim();
            const encodedTitle = encodeURIComponent(title);
            const bilibiliSearchUrl = `https://search.bilibili.com/all?keyword=${encodedTitle}`;
            window.open(bilibiliSearchUrl, '_blank');
        });

        titleElement.parentNode.insertBefore(button, titleElement.nextSibling);
    }

    const observer = new MutationObserver((mutations) => {
        if (document.querySelector('h1.style-scope.ytd-watch-metadata yt-formatted-string')) {
            addToBilibiliButton();
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
