import { useMutation, useQueryClient } from "react-query";

import TodoApi from "../../api/TodoApi";
import { getKeyGetTodos } from "./useGetTodos";

function useCreateTodo() {
    const queryCache = useQueryClient();

    const { mutate } = useMutation(TodoApi.createTodo, {
        onSuccess: (data) => {
            queryCache.setQueryData(getKeyGetTodos({}), (todos) => {
                todos.push(data);

                return todos;
            });
        }
    })

    return { createTodo: mutate };
}

export default useCreateTodo;