import React from 'react';
import './faker.scss';

function People(props) {
 if(!props.people) {return}
 return (
  <div id="people" className="section">
    <h2>People</h2>
   <div className="table-responsive">
    <table className="table table-striped">
     <thead>
      <tr>
       <th>&nbsp;</th>
       <th scope="col">Name</th>
       <th scope="col">Job Type</th>
       <th scope="col">Job Title</th>
       <th scope="col">Country</th>
      </tr>
     </thead>
     <tbody>
     {props.people.map((person, index) => {
      return (
       <tr key={index}>
        <th scope="row" className="rowNumber">{index+1}</th>
        <td>{person.name}</td>
        <td>{person.jobType}</td>
        <td>{person.jobTitle}</td>
        <td>{person.country}</td>
       </tr>
      )
     })}
     </tbody>
    </table>
   </div>
  </div>
 )
}

function Dogs(props) {
    if(!props.dogs) {return}
    return (
        <div id="dogs" className="section">
            <h2>Dogs</h2>
            <ul className="list-group">
                {props.dogs.map((dog, index) => {
                    return (
                        <li key={index} className="list-group-item">{dog}</li>
                    )
                })}
            </ul>
        </div>
    )
}

function Colors(props) {
    if(!props.colors) {return}
    return (
        <div id="colors" className="section">
            <h2>Colors</h2>
            {props.colors.map((color, index) => {
                return (
                  <div key={index} style={{ backgroundColor: color.color }} className="color">
                    <span className="count">{index+1}</span> <h4 style={{ color: color.opposite }}>{color.color}</h4>
                  </div>
                )
            })}
        </div>
    )
}

function HackerLog(props) {
    if (!Array.isArray(props.log)) {
        return <div>No log entries available</div>;
    }
    return (
        <div id="hacker-log">
            <h3>HackerLog</h3>
            {props.log.map((entry, index) => {
                return (
                    <div key={index} className="log-entry">
                        <h5>{entry.task}</h5>
                        <p>{entry.info}</p>
                    </div>
                )
            })}
        </div>
    )
}

function Faker(props) {
 return (
  <div id="faker">
   <h1>Faker</h1>
   <p>Faker is used to generate lorum-ipsum type text, which is used for this blog to submit a blog post with dummy-data for post Title, Content & Author. On the Create Post form, simply hit the 'Lorem!' button (at bottom) to fill in all fields with fake text. </p>

   <blockquote>
      Faker.js is a JavaScript library that generates fake data such as names, addresses, phone numbers, and more. It is commonly used in software development for testing, prototyping, and generating sample data. Faker.js allows developers to quickly create realistic-looking data without the need to manually input or generate it themselves, making it a valuable tool for various development tasks.
      <footer>Source: chatgpt</footer>
    </blockquote>

    <p>Below are a few examples of data Faker can create.</p>
   
   <div className="container">
    <div className="row">
     <div className="col">
      <People people={props.people} />
     </div>
     <div className="col">
        <Dogs dogs={props.dogs} />
     </div>
     <div className="col">
        <Colors colors={props.colors} />
     </div>
    </div>
   </div>
   <br />
    <HackerLog log={props.hackerLog} />
  </div>
 )
}

export default Faker
