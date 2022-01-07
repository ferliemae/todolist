async function createTodo(params) {
    const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
    });

    return res.json();
}

async function getTodos() {
  const res = await fetch('/api/todos');

  return res.json();
}

async function deleteTodo(todoId) {
    const res = await fetch(`/api/todos/${todoId}`, {method: 'DELETE'});

    return res.json();
}

async function updateTodo(params) {
    const { todo_id, data } = params;
    const res = await fetch(`/api/todos/${todo_id}`, {
        method: 'PUT',
        body: JSON.stringify({completed: data.completed, description: data.description, priority: data.priority}),
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
    })

    return res.json();
}

export default {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
    keyGetPosts: 'keyGetPosts'
};