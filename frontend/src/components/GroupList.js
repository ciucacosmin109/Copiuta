import React from 'react';
import Groups from '../data/Groups';

import GroupElement from "./GroupElement"

import './GroupList.css';

class GroupList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],

            loading: true,
            error: null,

        };

    }
    async componentDidMount() {
        await this.fetchGroups();
    }
    fetchGroups = async () => {
        const groupsRes = await Groups.getAllGroupsByStudentId(this.props.studId);
        if (!groupsRes.ok) {
            this.setState({ loading: false, error: "Groups: " + groupsRes.message });
            return;
        }

        this.setState({
            groups: groupsRes.result,

            loading: false,
            error: null
        });

        if (this.props.onUpdated)
            this.props.onUpdated();
    }

    deleteNote = async index => {
        const result = await Groups.deleteGroup(this.state.groups[index].id);
        if (result.ok) {
            this.setState({ groups: this.state.groups.filter((_, i) => i !== index) });

            if (this.props.onUpdated)
                this.props.onUpdated();
        } else {
            this.setState({ error: result.message });
        }
    }

    render() {
        return (
            <div className="GroupList">
                {this.state.groups.length === 0 ? "No groups" : <></>}
                {this.state.groups.map((elem, index) =>
                    <GroupElement key={index}
                        group={elem} // showNotes
                        readOnly={!elem.isAdmin}
                        onUpdated={this.fetchGroups}
                        onDelete={() => this.deleteNote(index)}
                    />
                )}

            </div>
        );
    }
}

export default GroupList; 