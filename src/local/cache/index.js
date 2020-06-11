import {InMemoryCache} from "apollo-cache-inmemory";

const cache = new InMemoryCache();

cache.writeData({
    data: {
        session_id: localStorage.getItem('session_id'),
        user_id: localStorage.getItem('user_id'),
        todoList: [],
    },
});

export default cache
