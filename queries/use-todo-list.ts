import { Todo } from "@/types/todo";
import { useQuery } from "@tanstack/react-query";

const getTodoList = async (): Promise<Todo[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
};
const getTodoById = async (id: number): Promise<Todo[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/" + id);
  return response.json();
};

export const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todoList"],
    queryFn: getTodoList,
  });
};

export const useTodoItemQuery = (id: number) => {
  return useQuery({
    enabled: false,
    queryKey: ["todoItem", id],
    queryFn: async () => getTodoById(id),
  });
};
