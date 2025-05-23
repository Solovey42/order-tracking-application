# Order Tracking Application

Приложение для создания и отслеживания заказов. 

## Используемые технологии

### Backend (.NET 8 + ASP.NET Core)

- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Apache Kafka
- SignalR
### Frontend (React + TypeScript)

- React + TypeScript
- Redux для управления состоянием
- MUI

---

## Функционал

### Backend

- Создание и получение заказов
- Поддержка статусов: `Created`, `Sent`, `Delivered`, `Cancelled`
- Асинхронная отправка событий изменения статуса в Kafka
- Обновления статусов через SignalR Hub
### Frontend

- Список заказов
- Создание нового заказа
- Детальная страница заказа с автообновлением

---
## Быстрый запуск

Перейдите в папку scripts и запустите скрипты в завиимости от ОС:
### Windows (PowerShell)

`.\run.ps1`

###  Linux / macOS (Bash)

`chmod +x ./run.sh`
`./run.sh`


Backend - https://localhost:7013
Frontend - http://localhost:5173
