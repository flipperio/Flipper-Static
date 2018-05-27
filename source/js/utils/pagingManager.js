import EventEmitter from 'event-emitter';

/**
* @class
* Emits an event when the window (or some other element) is scrolled far enough down to so that the bottom
* of some another element (known as the "pagingElement" -> for example a list of posts) is visible.
*
* This class impliments an Event Emitter interface from  the "event-emitter" pacakge. Listeners should subscribe
* to the "page" event and call the "trackPaging(...)" method to start.
*
* @function on(eventName, eventCallback) - Subscribe to an event
* @function off(eventName, eventCallback) - Unsubscribe from an event
*/
function PagingManager() {
	this._checkInterval = 500;
	this._scrolled = false;
	this._scrollingElement = null;
	this._pagingElement = null;

	this._onScroll = function() {
		this._scrolled = true;
	}.bind(this);

	this._checkPaging = function() {
		if (this._scrolled === false) {
			return;
		}

		this._scrolled = false;

		const rect = this._pagingElement.getBoundingClientRect();
		if (rect.bottom <= window.innerHeight) {
			this.emit('page', Date.now());
		}
	}.bind(this);

	window.setInterval(this._checkPaging, this._checkInterval);
}

EventEmitter(PagingManager.prototype);

/**
* @function
* Start tracking scrollng and paging for an element. If the parameters are not of the correct types, an error will be thrown.
* @param {object} scrollingElement - An element to track scrolling on. When this element is scrolled, the "pagingElement" param will be checked to see if its bottom border is within the screen (visible). Must either be the "window" or "document" objects, or an instanceof "HTMLElement".
*
* @param {HTMLElement} pagingElement - The element to page. When the bottom of this element becomes visbile on the screen, a "page" event will be emitted.
*/
PagingManager.prototype.trackPaging = function(scrollingElement, pagingElement) {
	if (PagingManager.isScrollingElement(scrollingElement) === false) {
		throw PagingManager.scrollingElementError();
	}
	else if (PagingManager.isPagingElement(pagingElement) === false) {
		throw PagingManager.pagingElementError();
	}

	if (this._scrollingElement) {
		this._scrollingElement.removeEventListener('scroll', this._onScroll);
	}

	this._scrollingElement = scrollingElement;
	this._pagingElement = pagingElement;
	this._scrollingElement.addEventListener('scroll', this._onScroll);
};

PagingManager.isScrollingElement = function(element) {
	if (element === window || element === document || element instanceof HTMLElement) {
		return true;
	}
	return false;
};
PagingManager.isPagingElement = function(element) {
	return element instanceof HTMLElement;
};
PagingManager.scrollingElementError = function(element) {
	return new TypeError(`Unable to track scrolling on an object that is not an HTMLElement, the window, or the document. Invalid Object: ${element}`);
};
PagingManager.pagingElementError = function(element) {
	return new TypeError(`Unable to track paging on an object that is not an HTMLElement. Invalid Object: ${element}`);
};

export default PagingManager;
