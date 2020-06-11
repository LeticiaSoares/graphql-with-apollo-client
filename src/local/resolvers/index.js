
const setTodoListClient = (_root, { todoList }, { cache, getCacheKey }) => {
    console.log('setTodoListClient',todoList)
    cache.writeData({data : {todoList}})
}

export const mutations = {
    setTodoListClient,
};

export const querys = {}
