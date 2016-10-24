/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	import { hui } from './test';

	console.log(hui);
	const removeElements = (root, selector) => {
	    const clonedRoot = root.cloneNode(true);
	    const nodes = clonedRoot.querySelectorAll(selector);
	    const nodeList = Array.prototype.slice.call(nodes);
	    nodeList.forEach(node => node.parentNode.removeChild(node));
	    return clonedRoot;
	};

	const makeAttributeUrlsAbsolute = (root, selector, attribute, valueExpr) => {
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

	const removeAttributes = (root, selector, attribute, valueExpr) => {
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

	const convertToAbsoluteUrl = url => {
	    const link = document.createElement('a');
	    link.href = url;
	    return link.protocol + '//' + link.host + link.pathname + link.search + link.hash;
	};

	const makeElementStatic = element => {
	    element = removeElements(element, 'script');
	    element = makeAttributeUrlsAbsolute(element, 'href');
	    element = makeAttributeUrlsAbsolute(element, 'src');
	    element = removeAttributes(element, 'onclick');
	    element = removeAttributes(element, 'onresize');
	    return element;
	};

	const changeEncoding = (root, encoding) => {
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

	const downloadTextAsFile = (text, fileName='download.txt') => {
	    const data = new Blob([text], { type: 'text/plain'});
	    const textFileUrl = window.URL.createObjectURL(data);
	    const link = document.createElement('a');
	    link.href = textFileUrl;
	    link.download = fileName;
	    link.addEventListener('click', () => setTimeout(() => window.URL.revokeObjectURL(textFileUrl), 0));
	    link.click();
	};


	const staticDocument = makeElementStatic(document.documentElement);
	const utf8EncodedDocument = changeEncoding(staticDocument, 'utf-8');
	downloadTextAsFile(utf8EncodedDocument.innerHTML, 'index.html');


/***/ }
/******/ ]);