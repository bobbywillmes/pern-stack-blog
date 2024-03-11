import Faker from '../../components/faker/faker';
import './about.scss';

const About = (props) => {
  return (
      <div id="wrap" className="container">
          <h2>About this blog</h2>
          <p>This blog is a full-stack app running on the PERN stack (PostGres, Express, React &amp; Node.js).</p>
          <p>The key abilities:</p>
          <ul>
            <li>Write a new post with title, content & author. Ability to fill in post with lorem-ipsum type (generated on the server with Faker).</li>
            <li>See list of posts on home page</li>
            <li>Edit/delete individual posts on home page</li>
            <li>Posts(on home page) link to single-post pages by id(<code>/posts/175</code>). Single posts could eventually show more info like comments.</li>
          </ul>
          <Faker people={props.people} dogs={props.dogs} colors={props.colors} hackerLog={props.hackerLog} />
      </div>
  )
}

export default About