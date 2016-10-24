import * as dt from './document-transform.js';
import { GET_TEXT_ONLY, DOCUMENT_CREATED, GET_WITH_INLINED_IMAGES } from '~/common/constants';

const makeElementStatic = element => {
    element = dt.removeElements(element, 'script');
    element = dt.makeAttributeUrlsAbsolute(element, 'href');
    element = dt.makeAttributeUrlsAbsolute(element, 'src');
    element = dt.removeAttributes(element, 'onclick');
    element = dt.removeAttributes(element, 'onresize');
    element = dt.changeEncoding(element, 'utf-8');
    return element;
};

const handleGetTextOnly = () => {
    const staticElementHtml = makeElementStatic(document.documentElement).innerHTML;
    chrome.runtime.sendMessage({
        type: DOCUMENT_CREATED,
        html: staticElementHtml,
    });
};

const handleGetWithInlineImages = () => {
    const staticElement = makeElementStatic(document.documentElement);
    dt.inlineAttributes(staticElement, 'img', 'src').then(element => {
        return chrome.runtime.sendMessage({
            type: DOCUMENT_CREATED,
            html: element.innerHTML,
        });
    });
};

const messageListener = message => {
    (function () {
        switch (message.type) {
            case GET_TEXT_ONLY:
                return handleGetTextOnly();
            case GET_WITH_INLINED_IMAGES:
                return handleGetWithInlineImages();
        }
    })();
    chrome.runtime.onMessage.removeListener(messageListener);
};

chrome.runtime.onMessage.addListener(messageListener);
