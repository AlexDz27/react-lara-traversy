import Button from "../Button/Button";
import {Link} from "react-router-dom";

const Footer = ({onRestore}) => {
  return (
    <footer>
      <Button onClick={() => onRestore()} text="Restore default tasks" color="steelblue" />
      <p className="text-muted" style={{marginTop: 10}}>
        Followed by&nbsp;
        <a className="text-muted" href="https://www.youtube.com/watch?v=w7ejDZ8SWv8">Traversy Media video</a> | 2021
      </p>
      <p>
        <Link to="/about">About</Link>
      </p>
    </footer>
  );
}

export default Footer;