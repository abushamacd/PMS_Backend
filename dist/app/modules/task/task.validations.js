"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskZod = void 0;
const zod_1 = require("zod");
// Create task zod validation schema
exports.createTaskZod = zod_1.z.object({
    body: zod_1.z.object({
        sectionId: zod_1.z.string({
            required_error: 'Z: Section id is required',
        }),
    }),
});
