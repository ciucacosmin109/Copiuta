import React from 'react'; 
import { withRouter } from 'react-router-dom';

import './DemoPage.css'

import DemoComponent from '../components/DemoComponent' 
import Tags from '../data/Tags'

class DemoPage extends React.Component {
  async componentDidMount(){    
    console.log(await Tags.getAllTags());   
  }
  render() {
    const { match } = this.props; 
    //console.log(match, location, history);

    /*La componentele facute de voi puneti un id unic la  primul div*/
    /*In CSS, in fata fiecarui selector o sa puneti id-ul asta*/
    /*Facem asa ca CSS urile unuia sa nu aiba efect la componentele altora*/
    return ( 
      <div id="NumeleVostru"> 
        <p>I am a demo page</p>
        <p>{match.path}</p>

        <DemoComponent/>

      </div> 
    );
  }
}

// Daca trebuie sa avem acces la match, location, history folosim withRouter
export default withRouter(DemoPage);
// export default DemoPage;