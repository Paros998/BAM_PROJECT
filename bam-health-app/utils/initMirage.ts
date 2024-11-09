import { createServer, Response } from "miragejs";

import users from "@/mocks/users.json";
import { User, UserModel } from "@/interfaces/Api";
import { JwtUser } from "@/interfaces/JwtUser";

export function useMockServer() {
  const sign = require("jwt-encode");

  createServer({
    routes() {
      this.namespace = "/api/v1/";

      this.get("/users/find/:userId", (schema, req) => {
        const actualUsers = users as UserModel[];

        const user = actualUsers.find(
          (user) => user.userId === req.params.userId,
        );

        if (user !== undefined) return new Response(200, undefined, user);
        return new Response(404);
      });

      this.post("/auth/login", (schema, req) => {
        const params = new URLSearchParams(req.requestBody).entries();
        const username = params.next().value[1];
        const password = params.next().value[1];

        if (!username || !password) {
          return new Response(400);
        }

        const actualUsers = users as User[];

        const user = actualUsers.find((user) => user.username === username);

        if (user === undefined) return new Response(404);
        if (user.password !== password) return new Response(401);

        const data: JwtUser = {
          userId: user.userId,
          exp: 0,
          iat: 0,
          sub: user.username,
          authorities: [],
        };

        const token = sign(data, "Super_Secret");
        return new Response(200, { Authorization: `Bearer ${token}` });
      });
    },
  });
}
