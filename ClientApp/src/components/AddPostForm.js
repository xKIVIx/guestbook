import React, { Component } from 'react';
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
        e.preventDefault();

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
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div>
                    <div className="bg" onClick={this.handleClose} />
                    <div className="addPostForm">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    User Name
                                    <input type="text"
                                        required
                                        value={this.state.userName}
                                        onChange={this.handleChangeUserName}
                                        className="inputField" />
                                </label>
                            </div>
                            <div>
                                <label>
                                    E-mail
                                <input type="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.handleChangeEmail}
                                        className="inputField"
                                        align="right"/>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Homepage
                                <input type="url"
                                        value={this.state.homepage}
                                        onChange={this.handleChangeHomepage}
                                        className="inputField"/>
                                </label>
                            </div>
                            <div>
                                <textarea required
                                    onChange={this.handleChangeText}
                                    value={this.state.text}
                                    className="inputField"/>
                            </div>
                            <div>
                                <input type="submit"
                                    value="Добавить"
                                    className="button" />
                                <input type="button"
                                    value="Сброс"
                                    onClick={this.handleReset}
                                    className="button" />
                                <input type="button"
                                    value="Отмена"
                                    onClick={this.handleClose}
                                    className="button" />
                            </div>
                        </form>
                    </div>
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
        }

    }
}