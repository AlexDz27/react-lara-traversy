import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import Button from "../Button/Button";

const Header = ({title, onAdd, isShowingForm}) => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header className="header">
      <h1>{title}</h1>

      {isMainPage && <Button
        text={isShowingForm ? 'Close' : 'Add'}
        color={isShowingForm? '#cc1818' : 'green'}
        onClick={onAdd}
      />}
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;