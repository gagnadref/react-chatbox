import path from 'path';
import express from 'express';
import handlebars from 'express-handlebars';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './generated/app';

const app = express();

// View templates
app.engine('handlebars', handlebars({
  defaultLayout: 'etudiant.gouv.handlebars',
  layoutsDir: path.resolve(__dirname, 'views/layouts'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));

// Static assets
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.resolve(__dirname, '../www.etudiant.gouv.fr')));

// Routes
app.get('/', (request, response) => {
  const initialState = {
    isOpen: false,
    user: {
      currentName: '',
    },
    users: {},
    currentMessage: '',
    messages: [],
    chats: {},
  };
  const store = createStore((state = initialState) => state);
  const appContent = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  response.render('app', {
    app: appContent,
    initialState: JSON.stringify(initialState),
  });
});

export default app;
