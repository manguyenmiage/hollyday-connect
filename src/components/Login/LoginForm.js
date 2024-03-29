import React, {Component} from 'react'
import Form from "react-bootstrap/Form";
import './Login.css'
import {connect} from "react-redux";
import {doLoginRequest, doLoginFacebookRequest} from '../../actions/authentification_actions'
import AuthButton from '../Button/AuthButton'
import {Alert} from "react-bootstrap";
import {Formik} from "formik";
import schema from "./SchemaValidation";
import {withRouter} from "react-router-dom";
import history from '../../history'
import CustomLink from "../CustomLink/CustomLink";
import FacebookAuthButton from "../Button/FacebookAuthButton";

const appID =  process.env.REACT_APP_API_MODE_CONNECT === 'local'
    ? process.env.REACT_APP_FB_ID_DEV
    : process.env.REACT_APP_FB_ID_PROD

class LoginForm extends Component {

    componentDidMount() {
        if (this.props.loggedIn) {
            history.push('/start-trip/')
        }
    }

    componentDidUpdate(){
        if (this.props.loggedIn) {
            history.push('/start-trip/')
        }
    }
    handleSubmit = (values, actions) => {
        const {email, password} = values
        this.props.loginRequest({email, password})
        actions.setSubmitting(false)
    }

    handleSocialLoginSuccess = (user) => {
        this.props.loginFacebookRequest(user)
    }

    handleSocialLoginFailure = (err) => {
        console.log(err)
    }

    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={schema}
                onSubmit={this.handleSubmit}

                render={props => (
                    <div>
                        <Form
                            name="loginForm"
                            noValidate
                            onSubmit={props.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Saisir votre e-mail "
                                    name="email"
                                    value={props.values.email}
                                    onChange={props.handleChange}
                                    isInvalid={props.touched.email && props.errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {props.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Mot de passe"
                                    name="password"
                                    value={props.values.password}
                                    onChange={props.handleChange}
                                    isInvalid={props.touched.password && props.errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {props.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {this.props.logginFail ?
                                <Alert variant='danger'>
                                    {this.props.msgError}
                                </Alert> : ''}
                            <AuthButton label="Se connecter" loggingIn={this.props.loggingIn}/>
                            <hr/>
                            <FacebookAuthButton
                                provider='facebook'
                                appId = {appID}
                                loggingInFb={this.props.loggingInFb}
                                onLoginSuccess={this.handleSocialLoginSuccess}
                                onLoginFailure={this.handleSocialLoginFailure}
                            />
                        </Form>
                        <div className="buttonSignUp">
                            <CustomLink
                                label="Créer un compte"
                                url="/signup"
                            >
                                Créer un compte
                            </CustomLink>
                        </div>
                    </div>
                )
                }
            />)
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentificationState.loggedIn,
    loggingIn: state.authentificationState.loggingIn,
    loggingInFb: state.authentificationState.loggingInFb,
    logginFail: state.authentificationState.logginFail,
    msgError: state.authentificationState.msgError
})


function mapDispatchToProps(disptach) {
    return {
        loginRequest: user => disptach(doLoginRequest(user)),
        loginFacebookRequest: user => disptach(doLoginFacebookRequest(user))
    }
}

const FormLogin = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default withRouter(FormLogin)

