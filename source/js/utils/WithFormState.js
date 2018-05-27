import { connect } from 'react-redux';
import actions from 'state/actions/index.js';

export default function WithFormState(component, mapState = true, mapDispatch = true) {
	let mapStateToProps = null;
	let mapDispatchToProps = null;

	if (mapState === true) {
		mapStateToProps = store => ({
			form: Object.assign({}, store.form)
		});
	}

	if (mapDispatch === true) {
		mapDispatchToProps = {
			setPostForm: actions.setPostForm
		};
	}

	return connect(mapStateToProps, mapDispatchToProps)(component);
}
