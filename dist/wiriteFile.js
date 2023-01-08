"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function writeFile(location, data) {
    await promises_1.default
        .mkdir(path_1.default.dirname(location), {
        recursive: true,
    })
        .catch((e) => {
        throw new Error(`Create Path Failed[${e.message}]: ${path_1.default.dirname(location)}`);
    });
    await promises_1.default.writeFile(location, data, { encoding: 'utf-8' }).catch((e) => {
        throw new Error(`Write File Failed[${e.message}]: Path:${location}`);
    });
}
exports.writeFile = writeFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lyaXRlRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93aXJpdGVGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJEQUE0QjtBQUM1QixnREFBdUI7QUFFaEIsS0FBSyxVQUFVLFNBQVMsQ0FBQyxRQUFnQixFQUFFLElBQVk7SUFDNUQsTUFBTSxrQkFBRTtTQUNMLEtBQUssQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzdCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0JBQXNCLENBQUMsQ0FBQyxPQUFPLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUM5RCxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixNQUFNLGtCQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNwRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxXQUFXLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDdEUsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBYkQsOEJBYUMifQ==