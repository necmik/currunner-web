import {
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';

export const withRouterHOC = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return <Component {...props} router={{navigate, location, params}}  />;
  };

  return Wrapper;
};