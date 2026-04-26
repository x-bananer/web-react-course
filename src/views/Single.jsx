import {useLocation, useNavigate} from 'react-router';
import SingleView from '../components/SingleView';

const Single = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const item = state.item;

	return <SingleView item={item} onBack={() => navigate(-1)} />;
};

export default Single;
