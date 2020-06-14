import React from 'react';
import Step from './Step';
import {
    Button,
    Spin,
    Card
} from 'antd';

export default class Wizard extends React.Component {

    static get Step() { return Step; }

    _state = {
        mask: false,
        selected: this.props.selected || 0,
        nextButtonDisabled: false,
        backButtonDisabled: false
    }

    constructor(props) {

        super(props);

        this.mask = this.mask.bind(this);

        this.unmask = this.unmask.bind(this);

        this.next = this.next.bind(this);

        this.back = this.back.bind(this);

        if (this._state.selected === 0) { // Disable back button for first step

            this._state.backButtonDisabled = true;
        }
    }

    render() {

        const mask = this._state.mask;

        if (mask) {

            return (
                <Spin tip="Please wait...">
                    {this.renderStep()}
                    {this.renderWizardButtons()}
                </Spin>
            );
        }
        else {
            return (
                <div>
                    {this.renderStep()}
                    {this.renderWizardButtons()}
                </div>
            );
        }
    }

    renderStep() {
        const step = this.getSteps()[this._state.selected];

        const title = step.props.title;

        return (
            <Card title={title} style={{ width: '100%' }}>
                {step}
            </Card>
        );
    }

    renderWizardButtons() {

        const toolbarStyle = {
            margin: '20px'
        }

        const buttonStyle = {
            marginRight: '8px',
            marginBottom: '12px'
        };

        const {
            backButtonDisabled,
            nextButtonDisabled
        } = this._state;

        return (
            <div style={toolbarStyle}>
                <Button
                    type="primary"
                    style={buttonStyle}
                    onClick={this.back}
                    disabled={backButtonDisabled}
                >
                    Back
                </Button>

                <Button
                    type="primary"
                    style={buttonStyle}
                    onClick={this.next}
                    disabled={nextButtonDisabled}
                >
                    Next
                </Button>

            </div>
        );
    }

    getSteps() {

        if (this.props.children) {

            return React.Children.toArray(this.props.children);
        }
        else if (this.props.steps) {

            return this.props.steps;
        }
    }

    updateState() {
        this.setState(this._state);
    }

    mask() {

        this._state.mask = true;

        this.updateState();
    }

    unmask() {

        this._state.mask = false;

        this.updateState();
    }

    next() {

        const step = this.getSteps()[this._state.selected];

        if (step.props.onBeforeNext && step.props.onBeforeNext(this) === false) {
            return;
        }

        this.goNext();
    }

    back() {

        const step = this.getSteps()[this._state.selected];

        if (step.props.onBeforeBack && step.props.onBeforeBack(this) === false) {
            return;
        }

        this.goBack();
    }

    goNext() {

        ++this._state.selected;

        if (this._state.selected >= this.getSteps().length - 1) {

            this.disableNextButton();
        }

        this.enableBackButton();

        this.updateState();
    }

    goBack() {

        if (this.props.goBack) {

            this.props.goBack(this);
        }

        --this._state.selected;

        if (this._state.selected <= 0) {

            this.disableBackButton();
        }

        this.enableNextButton();

        this.updateState();
    }

    enableNextButton() {

        if (this._state.nextButtonDisabled === false) { // Already enabled

            return;
        }

        this._state.nextButtonDisabled = false;

        this.updateState();
    }

    disableNextButton() {

        if (this._state.nextButtonDisabled === true) { // Already disabled

            return;
        }

        this._state.nextButtonDisabled = true;

        this.updateState();
    }

    enableBackButton() {

        if (this._state.backButtonDisabled === false) { // Already enabled

            return;
        }

        this._state.backButtonDisabled = false;

        this.updateState();
    }

    disableBackButton() {

        if (this._state.backButtonDisabled === true) { // Already disabled

            return;
        }

        this._state.backButtonDisabled = true;

        this.updateState();
    }
}