# Wi-Fi Scanner Server

## Production

Установить **terraform** и зарегистрировать аккаунт Heroku.

Данные аккаунта помещаются в файл *.netrc* вида:

```
machine api.heroku.com
    login <email>
    password <api-key>
```

Накат инфраструктуры:

```bash
terraform apply
```

## Development

Установить **docker-compose** и выполнить

```bash
docker-compose up
```
