import { Box, List, ThemeIcon } from '@mantine/core'
import './App.css'
import useSWR from 'swr';
import AddTodo from './components/AddTodo';
import { CheckCircleFillIcon, TrashIcon } from '@primer/octicons-react';

export const ENDPOINT = "http://localhost:4000/api"
export const JSON_HEADERS = { "Content-Type": "application/json; charset=UTF-8" };
export interface iTodo {
  id: number;
  title: string;
  done: boolean;
  body: string;
}
export type AddTodoFunc = {
  (newTodo: iTodo): void;
};

const fetcher = async (url: string) => {
  const resp = await fetch(`${ENDPOINT}${url}`);
  return await resp.json();
};

function App() {
  const {data, mutate, error} = useSWR<iTodo[]>("/todos", fetcher);

  if (error) {
    console.warn('Error: ', error.message);
  }

  const addTodo = (newTodo: iTodo) => {
    if (data) {
      mutate([...data, newTodo]);
    }
  };

  const doDoneTodoItem = async (todo: iTodo) => {
    const resp = await fetch(`${ENDPOINT}/todos/${todo.id}/done`, {
      method: 'PATCH',
      headers: JSON_HEADERS
    });
    return await resp.json();
  }

  async function markTodoAsDone(todo: iTodo) {
    const doneTodo: iTodo = await doDoneTodoItem(todo);
    if (data && data.length) {
      todo.done = !todo.done;
      mutate(data);
    }
  }

  async function doDelTodo(todo: iTodo) {
    const resp = await fetch(`${ENDPOINT}/todos/${todo.id}`, {
      method: 'DELETE',
      headers: JSON_HEADERS
    });
  }

  async function deleteTodo(todo: iTodo) {
    await doDelTodo(todo);
    if (data && data.length) {
      mutate(data.filter((tdo) => tdo.id != todo.id));
    }
  }

  return (
      <Box
        sx={(theme) => ({
          padding:"2rem",
          width:"100%",
          maxWidth:"40rem",
          margin:"0 auto"
        })}
      >
        <h2>Todo list:</h2>
        {/* {JSON.stringify(data)} */}
        <List spacing="xs" size="sm" mb={12} center>
          {data?.map((todo) => (
            <List.Item
              key={`todo_list__${todo.id}`}
              icon={(
              <ThemeIcon
                color={todo.done ? "teal" : "gray"}
                size={22}
                radius="xl"
                onClick={() => markTodoAsDone(todo)}
                style={{
                  cursor: "pointer"
                }}>
                    <CheckCircleFillIcon />
              </ThemeIcon>)}
              title={todo.body}
              >
              {todo.title}
              <ThemeIcon
                color="gray"
                size={24}
                onClick={() => deleteTodo(todo)}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer"
                }}>
                  <TrashIcon />
              </ThemeIcon>
            </List.Item>
          ))}
        </List>
        <AddTodo addTodo={addTodo} />
      </Box>
  )
}

export default App
