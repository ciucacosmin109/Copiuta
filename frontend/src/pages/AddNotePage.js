import React from 'react';
import Notes from '../data/Notes';
import Tags from '../data/Tags';

import NoteEditor from '../components/NoteEditor'

class AddNotePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false
        }

        console.log("Coming from: ", this.getPreviousUrl());
    }
    getPreviousUrl = () => { // or 'from' object
        if (this.props.location.state && this.props.location.state.from) {
            return this.props.location.state.from;
        } else if (window.history.state && window.history.state.previousUrl) {
            return window.history.state.previousUrl;
        } else {
            return { pathname: "/" };
        }
    }

    handleSave = async (note, tags) => {
        this.setState({ loading: true });

        const { params } = this.props.match;
        if (params.courseId) {
            // Do an insert 
            const res = await Notes.addNote(params.courseId, note);
            if (!res.ok) {
                this.setState({ error: res.message, loading: false });
                return;
            }

            // Add tags
            await Tags.deleteAllTags(res.newId);
            for (let i = 0; i < tags.length; i++) {
                const res2 = await Tags.addTag(res.newId, { name: tags[i] });
                if (!res2.ok) {
                    this.setState({ error: res2.message, loading: false });
                }
            }

            // Redirect  
            const from = this.getPreviousUrl();
            this.props.history.push(from);
        }
    }

    render() {
        // demo entities
        // stud: 2e63ac63-1c75-40b1-af3b-a74aca1bbc2d
        // course: 4206654e-281d-4c34-ab77-c01c7735012e
        // note: cd34b09e-3ebf-428c-bf49-6cd5301df993
        return (
            <NoteEditor
                editable={true}
                onSaveClicked={this.handleSave}

                error={this.state.error}
                loading={this.state.loading}
            />
        );
    }
}

export default AddNotePage; 