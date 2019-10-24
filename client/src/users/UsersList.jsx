import React from 'react'
import { List, Datagrid, TextField, EmailField, SelectField } from 'react-admin'

import { roles } from './roles'

export const UsersList = (props) => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="name" />
            <SelectField source="role" choices={roles} />
        </Datagrid>
    </List>
)
