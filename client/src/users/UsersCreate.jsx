import React from 'react'
import { Create, SimpleForm, TextInput, SelectInput, translate } from 'react-admin'
import { required, email } from 'react-admin'

import { roles } from './roles'

export const UsersCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="email" type="email" validate={[required(), email()]} />
            <TextInput source="password" type="password" validate={required()} />
            <TextInput source="name" validate={required()} />
            <SelectInput source="role" choices={roles} validate={required()} />
        </SimpleForm>
    </Create>
)
