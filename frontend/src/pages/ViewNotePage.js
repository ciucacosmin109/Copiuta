import React from 'react';  

import NoteEditor from '../components/NoteEditor'
 
class ViewNotePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null, 
            loading: true
        }
   
        console.log("Coming from: ", this.getPreviousUrl());
    } 
    getPreviousUrl = () => { // or 'from' object
        if(this.props.location.state && this.props.location.state.from){
            return this.props.location.state.from;
        }else if(window.history.state && window.history.state.previousUrl){
            return window.history.state.previousUrl;
        }else{
            return { pathname: "/" };
        } 
    }  

    handleSave = note => {   
        this.props.history.goBack();
    }
    onNoteFetched = res => { 
        if(!res.ok){
            this.setState({loading: false, error: res.message});
        }else{
            this.setState({loading: false, error: null});
        }
    }
  
    render() {  
        const { params } = this.props.match;
        return ( 
            <NoteEditor
                editable={false} 
                onSaveClicked={this.handleSave}

                noteId={params.id} 
                onNoteFetched={this.onNoteFetched}
                
                error={this.state.error}
                loading={this.state.loading}
            />
        );
    }
}

export default ViewNotePage; 