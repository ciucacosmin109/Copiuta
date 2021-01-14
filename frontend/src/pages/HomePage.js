import React from 'react';
import Notes from '../data/Notes';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: true
        }
   
    } 
  
    render() {  
        const { params } = this.props.match;
        return ( 
            <div></div>
        );
    }
}

export default HomePage; 