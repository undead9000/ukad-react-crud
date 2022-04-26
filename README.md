## Описание задачи

1. Выполнить запрос на https://jsonplaceholder.typicode.com/todos, отобразить данные в виде таблицы с пагинацией (количество записей на страницу - произвольное, добавить query параметр pageNumber в url c номером активной страницы при каждом переключении). Сделать так, чтобы при перезагрузке страницы сразу отображалась соответствующая страница в зависимости от параметра pageNumber в адресной строке.
2. Добавить search field с поиском по вхождению введенного значения в поле title (использовать debounce введенного значения)
3. По клику на определенный айтем в таблице, выполнить запрос на получение деталей выбранного пункта, к примеру, https://jsonplaceholder.typicode.com/todos/104 (использовать поле id внутри элемента списка) и показать их в любом удобном виде (можно попап, можно просто вывести блок с данными прямо в таблице.

## Исполнение
Использовал несколько библиотек дополнительно, ReactPaginate для пагинации, axios для получения данных по эндпойнту и lodash для debouncing. Весь код писал в одном файле App.js. 

## Необходимые доработки
1. Баг с пагинацией, если результатов поиска больше, чем выводится айтемов в списке на одну страницу. Вторая и далее страницы пагинации отрабатывают некорректно.
2. Нужен рефакторинг, часть имён всё ещё с "временными" названиями, стоит переименовать в соответствии с смысловой нагрузкой.
3. Нужно вынести код, который отвечает за получение данных с эндпойнта и пагинацию в отдельную функцию.
4. Разбить один файл с кодом на несколько файлов с компонентами.

Не считаю результат работы удовлетворительным.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
