import React from 'react';
import { withRouter } from 'react-router-dom'

import { Button, Modal } from 'react-bootstrap';
import { PencilSquare, Trash, Share, Tag } from 'react-bootstrap-icons';

import Groups from '../data/Groups'
import Tags from '../data/Tags'

import './NoteElement.css';
import ShareEditor from './ShareEditor';
import TagViewer from './TagViewer';

class NoteElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: 0,
            tags: [],

            loading: true,
            error: null,

            shareModal: false,
            shareModalLoading: true,
            shareModalError: null,

            tagName: "-",
            tagModal: false,
        };

    }
    async componentDidMount() {
        await this.fetchData();
        this.props.emitter.addListener('UPDATE', () => {
            this.fetchData();
        })
    }
    fetchData = async () => {
        // Common groups
        const res = await Groups.getAllGroupsByNoteId(this.props.note.id);
        if (!res.ok) {
            this.setState({ loading: false, error: "Groups(NoteId): " + res.message });
            return;
        }

        // Tags
        const res2 = await Tags.getAllTags(this.props.note.id);
        if (!res2.ok) {
            this.setState({ loading: false, error: "tags(NoteId): " + res2.message });
            return;
        }

        this.setState({
            loading: false,
            error: null,

            groups: res.result.length,
            tags: res2.result
        })
    }

    // Share modal 
    showShareModal = () => {
        this.setState({ shareModal: true });
    }
    hideShareModal = () => {
        this.setState({ shareModal: false });
    }
    // Tag modal 
    showTagModal = (name) => {
        this.setState({ tagName: name, tagModal: true });
    }
    hideTagModal = () => {
        this.setState({ tagModal: false });
    }

    // Note actions
    viewNote = () => {
        this.props.history.push((this.props.shared ? "../" : "") + "note/view/" + this.props.note.id);
    }
    editNote = () => {
        this.props.history.push((this.props.shared ? "../" : "") + "note/edit/" + this.props.note.id);
    }
    shareNote = () => {
        this.showShareModal();
    }

    // Tag viewer
    viewNotesByTag = tag => {
        this.showTagModal(tag.name);
    }

    // Note sharing  
    shareModalSaved = groups => {
        this.hideShareModal();
        this.setState({ groups: groups.length });

        if (this.props.onUpdated)
            this.props.onUpdated(this.props.note.id, this.state.groups);
    }
    shareModalFetched = res => {
        if (!res.ok) {
            this.setState({ shareModalLoading: false, shareModalError: res.message });
        } else {
            this.setState({ shareModalLoading: false, shareModalError: null });
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
                {!this.props.shared ? <> {
                    this.state.tags.map((tag, index) =>
                        <Button key={index} variant="link" size="sm" onClick={() => this.viewNotesByTag(tag)}>
                            <Tag color="gray" />
                            {tag.name}
                        </Button>
                    )} </>
                    : <></>
                }


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


                <Modal show={this.state.shareModal} onHide={this.hideShareModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sharing options</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ShareEditor
                            note={this.props.note}
                            onSaveFinished={this.shareModalSaved}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.tagModal} onHide={this.hideTagModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tag viewer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TagViewer
                            tagName={this.state.tagName}
                        />
                    </Modal.Body>
                </Modal>
            </div >
        );
    }
}

export default withRouter(NoteElement); 