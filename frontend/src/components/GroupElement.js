import React from 'react';
import { withRouter } from 'react-router-dom'

import NoteList from './NoteList';
import GroupEditor from './GroupEditor';

import { Button, Card, Collapse, Modal } from 'react-bootstrap';
import { PencilSquare, Trash, CaretDown, CaretUp } from 'react-bootstrap-icons';

import './GroupElement.css';
import Groups from '../data/Groups';

class GroupElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,

            modal: false,
            modalEdit: false,
            modalLoading: true,
            modalError: null
        };

    }

    toggleCollapse = () => {
        this.setState({ open: !this.state.open });
    }
    showModal = editEnabled => {
        this.setState({ modal: true, modalEdit: editEnabled });
    }
    hideModal = () => {
        this.setState({ modal: false });
    }

    // Group
    viewGroup = () => {
        this.props.history.push("/group/" + this.props.group.id)
    }
    editGroup = () => this.showModal(true);

    noteListUpdated = () => {
        if (this.props.onUpdated)
            this.props.onUpdated();
    }

    // Modal
    modalSave = async g => {
        if (g && g.id) {
            // Do an update 
            const res = await Groups.updateGroup(g.id, g);
            if (!res.ok) {
                this.setState({ modalError: res.message, modalLoading: false });
            } else this.setState({ modal: false });
        } else this.setState({ modal: false });

        if (this.props.onUpdated)
            this.props.onUpdated();
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
        const groupDateTime = this.dateToDMY(this.props.group.createdAt);
        return (<>
            <Card className="GroupElement" size="sm">
                <Card.Header>
                    <Button variant="link" size="sm" onClick={this.viewGroup}>{this.props.group.name}</Button>
                    {this.props.showNotes ?
                        <Button variant="link" size="sm" onClick={this.toggleCollapse}>
                            {this.state.open ? <CaretUp color="gray" /> : <CaretDown color="gray" />}
                        </Button> : <></>
                    }

                    {this.props.onDelete && !this.props.readOnly ?
                        <Button className="button-right" variant="link" size="sm" onClick={this.props.onDelete}><Trash color="#F54242" /></Button> : <></>
                    }
                    {!this.props.readOnly ?
                        <Button className="button-right" variant="link" size="sm" onClick={this.editGroup}><PencilSquare color="gray" /></Button> : <></>
                    }
                    <span className="vertical-center group-date">{groupDateTime[0] + " " + groupDateTime[1]}</span>
                </Card.Header>
                {this.props.showNotes ?
                    <Collapse in={this.state.open}>
                        <Card.Body>
                            <NoteList
                                groupId={this.props.group.id}
                                onUpdated={this.noteListUpdated} />
                        </Card.Body>
                    </Collapse> : <></>
                }
            </Card>

            <Modal show={this.state.modal} onHide={this.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modalEdit ? "Edit group" : "View group"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GroupEditor
                        editable={this.state.modalEdit}
                        groupId={this.props.group.id}

                        onSaveClicked={this.modalSave}
                        onGroupFetched={this.modalFetched}

                        error={this.state.modalError}
                        loading={this.state.modalLoading}
                    />
                </Modal.Body>
            </Modal>
        </>);
    }
}

export default withRouter(GroupElement); 