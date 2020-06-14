import React from 'react';
import {
    Card,
    Panel,
    Wizard,
    ListItem,
    AsyncLoadableDataList,
    RecordStatuses,
    componentManager,
    LogicalOperators,
    MultiValueOperators,
    Submitter
} from '../rw';

import WizardPage1 from './WizardPage1';
import WizardPage2 from './WizardPage2';
import WizardPage3 from './WizardPage3';

const WizardDemo = props => (
    <Card title="Wizard Demo"
        style={{
            width: '100%'
        }}
    >

        <Wizard>
            <Wizard.Step
                title="Step1"
                component={WizardPage1}
                goBack={window.history.back}
                onBeforeNext={(wizard) => {

                    wizard.mask();

                    // Simulate a validation post to the server
                    setTimeout(() => {
                        alert('Before next page after page 1');
                        wizard.goNext(); // Force the wizard to go to the next page without calling onBeforeNext
                        wizard.unmask();
                    }, 2000);

                    return false;
                }}
            />
            <Wizard.Step
                title="Step2"
                component={WizardPage2}
            />
            <Wizard.Step
                title="Step3"
                component={WizardPage3}
            />
        </Wizard>

    </Card>
);

export default WizardDemo;
