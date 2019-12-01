import React from 'react';
import {
    Card,
    Panel,
    DualListBox,
    ListItem,
    AsyncLoadableDataList,    componentManager,
    LogicalOperators,
    MultiValueOperators
} from '../rw';


const DualListBoxDemo = props => (
    <Card title="Assign People"
        style={{
            width: '100%'
        }}
    >

        <DualListBox
            leftList={
                <Panel
                    title="Available People"
                >
                    <AsyncLoadableDataList
                        id="availablePeopleList"
                        loadUrl="api/students"
                        //autoLoad={false} // Wait for the assigned list to load first so we can filter out the selected ones
                        recordKey="id"
                        renderItem={item => (
                            <ListItem>
                                (<span>{item.id}</span>) - <span>{item.fullName}</span>
                            </ListItem>
                        )}
                        //initialFilter={{
                        //    operator: LogicalOperators.Not,
                        //    filter: {
                        //        fieldName: 'id',
                        //        operator: MultiValueOperators.In,
                        //        fieldValues: () => {
                        //            return componentManager.get('assignedPeopleList')
                        //                .getData()
                        //                .map(item => item.id);
                        //        }
                        //    }
                        //}}
                    />
                </Panel>
            }
            rightList={
                <Panel
                    title="Assigned People"
                >
                    <AsyncLoadableDataList
                        id="assignedPeopleList"
                        loadUrl="api/enrollments"
                        recordKey="id"
                        renderItem={item => (
                            <ListItem>
                                [{item.organizationId}] (<span>{item.studentId}</span>) - <span>{item.fullName}</span>
                            </ListItem>
                        )}
                        onLoadData={data => {
                            // Now load the available list filtering out the already assigned people in the list
                            componentManager.get('availablePeopleList').load();
                        }}
                        autoLoad={false}
                    />
                </Panel>
            }
        />

    </Card>
);

export default DualListBoxDemo;
