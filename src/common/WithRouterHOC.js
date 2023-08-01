import {
  useNavigate,
  useLocation 
} from 'react-router-dom';

export const withRouterHOC = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} router={{navigate, location}}  />;
  };

  return Wrapper;
};