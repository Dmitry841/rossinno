## log file viewer
## Welcome to log file viewer app - Приложение для просмотра последних изменений в лог файле.

Добрый день.<br />
Обоснование технологий.<br />
Для данного кейса для сервера достаточно нативного node.js сервера и концепции лонг пуллинг(Цитата из https://learn.javascript.ru/:
> "Длинные опросы – это самый простой способ поддерживать постоянное соединение с сервером, не используя при этом никаких специфических протоколов (типа WebSocket или Server Sent Events).
> Его очень легко реализовать, и он хорошо подходит для многих задач.")

Для ui части можно обойтись нативным html с js кодом через eventListener и т.д.

Но, почитав про требования указанные в вакансии, сделал согласно стэка указанных технологий:<br />
Сервер:<br />
    Nestjs + WS + typescript. Использовал готовую библиотеку для получения последних строк  'read-last-lines-ts', но можно было и через команды терминала с помощью 'child_process'<br />
Клиент:<br />
    vue.js + typescript

Можно без typescript на клиенте, но привык с ним.
Так как не совсем понял, как реализовать проверку обновления файла(добавления строк) на клиенте реализовал ручное добавление через инпут.
Можно было по таймеру(интервалу) на сервере добавлять строку.
Также в проекте использую часть предоставленного файла - весь файл слишком велик.

### Для развертывания проекта необходим git, nodejs. Далее нужно сделать клон проекта(команда "git clone  https://github.com/Dmitry841/rossinno.git"), перейти в папку проекта, затем:

* Перейти в папку "server" и установить зависимости командой "npm install".

* Находясь в папке "server" сделать билд проекта командой "npm run build", далее убедиться, что свободен порт по умолчанию - 3000 и запустить сервер командой  "npm run start:prod" и перейти на url  "http://localhost:3000/".

Если необходимо отдельно запустить ui сервер, то нужно перейти в папку "client", и также установить зависимости командой "npm install", далее запустить сервер командой "npm run dev".

url и port находятся в .env файлах, в продакшн файлы должны быть в .gitignore, в тестовом задании я их пушу для удобства.

Спасибо, что дочитали.