import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons'

import GroupList from '../components/GroupList';
import GroupEditor from '../components/GroupEditor';

import Groups from '../data/Groups';
import Login from '../data/Login';

import './GroupsPage.css'

class GroupsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studId: "0",

            error: null,
            loading: true,

            groupModal: false,
            groupModalLoading: false,
            groupModalError: null
        }
        this.GroupList = React.createRef();
    }
    async componentDidMount() {
        const studRes = await Login.getCurrentLoggedIn();
        if (!studRes.ok) {
            this.setState({ loading: false, error: "Login: " + studRes.message });
            return;
        }

        this.setState({ loading: false, error: null, studId: studRes.stud.id });
    }

    groupListUpdated = () => {
        //...
        this.forceUpdate()
    }

    // Group Modal
    showGroupModal = () => this.setState({ groupModal: true });
    hideGroupModal = () => this.setState({ groupModal: false });
    groupModalSave = async g => {
        if (!g) {
            this.hideGroupModal();
            return;
        }
        this.setState({ groupModalLoading: true, groupModalError: null });

        if (this.state.studId !== "0") {
            // Do an insert 
            const res = await Groups.addGroup(this.state.studId, g);
            if (!res.ok) {
                this.setState({ groupModalError: res.message, groupModalLoading: false });
            } else {
                this.setState({ groupModal: false, groupModalError: null, groupModalLoading: false });
                if (this.GroupList) {
                    this.GroupList.current.fetchGroups();
                }
            }
        } else this.setState({ groupModalError: "Invalid student", groupModalLoading: false });
    }

    // Html
    render() {
        return (
            <div className="GroupsPage flex-grid">
                <Card className="flex-col">
                    <Card.Header>
                        <div className="card-title">Groups</div>

                        <Button className="button-right" variant="link" size="sm" onClick={this.showGroupModal}><PlusSquare color="green" /></Button>
                    </Card.Header>
                    <Card.Body>
                        {this.state.studId !== "0" ?
                            <GroupList
                                ref={this.GroupList}
                                studId={this.state.studId}
                                onUpdated={this.groupListUpdated}
                            /> : "No groups"
                        }
                    </Card.Body>
                </Card>

                <Modal show={this.state.groupModal} onHide={this.hideGroupModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <GroupEditor
                            editable={true}
                            onSaveClicked={this.groupModalSave}

                            error={this.state.groupModalError}
                            loading={this.state.groupModalLoading}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default GroupsPage;