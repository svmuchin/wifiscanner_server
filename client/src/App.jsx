import React from 'react'
import { Admin, Resource, ListGuesser, fetchUtils, resolveBrowserLocale } from 'react-admin'

import { authProvider, i18nProvider, dataProvider } from './providers'
import { UsersList, UsersCreate } from './users'
import { ReportsList, ReportsShow } from './reports'

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

export default () =>
    <Admin
        locale={resolveBrowserLocale()}
        dataProvider={dataProvider}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
    >
        <Resource name="reports" list={ReportsList} show={ReportsShow} icon={PostIcon} />
        <Resource name="users" list={UsersList} create={UsersCreate} icon={UserIcon} />
    </Admin>
