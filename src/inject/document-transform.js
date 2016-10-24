export const removeElements = (root, selector) => {
    const clonedRoot = root.cloneNode(true);
    const nodes = clonedRoot.querySelectorAll(selector);
    const nodeList = Array.prototype.slice.call(nodes);
    nodeList.forEach(node => node.parentNode.removeChild(node));
    return clonedRoot;
};

export const makeAttributeUrlsAbsolute = (root, selector, attribute, valueExpr) => {
    valueExpr = valueExpr || '';
    if (!attribute) {
        attribute = selector;
        selector = '*';
    }

    const clonedRoot = root.cloneNode(true);
    const nodes = clonedRoot.querySelectorAll(`${selector}[${attribute}${valueExpr}]`);
    const nodeList = Array.prototype.slice.call(nodes);
    nodeList.forEach(node => node[attribute] = convertToAbsoluteUrl(node[attribute]));
    return clonedRoot;
};

export const removeAttributes = (root, selector, attribute, valueExpr) => {
    valueExpr = valueExpr || '';
    if (!attribute) {
        attribute = selector;
        selector = '*';
    }

    const clonedRoot = root.cloneNode(true);
    const nodes = clonedRoot.querySelectorAll(`${selector}[${attribute}${valueExpr}]`);
    const nodeList = Array.prototype.slice.call(nodes);
    nodeList.forEach(node => node.removeAttribute(attribute.toLowerCase()));
    return clonedRoot;
};

export const convertToAbsoluteUrl = url => {
    const link = document.createElement('a');
    link.href = url;
    return link.protocol + '//' + link.host + link.pathname + link.search + link.hash;
};

export const changeEncoding = (root, encoding) => {
    return changeContent(changeCharset(root, encoding), encoding);
};

const changeCharset = (root, encoding) => {
    const clonedRoot = root.cloneNode(true);
    const nodes = clonedRoot.querySelectorAll('meta[charset]');
    const nodeList = Array.prototype.slice.call(nodes);
    nodeList.forEach(node => node.charset=encoding);
    return clonedRoot;
};

const changeContent = (root, encoding) => {
    const clonedRoot = root.cloneNode(true);
    const nodes = clonedRoot.querySelectorAll('meta[content]');
    const nodeList = Array.prototype.slice.call(nodes);
    nodeList.forEach(node => {
        node.content = node.content.replace(/\bcharset=([^;]*)/, 'charset=' + encoding);
    });
    return clonedRoot;
};

const convertUrlContentToBase64 = url => {
    return fetch(url).then(data => data.blob()).then(blob => {
        return new Promise (resolve => {
            const reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result);
        });
    });
};

export const inlineAttributes = (root, selector, attribute, valueExpr) => {
    valueExpr = valueExpr || '';
    if (!attribute) {
        attribute = selector;
        selector = '*';
    }

    const clonedRoot = root.cloneNode(true);
    const nodes = clonedRoot.querySelectorAll(`${selector}[${attribute}${valueExpr}]`);
    const nodeList = Array.prototype.slice.call(nodes);
    const promises = nodeList.map(node => {
        return convertUrlContentToBase64(node[attribute])
            .then(base64 => node[attribute] = base64)
            .catch(console.error);
    });
    return Promise.all(promises).then(() => clonedRoot);
};
