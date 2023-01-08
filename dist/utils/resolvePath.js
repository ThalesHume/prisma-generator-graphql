"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePath = exports.resolveAllInOnePath = void 0;
const path_1 = require("path");
function clearPath(path) {
    return path.replaceAll('/({|})/g', '');
}
function fileExtension(fileType) {
    switch (fileType) {
        case 'gql.js':
            return '.js';
        case 'gql.ts':
            return '.ts';
        case 'graphql':
            return '.graphql';
    }
}
function resolveAllInOnePath(path, schemaPath, outputPath, type) {
    const arr = clearPath(path).split('-');
    const fileName = arr.pop() + fileExtension(type);
    return (0, path_1.resolve)(schemaPath, outputPath, ...arr, fileName);
}
exports.resolveAllInOnePath = resolveAllInOnePath;
function resolvePath(obj, config) {
}
exports.resolvePath = resolvePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVBhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVzb2x2ZVBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQThCO0FBSzlCLFNBQVMsU0FBUyxDQUFDLElBQVk7SUFDN0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN4QyxDQUFDO0FBQ0QsU0FBUyxhQUFhLENBQUMsUUFBa0I7SUFDdkMsUUFBUSxRQUFRLEVBQUU7UUFDaEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxLQUFLLENBQUE7UUFDZCxLQUFLLFFBQVE7WUFDWCxPQUFPLEtBQUssQ0FBQTtRQUNkLEtBQUssU0FBUztZQUNaLE9BQU8sVUFBVSxDQUFBO0tBQ3BCO0FBQ0gsQ0FBQztBQUNELFNBQWdCLG1CQUFtQixDQUNqQyxJQUFZLEVBQ1osVUFBa0IsRUFDbEIsVUFBa0IsRUFDbEIsSUFBYztJQUVkLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdEMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoRCxPQUFPLElBQUEsY0FBTyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDMUQsQ0FBQztBQVRELGtEQVNDO0FBQ0QsU0FBZ0IsV0FBVyxDQUFDLEdBQWlCLEVBQUUsTUFBbUI7QUFFbEUsQ0FBQztBQUZELGtDQUVDIn0=