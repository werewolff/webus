#Front-end Giveaway time

## Установка

    git clone git@bitbucket.org:contestmanager/cm_ui.git ~/cm_ui
    cd ~/cm_ui/ 
    npm install
    npm run start - for start dev server
    npm run test - testing all app
    npm run test-coverage - show coverage of testing
    npm run build - for build app in /public
    npm run build-debug - build app and run dev server
    
## Настройка подключения к API
    Обращения к АПИ происходят при помощи ПРОКСИ, таким образом
    обращения идут с одного домена и не являются кросс-доменными.
    
    В файле Settings.js:
        //MAIN
        TYPE_HTTP = "http://"; - тип http фронта
        DOMAIN_URL = "localhost:8080"; - URL адрес фронта
        //API
        API_URL = "/api/" - путь к api
        
    В результате получается путь "http://localhost:8080/api/"
    
    В настройках dev сервера в webpack.config.js настроен прокси,
    что все обращения к /api будут перенаправлены на адрес:порт "http://127.0.0.1:8000"
    В результате будет запрос http://127.0.0.1:8000/api/{method_name}
    
    Само название метода подставляется непосредственно в методах actions в 
    функцию ajax как аргумент path
    
     
