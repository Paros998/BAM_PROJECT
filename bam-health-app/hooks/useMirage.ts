import { createServer, Response } from "miragejs";

import users from "../mocks/users.json";
import { UserModel } from "@/interfaces/Api";

export function useMockServer() {
  createServer({
    routes() {
      this.get("/users/find/:userId", (schema, req) => {
        const actualUsers = users as UserModel[];

        const user = actualUsers.find(
          (user) => user.userId === req.params.userId,
        );

        if (user !== undefined) return new Response(200, undefined, user);
        return new Response(404);
      });
    },
  });
}
