import React from 'react';
import { withRouter } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';
import { EventEmitter } from 'fbemitter'

import Notes from '../data/Notes';
import NoteElement from './NoteElement';
import GroupNotes from '../data/GroupNotes';

class NoteList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],

            loading: true,
            error: null
        };
        this.emitter = new EventEmitter();

        if (this.props.emitter)
            this.props.emitter.addListener('UPDATE', () => {
                this.fetchNotes();
            })
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
        } else if (this.props.tagName) {
            notesRes = await Notes.getAllNotesByTagName(this.props.tagName);
            console.log(notesRes)
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
        });
        this.emitter.emit('UPDATE')
    }

    // Notes
    deleteNote = async index => {
        if (this.props.shared) {
            const resR = await GroupNotes.removeNoteFromGroup(this.state.notes[index].id, this.props.groupId);
            if (!resR.ok) {
                this.setState({ modalError: resR.message });
                return;
            }
        } else {
            const resR = await Notes.deleteNote(this.state.notes[index].id);
            if (!resR.ok) {
                this.setState({ modalError: resR.message });
                return;
            }
        }

        this.setState({ notes: this.state.notes.filter((_, i) => i !== index) });

        this.emitter.emit('UPDATE');
        if (this.props.onUpdated)
            this.props.onUpdated();
    }

    // Html
    render() {
        return (
            <ListGroup variant="flush" size="sm">
                {this.state.notes.map((elem, index) =>
                    <ListGroup.Item key={index}>
                        <NoteElement
                            note={elem}
                            emitter={this.emitter}
                            shared={this.props.shared}
                            onDelete={() => this.deleteNote(index)}
                        />
                    </ListGroup.Item>
                )}
            </ListGroup>
        );
    }
}

export default withRouter(NoteList); 