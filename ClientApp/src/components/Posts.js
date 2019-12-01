import React, { Component } from 'react';
import { Button, ButtonGroup, Input, Label, Row, Col } from 'reactstrap';
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

        const query = this.props.location.search;

        let orderType = query.orderType;
        this.orderType = orderType === undefined ? "forward" : orderType;

        let orderField = query.orderField;
        this.orderField = orderField === undefined ? "date" : orderField;

        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleBackPage = this.handleBackPage.bind(this);
        this.handleChangeOrderField = this.handleChangeOrderField.bind(this);
        this.handleChangeOrderType = this.handleChangeOrderType.bind(this);
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

    /// Обработчик перехода на предыдущую страницу
    handleBackPage(e) {
        this.currentPage -= 1;
        this.updatePosts();
    }

    handleChangeOrderField(e) {
        this.orderField = e.target.value;
        this.currentPage = 0;
        this.updatePosts();
    }

    handleChangeOrderType(e) {
        this.orderType = e.target.value;
        this.currentPage = 0
        this.updatePosts()
    }

    /// Обработчик перехода на следующую страницу
    handleNextPage(e) {
        this.currentPage += 1;
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
                    <Row>
                        <Col>
                        <Button onClick={() => this.openAddPostWindow()}
                            color="primary">
                                Добавить </Button>
                        </Col>
                        <Col>
                        <ButtonGroup>
                            <Button onClick={this.handleBackPage} disabled={page <= 1}> &#8592; </Button>
                            <p className="pageNumbers"> {page} / {countPages}</p>
                            <Button onClick={this.handleNextPage} disabled={page >= countPages}> &#8594; </Button>
                            </ButtonGroup>
                            </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label for="orderTypeSelector">Сортировать по</Label>
                            <Input type="select"
                                id="orderTypeSelector"
                                onChange={this.handleChangeOrderField}
                                value={this.orderField}>
                                <option value="email">Email</option>
                                <option value="date">Дате добавления</option>
                                <option value="userName">User Name</option>
                            </Input>
                        </Col>
                        <Col>
                            <Label for="orderTypeSelector">Порядок</Label>
                            <Input type="select"
                                id="orderTypeSelector"
                                onChange={this.handleChangeOrderType}
                                value={this.orderType}>
                                <option value="backward">По убыванию</option>
                                <option value="forward">По возрастанию</option>
                            </Input>
                        </Col>
                    </Row>
                </div>
                <div>
                    {this.getPostsPresents(this.state.posts)}
                </div>
            </div>
        );
    }

    /// Подгрузка постов с сервера.
    async updatePosts() {
        let uri = '/' + this.currentPage;
        uri += '?orderField=' + this.orderField;
        uri += '&orderType=' + this.orderType;
        this.props.history.push(uri);

        let fetchUri = 'api/posts?page=' + this.currentPage;
        fetchUri += '&orderField=' + this.orderField;
        fetchUri += '&orderType=' + this.orderType;
        const response = await fetch(fetchUri);
        const data = await response.json();

        if (data.isSuccess) {
            this.setState({
                posts: data.posts,
                countPages: 3//data.countPages
            });
        }
    }
}