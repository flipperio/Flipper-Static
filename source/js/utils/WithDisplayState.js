import { connect } from 'react-redux';
import actions from 'state/actions/index.js';

export default function WithDisplayState(component, mapState = true, mapDispatch = true) {
	let mapStateToProps = null;
	let mapDispatchToProps = null;

	if (mapState === true) {
		mapStateToProps = store => ({
			display: Object.assign({}, store.display)
		});
	}

	if (mapDispatch === true) {
		mapDispatchToProps = {
			setPostDisplay: actions.setPostDisplay
		};
	}

	return connect(mapStateToProps, mapDispatchToProps)(component);
}
