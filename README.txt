Инструкция для развертывания на Ubuntu (18.0).

Необходимы предустановленные:
.NET Core SDK 3.0
ASP.NET Core runtime 3.0
.NET Core runtime 3.0
PostgreSQL 10.10
Node.js 12.13.1

Последовательность действий:
1. Создать базу данных в PostgreSQL
2. Выполнить скрипт createTable.sql в бд (для создания необходимой таблицы)
3. (Опционально) Загрузить в таблицу демонстрационные данные из файла demoData.csv
4. Подставить свои данные подключения к бд в ConnectionStrings.Database в файле appsettings.json 
5. Выполнить скрипт BuildAndStart.sh (он выполнит сборку и запуск сервера. сборка будет находиться в bin/Release/netcoreapp3.0/publish)
6. Перейти в браузере по адресу http://localhost:5000/
