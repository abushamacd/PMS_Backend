"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectZod = void 0;
const zod_1 = require("zod");
// Create project zod validation schema
exports.createProjectZod = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Z: Project title is required',
        }),
        desc: zod_1.z.string({
            required_error: 'Z: Description is required',
        }),
    }),
});
