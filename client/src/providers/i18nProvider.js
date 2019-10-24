import russianMessages from 'ra-language-russian'

const messages = {
    'ru': {
        ...russianMessages,
        resources: {
            users: {
                name: 'Пользователь |||| Пользователи',
                fields: {
                    email: 'Email',
                    password: 'Пароль',
                    name: 'Имя',
                    role: 'Роль',
                },
            },
            reports: {
                name: 'Отчёты',
                fields: {
                    createdAt: 'Создан',
                    user: 'Пользователь',
                    BSSID: 'BSSID',
                    RSSI: 'RSSI',
                    SSID: 'SSID',
                    channel: 'Канал',
                    'data.device.ip': 'IP-адрес',
                    'data.device.mac': 'MAC-адрес',
                    'data.device.model': 'Модель',
                    'data.device.softVersion': 'Версия ОС',
                }
            }
        },
        role: {
            admin: 'Администратор',
            engineer: 'Инженер',
            user: 'Пользователь',
        },
        accessPoints: 'Точки доступа',
        signal: 'Уровень сигнала',
        user: 'Пользователь',
        summary: 'Общая',
    }
}

export const i18nProvider = locale => messages[locale]
