"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1678224894861 = void 0;
class CreateUsersTable1678224894861 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL PRIMARY KEY,
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "age" INT NOT NULL
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users";`);
    }
}
exports.CreateUsersTable1678224894861 = CreateUsersTable1678224894861;
//# sourceMappingURL=1678224894861-CreateUsersTable.js.map