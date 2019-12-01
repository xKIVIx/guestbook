import React, { Component } from 'react';
import { ButtonGroup, Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import './AddPostForm.css';

const MAX_LEN_TEXT = 1000
const MAX_LEN_EMAIL = 100
const MAX_LEN_USER_NAME = 100
const MAX_LEN_HOMEPAGE = 300

export class AddPostForm extends Component {
    static displayName = AddPostForm.name;

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            homepage: '',
            text: '',
            isInvalidEmail: false,
            isInvalidUserName: false,
            isInvalidHomepage: false,
            isInvalidText: false
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeHomepage = this.handleChangeHomepage.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    /// Проверка корректен ли email
    checkIsCorrectEmail(email) {
        const reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/m;
        return email.search(reg) != -1;
    }

    /// Проверка корректности домашней страницы
    checkIsCorrectHomepage(homepage) {
        const reg = /^(http[s]?:\/\/)?(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+$/m;
        if (homepage.length > 0) {
            if (homepage.search(reg) != -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }

    }

    /// Проверка корректности введеного имени пользователя
    checkIsCorrectUserName(userName) {
        const reg = /^[\w ]+$/m;
        return userName.length > 0 &&
               userName.search(reg) != -1;
    }

    /// Проверка корректности введеного сообщения
    checkIsCorrectText(text) {
        const reg = /<[\w/ ]+>/m;
        return text.length > 0 &&
               text.search(reg) == -1;
    }

    /// Обработка закрытия формы
    handleClose(e) {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    /// Обработка изменения поля email
    handleChangeEmail(e) {
        this.setState({
            email: e.target.value,
            isInvalidEmail: false
        });
    }

    /// Обработка изменения поля homepage
    handleChangeHomepage(e) {
        this.setState({
            homepage: e.target.value,
            isInvalidHomepage: false
        });
    }

    /// Обработка изменения поля user name
    handleChangeUserName(e) {
        this.setState({
            userName: e.target.value,
            isInvalidUserName: false
        });
    }

    /// Обработка изменения поля сообщения
    handleChangeText(e) {
        this.setState({
            text: e.target.value,
            isInvalidText: false
        });
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
        let succesCheck = true;

        if (!this.checkIsCorrectEmail(this.state.email)) {
            this.setState({
                isInvalidEmail: true
            });
            succesCheck = false;
        }

        if (!this.checkIsCorrectHomepage(this.state.homepage)) {
            this.setState({
                isInvalidHomepage: true
            });
            succesCheck = false;
        }

        if (!this.checkIsCorrectUserName(this.state.userName)) {
            this.setState({
                isInvalidUserName: true
            });
            succesCheck = false;
        }

        if (!this.checkIsCorrectText(this.state.text)) {
            this.setState({
                isInvalidText: true
            });
            succesCheck = false;
        }

        if (succesCheck) {
            this.sendPost();
        }
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
                                onChange={this.handleChangeEmail}
                                invalid={this.state.isInvalidEmail}
                                maxLength={MAX_LEN_EMAIL}/>
                            <FormFeedback>Неверный email адресс</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="userNameInput">User Name</Label>
                            <Input type="text"
                                name="userName"
                                id="userNameInput"
                                value={this.state.userName}
                                onChange={this.handleChangeUserName}
                                invalid={this.state.isInvalidUserName}
                                maxLength={MAX_LEN_USER_NAME}/>
                            <FormFeedback>Неверное имя пользователя</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="homepageInput">Homepage</Label>
                            <Input type="url"
                                name="homepage"
                                id="homepageInput"
                                value={this.state.homepage}
                                onChange={this.handleChangeHomepage}
                                maxLength={MAX_LEN_HOMEPAGE}
                                invalid={this.state.isInvalidHomepage} />
                            <FormFeedback>Некорректный URL</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="textInput">Text</Label>
                            <Input type="textarea"
                                required
                                name="text"
                                id="textInput"
                                value={this.state.text}
                                onChange={this.handleChangeText}
                                invalid={this.state.isInvalidText}
                                maxLength={MAX_LEN_TEXT}/>
                            <FormFeedback>Нельзя отправить пустое сообщение. HTML теги недопустимы.</FormFeedback>
                            <FormText>{this.state.text.length} / {MAX_LEN_TEXT}</FormText>
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
                this.props.onSuccessAdd();
            }
        } else {
            switch (data.uncorrectParam) {
                case "UserName":
                    this.setState({ isInvalidUserName: true })
                    break;
                case "Email":
                    this.setState({ isInvalidEmail: true })
                    break;
                case "Homepage":
                    this.setState({ isInvalidHomepage: true })
                    break;
                case "Text":
                    this.setState({ isInvalidText: true })
                    break;
            }
        }

    }
}