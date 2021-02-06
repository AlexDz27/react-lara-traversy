import {Link} from 'react-router-dom';
import Header from "../Header/Header";

const About = () => {
  return (
    <>
      <Header onAdd={() => setShowAddTask(!showAddTask)} isShowingForm={false} />
      <h3>Version 1.1.2</h3>
      <Link to="/">Go back</Link>
    </>
  );
}

export default About;