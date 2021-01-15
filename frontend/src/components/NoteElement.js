import React from 'react';
import { withRouter } from 'react-router-dom'

import { Button } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

import './NoteElement.css';

class NoteElement extends React.Component {
    viewNote = () => {
        this.props.history.push("note/view/" + this.props.note.id);
    }
    editNote = () => {
        this.props.history.push("note/edit/" + this.props.note.id);
    }

    render() {
        return (
            <div className="NoteElement">
                <Button variant="link" size="sm" onClick={this.viewNote}>{this.props.note.title}</Button>

                {this.props.onDelete ?
                    <Button className="button-right" variant="link" size="sm" onClick={this.props.onDelete}><Trash color="gray" /></Button> : <></>
                }
                <Button className="button-right" variant="link" size="sm" onClick={this.editNote}><PencilSquare color="gray" /></Button>
            </div>
        );
    }
}

export default withRouter(NoteElement); 