import { Todo } from "../@types/todo";
import { faker } from "@faker-js/faker";

export const todos = (todos: Todo[]) => {
  return { env: { todos } };
};

export const getRandomTodo = (data?: {
  title?: string;
  completed?: boolean;
  id?: number;
}) => {
  const { title, completed, id } = data ?? {};
  return {
    title:
      title ?? faker.random.words(faker.datatype.number({ min: 1, max: 5 })),
    completed: completed ?? faker.datatype.boolean(),
    id: id ?? +faker.random.numeric(10),
  };
};

export const getTodos = (todos: Todo[] | number) => {
  if (typeof todos === "number") {
    const newReturn = [];
    for (let i = 0; i < todos; i++) {
      newReturn.push(getRandomTodo());
    }
    return { env: { todos: newReturn } };
  }
  return { env: { todos } };
};
