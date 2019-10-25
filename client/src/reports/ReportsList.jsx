import React from 'react'
import { List, Datagrid, TextField, EmailField, ArrayField, SingleFieldList, ChipField, DateField, NumberField, ReferenceField } from 'react-admin'

import { PostFilter } from './ReportsFilter'

export const ReportsList = (props) => (
    <List filters={<PostFilter />} bulkActionButtons={false} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id"/>
            <TextField source="data.device.ip" />
            <TextField source="data.device.mac" />
            <DateField source="createdAt" showTime />
            <ReferenceField label="user" source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
)
