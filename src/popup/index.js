import { GET_TEXT_ONLY, GET_WITH_INLINED_IMAGES, DOCUMENT_CREATED } from '~/common/constants';

const downloadTextAsFile = (text, fileName='download.txt') => {
    const data = new Blob([text], { type: 'text/plain'});
    const textFileUrl = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = textFileUrl;
    link.download = fileName;
    link.addEventListener('click', () => setTimeout(() => window.URL.revokeObjectURL(textFileUrl), 0));
    link.click();
};

const executeScript = (id, options) => new Promise(resolve => chrome.tabs.executeScript(id, options, resolve));
const getCurrentTabId = () =>
    new Promise(resolve =>
            chrome.tabs.query(
                { currentWindow: true, active: true },
                tabs => resolve(tabs[0].id)
            )
        );
const sendMessage = (id, message) => chrome.tabs.sendMessage(id, message);

const requestDocument = type => {
    let tabId;
    getCurrentTabId()
        .then(id => tabId = id)
        .then(() => executeScript(tabId, { file: './inject.bundle.js' }))
        .then(() => sendMessage(tabId, { type }));
};

const handleDocumentCreated = html => {
    downloadTextAsFile(html, 'index.html');
};

document.querySelector('#downloadText').addEventListener('click', () => requestDocument(GET_TEXT_ONLY));
document.querySelector('#downloadImages').addEventListener('click', () => requestDocument(GET_WITH_INLINED_IMAGES));

chrome.runtime.onMessage.addListener(message => {
    switch (message.type) {
        case DOCUMENT_CREATED:
            return handleDocumentCreated(message.html);
    }
});
