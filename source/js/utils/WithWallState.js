import { connect } from 'react-redux';
import actions from 'state/actions/index.js';

export default function WithWallState(component, mapState = true, mapDispatch = true) {
	let mapStateToProps = null;
	let mapDispatchToProps = null;

	if (mapState === true) {
		mapStateToProps = store => ({
			wall: Object.assign({}, store.wall)
		});
	}

	if (mapDispatch === true) {
		mapDispatchToProps = {
			setWallState: actions.setWallState
		};
	}

	return connect(mapStateToProps, mapDispatchToProps)(component);
}
