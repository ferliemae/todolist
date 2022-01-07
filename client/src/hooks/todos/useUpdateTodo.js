import { useMutation, useQueryClient } from 'react-query';

import TodoApi from '../../api/TodoApi';
import { getKeyGetTodos  } from './useGetTodos';

function useUpdateTodo() {
    const queryCache = useQueryClient();

    const { mutate } = useMutation(TodoApi.updateTodo, {
        onMutate: (params) => {
            return queryCache.setQueryData(getKeyGetTodos({}), todos => {
                return todos?.map((todo) => {
                    if (todo._id === params.todo_id) {
                        return { ...params.data };
                    }

                    return todo;
                })
            })
        }
    })

    return { updateTodo: mutate };
}

export default useUpdateTodo;