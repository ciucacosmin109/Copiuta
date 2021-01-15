import React from 'react';
import { withRouter } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';

import Notes from '../data/Notes';
import NoteElement from './NoteElement';

import './NoteList.css';

class NoteList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],

            loading: true,
            error: null
        };

    }
    async componentDidMount() {
        await this.fetchNotes()
    }
    fetchNotes = async () => {
        let notesRes = null;
        if (this.props.courseId) {
            notesRes = await Notes.getAllNotesByCourseId(this.props.courseId);
        } else if (this.props.groupId) {
            notesRes = await Notes.getAllNotesByGroupId(this.props.groupId);
        }

        if (notesRes === null) {
            this.setState({ loading: false, error: "No source provided (this.props.courseId / this.props.groupId)" });
            return;
        }
        if (!notesRes.ok) {
            this.setState({ loading: false, error: "Notes: " + notesRes.message });
            return;
        }

        this.setState({
            loading: false,
            error: null,

            notes: notesRes.result
        })
    }

    // Notes
    deleteNote = async index => {
        const result = await Notes.deleteNote(this.state.notes[index].id);
        if (result.ok) {
            this.setState({ notes: this.state.notes.filter((_, i) => i !== index) });
        } else {
            this.setState({ error: result.message });
        }
    }

    // Html
    render() {
        return (
            <ListGroup variant="flush" size="sm">
                {this.state.notes.map((elem, index) =>
                    <ListGroup.Item key={index}>
                        <NoteElement
                            note={elem}
                            onDelete={() => this.deleteNote(index)}
                        />
                    </ListGroup.Item>
                )}
            </ListGroup>
        );
    }
}

export default withRouter(NoteList); 