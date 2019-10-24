import React from 'react';
import { Show, Datagrid, SimpleShowLayout, TextField, DateField, EditButton, ReferenceField, TabbedShowLayout, Tab, ArrayField, SingleFieldList } from 'react-admin';

import { SignalField } from './SignalField'

export const ReportsShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField source="id" />
                <DateField source="createdAt" />
                <ReferenceField source="userId" reference="users" label="user" >
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="data.device.ip" />
                <TextField source="data.device.mac" />
                <TextField source="data.device.model" />
                <TextField source="data.device.softVersion" />
            </Tab>
            <Tab label="accessPoints" >
                <ArrayField source="data.accessPoints" addLabel={false}>
                    <Datagrid rowStyle={void 0}>
                        <TextField source="BSSID" />
                        <SignalField source="RSSI" label="signal" />
                        <TextField source="RSSI" />
                        <TextField source="SSID" />
                        <TextField source="channel" />
                    </Datagrid>
                </ArrayField>
            </Tab>
        </TabbedShowLayout>
    </Show>
)
