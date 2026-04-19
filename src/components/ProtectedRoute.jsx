import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';

const ProtectedRoute = (props) => {
	const { children } = props;
	const { user } = useUserContext();

	if (!user) {
		return <Navigate to="/" />;
	}

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
