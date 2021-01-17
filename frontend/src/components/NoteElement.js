import React from 'react';
import { withRouter } from 'react-router-dom'

import { Button, Modal } from 'react-bootstrap';
import { PencilSquare, Trash, Share } from 'react-bootstrap-icons';

import Groups from '../data/Groups'

import './NoteElement.css';
import ShareEditor from './ShareEditor';

class NoteElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: 0,

            loading: true,
            error: null,

            modal: false,
            modalLoading: true,
            modalError: null
        };
    }
    async componentDidMount() {
        await this.fetchGroupsInCommon();
    }
    fetchGroupsInCommon = async () => {
        console.log("fetching")
        if (!this.props.note.id) {
            return;
        }
        const res = await Groups.getAllGroupsByNoteId(this.props.note.id);

        if (!res.ok) {
            this.setState({ loading: false, error: "Groups(NoteId): " + res.message });
            return;
        }

        this.setState({
            loading: false,
            error: null,

            groups: res.result.length
        })
    }

    // Share modal 
    showModal = () => {
        this.setState({ modal: true });
    }
    hideModal = () => {
        this.setState({ modal: false });
    }

    // Note actions
    viewNote = () => {
        this.props.history.push((this.props.shared ? "../" : "") + "note/view/" + this.props.note.id);
    }
    editNote = () => {
        this.props.history.push((this.props.shared ? "../" : "") + "note/edit/" + this.props.note.id);
    }
    shareNote = () => {
        this.showModal();
    }

    // Note sharing  
    modalSaved = groups => {
        this.hideModal();
        this.setState({ groups: groups.length });

        if (this.props.onUpdated)
            this.props.onUpdated(this.props.note.id, this.state.groups);
    }
    modalFetched = res => {
        if (!res.ok) {
            this.setState({ modalLoading: false, modalError: res.message });
        } else {
            this.setState({ modalLoading: false, modalError: null });
        }
    }

    // Html
    dateToDMY = (isoDate) => {
        const date = new Date(isoDate)

        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();

        let h = date.getHours();
        let mi = date.getMinutes();

        return [
            (d < 10 ? '0' + d : d) + '-' + (m < 10 ? '0' + m : m) + '-' + y,
            (h < 10 ? '0' + h : h) + ':' + (mi < 10 ? '0' + mi : mi)
        ];
    }
    render() {
        const noteDateTime = this.dateToDMY(this.props.note.createdAt);
        return (
            <div className="NoteElement">
                <Button variant="link" size="sm" onClick={this.viewNote}>{this.props.note.title}</Button>

                {this.props.onDelete ?
                    <Button className="button-right" variant="link" size="sm" onClick={this.props.onDelete}><Trash color="#F54242" /></Button> : <></>
                }
                {!this.props.shared ?
                    <Button className="button-right" variant="link" size="sm" onClick={this.editNote}><PencilSquare color="gray" /></Button> : <></>
                }
                {!this.props.shared ?
                    <Button className="button-right" variant="link" size="sm" onClick={this.shareNote}>
                        <span className="nr-of-shares">{this.state.groups}</span>
                        <Share color="#4287F5" />
                    </Button> : <></>
                }
                <span className="note-date">{noteDateTime[0]}<br />{noteDateTime[1]}</span>

                <Modal show={this.state.modal} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sharing options</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ShareEditor
                            note={this.props.note}
                            onSaveFinished={this.modalSaved}
                        />
                    </Modal.Body>
                </Modal>
            </div >
        );
    }
}

export default withRouter(NoteElement); 