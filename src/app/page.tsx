"use client";
import { Provider } from 'react-redux';

import { store } from '../state/store';
import ScribeView from '../components/ScribeView';

export default function Home() {
  return (
    <main>
      <Provider store={store}>
        <ScribeView />
      </Provider>
    </main>
  );
}