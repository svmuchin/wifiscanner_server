import React from 'react'
import { List, Datagrid, TextField, EmailField, ArrayField, SingleFieldList, ChipField, DateField, NumberField, ReferenceField } from 'react-admin'

export const ReportsList = (props) => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid rowClick="show">
            <TextField source="id"/>
            <TextField source="data.device.ip" />
            <TextField source="data.device.mac" />
            <DateField source="createdAt" showTime />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
)
