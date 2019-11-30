import React, { Component } from 'react';
import { ButtonGroup, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './AddPostForm.css';

export class AddPostForm extends Component {
    static displayName = AddPostForm.name;

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            homepage: '',
            text: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeHomepage = this.handleChangeHomepage.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    /// Обработка закрытия формы
    handleClose(e) {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    /// Обработка изменения поля email
    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    /// Обработка изменения поля homepage
    handleChangeHomepage(e) {
        this.setState({ homepage: e.target.value });
    }

    /// Обработка изменения поля user name
    handleChangeUserName(e) {
        this.setState({ userName: e.target.value });
    }

    /// Обработка изменения поля сообщения
    handleChangeText(e) {
        this.setState({ text: e.target.value });
    }

    /// Обработка сброса полей
    handleReset(e) {
        this.setState({
            userName: '',
            email: '',
            homepage: '',
            text: ''
        });
    }

    /// Обработка нажатия кнопки отправить
    handleSubmit(e) {
        this.sendPost();
        
    }

    render() {
        return (
            <div>
                <div className="bg" onClick={this.handleClose} />
                <div className="addPostForm">
                    <Form>
                        <FormGroup>
                            <Label for="emailInput">Email</Label>
                            <Input type="email"
                                name="email"
                                id="emailInput"
                                value={this.state.email}
                                onChange={this.handleChangeEmail}/>
                            <Label for="userNameInput">User Name</Label>
                            <Input type="text"
                                name="userName"
                                id="userNameInput"
                                value={this.state.userName}
                                onChange={this.handleChangeUserName}/>
                            <Label for="homepageInput">Homepage</Label>
                            <Input type="url"
                                name="homepage"
                                id="homepageInput"
                                value={this.state.homepage}
                                onChange={this.handleChangeHomepage}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="textInput">Text</Label>
                            <Input type="textarea"
                                name="text"
                                id="textInput"
                                value={this.state.text}
                                onChange={this.handleChangeText}/>
                        </FormGroup>

                        <FormGroup>
                            <ButtonGroup>
                                <Button color="primary"
                                    onClick={this.handleSubmit}>Добавить</Button>
                                <Button color="secondary"
                                    onClick={this.handleReset}>Очистить</Button>
                                <Button color="secondary"
                                    onClick={this.handleClose}>Отмена</Button>
                            </ButtonGroup>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }

    /// Отправка поста на сервер.
    async sendPost() {

        const response = await fetch('api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.state)
        });
        const data = await response.json();

        if (data.isSuccess) {
            
            if (this.props.onClose) {
                this.props.onClose();
            }
            if (this.props.onSuccessAdd) {
                alert("d")
                this.props.onSuccessAdd();
            }
        }

    }
}