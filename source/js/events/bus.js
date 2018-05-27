import EventEmitter from 'event-emitter';
import eventTypes from './eventTypes.js';

const bus = new EventEmitter();
bus.eventTypes = eventTypes;

export default bus;
