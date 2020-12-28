import React from 'react'; 
import Notes from '../data/Notes'; 

import NoteEditor from '../components/NoteEditor'
 
class EditNotePage extends React.Component {
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

    handleSave = async note => {   
        if(note.id){
            // Do an update 
            const res = await Notes.updateNote(note.id, note);
            if(res.ok){ 
                const from = this.getPreviousUrl(); 
                this.props.history.push(from);
            }else{
                this.setState({ error: res.message, loading: false });
            }  
        }
    }
    onNoteFetched = res => { 
        if(!res.ok){
            this.setState({loading: false, error: res.message});
        }else{
            this.setState({loading: false, error: null});
        }
    }
  
    render() { 
        // demo entities
        // stud: 2e63ac63-1c75-40b1-af3b-a74aca1bbc2d
        // course: 4206654e-281d-4c34-ab77-c01c7735012e
        // note: cd34b09e-3ebf-428c-bf49-6cd5301df993
        const { params } = this.props.match;
        return ( 
            <NoteEditor
                editable={true} 
                onSaveClicked={this.handleSave}

                noteId={params.id} 
                onNoteFetched={this.onNoteFetched}
                
                error={this.state.error}
                loading={this.state.loading}
            />
        );
    }
}

export default EditNotePage; 