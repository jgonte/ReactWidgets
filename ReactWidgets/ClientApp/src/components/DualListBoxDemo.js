import React from 'react';
import {
    Card,
    Panel,
    DualListBox,
    ListItem,
    AsyncLoadableDataList,
    RecordStatuses,
    componentManager,
    LogicalOperators,
    MultiValueOperators,
    Submitter
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
                            <ListItem
                            //onRecordChanged={cfg => {

                            //    if (cfg.record.status === RecordStatuses.Removed) {

                            //        this.setSelectable(false);
                            //    }
                            //}}
                            >
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
                        recordKey={[
                            'organizationId',
                            'studentId'
                        ]}
                        renderItem={item => (
                            <ListItem>
                                [{item.organizationId}] (<span>{item.studentId}</span>) - <span>{item.fullName}</span>
                            </ListItem>
                        )}
                        //onLoadData={data => {
                        //    // Now load the available list filtering out the already assigned people in the list
                        //    componentManager.get('availablePeopleList').load();
                        //}}
                        //autoLoad={false}
                    />
                </Panel>
            }
            onAddSelectedButtonClicked={selection => {
                const organizationId = 1;

                const data = selection.map(item => {
                    return {
                        organizationId,
                        studentId: item.id,
                        fullName: item.fullName
                    }
                });

                new Submitter({
                    url: 'api/enrollments',
                    onData: data => {

                        componentManager.get('availablePeopleList').load();

                        componentManager.get('assignedPeopleList').load();
                    },
                    onError: error => alert(JSON.stringify(error))
                })
                .submit({
                    method: 'post',
                    data
                });
            }}
            onRemoveSelectedButtonClicked={selection => {
                new Submitter({
                    url: 'api/enrollments',
                    onData: data => {

                        componentManager.get('availablePeopleList').load();

                        componentManager.get('assignedPeopleList').load();
                    },
                    onError: error => alert(JSON.stringify(error))
                })
                .submit({
                    method: 'delete',
                    data: selection
                });
            }}
        />

    </Card>
);

export default DualListBoxDemo;
