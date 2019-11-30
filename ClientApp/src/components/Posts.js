import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { AddPostForm } from './AddPostForm';
import './Posts.css'


export class Posts extends Component {
    static displayName = Posts.name;

    constructor(props) {
        super(props);
        this.state = {
            isAddingPost: false,
            posts: [],
            countPages: 0
        };

        let page = this.props.match.params.page;
        page = page === undefined ? 0 : Number(page);
        this.currentPage = page;

        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleBackPage = this.handleBackPage.bind(this);
    }

    /// Открытие формы добавления поста.
    openAddPostWindow() {
        this.setState({
            isAddingPost: true,
        });
    }

    /// Закрытие форма добавления поста
    closeAddPostWindow() {
        this.setState({
            isAddingPost: false
        });
    }

    /// Обработчик перехода на следующую страницу
    handleNextPage(e) {
        this.currentPage += 1
        this.props.history.push("/" + this.currentPage)
        this.updatePosts();
        
    }

    /// Обработчик перехода на предыдущую страницу
    handleBackPage(e) {
        this.currentPage -= 1
        this.props.history.push("/" + this.currentPage)
        this.updatePosts();
    }

    componentDidMount() {
        this.updatePosts();
    }

    /// Получить вывод постов из массива
    getPostsPresents(posts) {
        return posts.map(function (item) {
            let date = new Date(item.date)
            let options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }
            return (
                <div className="post">
                    <div>
                        <p>{item.userName} - {item.email}</p>
                    </div>
                    <div>
                        <p>{item.text}</p>
                    </div>
                    <div>
                        <p align="right">{date.toLocaleString("ru", options)}</p>
                    </div>
                </div>)
        })
    }

    render() {
        let page = this.currentPage + 1;
        let countPages = this.state.countPages;
        page = countPages === 0 ? 0 : page;

        
        return (
            <div>
                {this.state.isAddingPost ? <AddPostForm onClose={() => this.closeAddPostWindow()}
                    onSuccessAdd={() => this.updatePosts()} /> : null}
                <div>
                    <Button onClick={() => this.openAddPostWindow()}
                        color="primary">
                        Добавить
                    </Button>
                    <ButtonGroup>
                        <Button onClick={this.handleBackPage} disabled={page <= 1}> &#8592; </Button>
                        <p className="pageNumbers"> {page} / {countPages}</p>
                        <Button onClick={this.handleNextPage} disabled={page >= countPages}> &#8594; </Button>
                    </ButtonGroup>
                </div>
                <div>
                    {this.getPostsPresents(this.state.posts)}
                </div>
            </div>
        );
    }

    /// Подгрузка постов с сервера.
    async updatePosts() {
        const response = await fetch('api/posts?page=' + this.currentPage);
        const data = await response.json();

        if (data.isSuccess) {
            this.setState({
                posts: data.posts,
                countPages: data.countPages
            });
        }
    }
}