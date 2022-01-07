import { useMutation, useQueryClient } from 'react-query';
import TodoApi from '../../api/TodoApi';
import { getKeyGetTodos } from './useGetTodos';

function useDeleteTodo(id) {
    const queryCache = useQueryClient();

    async function deleteTodo(id) {
        return await TodoApi.deleteTodo(id);
    }

    function filterTodos(todos, id) {
        return todos?.filter(todo => todo._id !== id) ?? [];
    }

    const { mutate } = useMutation(deleteTodo, {
        onSuccess: ({id}) => {      
            if (id) {
                return queryCache.setQueryData(getKeyGetTodos({}), (todos) => {
                    return filterTodos(todos, id)
                });
            }
        }
    });

    return { deleteTodo: mutate };
}

export default useDeleteTodo;