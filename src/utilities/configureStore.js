import models from '../models';
import { init } from "@rematch/core";
import persistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';

export default function configureStore() {
    const persistConfig = {
        key: "root",
        storage,
    }

    return init({
        plugins: [persistPlugin(persistConfig)],
        models,  
    })
}