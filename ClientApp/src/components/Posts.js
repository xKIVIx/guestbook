import React, { Component } from 'react';
import { AddPostForm } from './AddPostForm';

export class Posts extends Component {
    static displayName = Posts.name;

    constructor(props) {
        super(props);
        this.state = { isAddingPost: false };
    }

    /// Открытие формы добавления поста.
    openAddPostWindow() {
        this.setState({
            isAddingPost: true
        });
    }

    /// Закрытие форма добавления поста
    closeAddPostWindow() {
        this.setState({
            isAddingPost: false
        });
    }

    componentDidMount() {
        this.updatePosts();
    }

    render() {
        return (
            <div>
                <button onClick={() => this.openAddPostWindow()}>
                    Open
                </button>
                {this.state.isAddingPost ? <AddPostForm onClose={() => this.closeAddPostWindow()} /> : null}
            </div>
        );
    }

    /// Подгрузка постов с сервера.
    async updatePosts() {
        const response = await fetch('api/posts');
        const data = await response.json();
        
    }
}