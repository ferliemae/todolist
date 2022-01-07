import { useQuery } from 'react-query';

import TodoApi from '../../api/TodoApi';

export function getKeyGetTodos(params) {
    return [{ key: TodoApi.keyGetPosts, ...params }];
}

const useGetTodos = (params) => {
    const keyGetTodos = getKeyGetTodos(params);

    return useQuery(keyGetTodos, TodoApi.getTodos);
}

export default useGetTodos;