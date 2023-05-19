import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    valueName: '',
    disableButton: true,
    loading: false,
    redirect: false,
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, this.buttonAvailable);
  }

  buttonAvailable = () => {
    const { valueName } = this.state;
    const minCharacters = 3;
    if (valueName.length >= minCharacters) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  loginButton = async () => {
    const { valueName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: valueName });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { valueName, disableButton, loading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="inputName">
            Insira Seu Nome:
            <input
              name="valueName"
              id="inputName"
              type="text"
              data-testid="login-name-input"
              value={ valueName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ disableButton }
            data-testid="login-submit-button"
            onClick={ this.loginButton }
          >
            Entrar

          </button>
        </form>
        <div>
          { loading && <Loading />}
          { redirect && <Redirect to="/search" />}
        </div>
      </div>
    );
  }
}

export default Login;
