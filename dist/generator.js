"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_helper_1 = require("@prisma/generator-helper");
const sdk_1 = require("@prisma/sdk");
const constants_1 = require("./constants");
const resolvePath_1 = require("./utils/resolvePath");
const converts_1 = require("./utils/converts");
const wiriteFile_1 = require("./wiriteFile");
const { version } = require('../package.json');
const defaultConfig = { allInOnePath: 'generated_types' };
(0, generator_helper_1.generatorHandler)({
    onManifest() {
        sdk_1.logger.info(`${constants_1.GENERATOR_NAME}:Registered`);
        return {
            version,
            prettyName: constants_1.GENERATOR_NAME,
        };
    },
    onGenerate: async (options) => {
        var _a;
        const config = Object.assign({}, defaultConfig, options.generator.config);
        const modelStrs = {};
        options.dmmf.datamodel.models.forEach((v) => (modelStrs[v.name] = { content: (0, converts_1.converModelText)(v) }));
        const enumStrs = {};
        options.dmmf.datamodel.enums.forEach((v) => (enumStrs[v.name] = { content: (0, converts_1.converEnumText)(v) }));
        if (config.allInOnePath && config.allInOnePath !== '') {
            const path = (0, resolvePath_1.resolveAllInOnePath)(config.allInOnePath, options.schemaPath, ((_a = options.generator.output) === null || _a === void 0 ? void 0 : _a.value) ? options.generator.output.value : '', 'graphql');
            const content = Object.values(Object.assign({}, modelStrs, enumStrs)).map(v => v.content).join('\n');
            console.log(path);
            await (0, wiriteFile_1.writeFile)(path, content)
                .catch((e) => console.log(e.message));
        }
        else {
            console.log("please use 'allInOnePath: foldername-foldername...-filename', other ways is developing...");
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUdpQztBQUNqQyxxQ0FBb0M7QUFDcEMsMkNBQTRDO0FBRTVDLHFEQUF5RDtBQUN6RCwrQ0FJeUI7QUFDekIsNkNBQXdDO0FBRXhDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUU5QyxNQUFNLGFBQWEsR0FBaUIsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQTtBQUN2RSxJQUFBLG1DQUFnQixFQUFDO0lBQ2YsVUFBVTtRQUNSLFlBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRywwQkFBYyxhQUFhLENBQUMsQ0FBQTtRQUMzQyxPQUFPO1lBQ0wsT0FBTztZQUNQLFVBQVUsRUFBRSwwQkFBYztTQUMzQixDQUFBO0lBQ0gsQ0FBQztJQUNELFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBeUIsRUFBRSxFQUFFOztRQUM5QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV6RSxNQUFNLFNBQVMsR0FBa0IsRUFBRSxDQUFBO1FBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ25DLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBQSwwQkFBZSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FDN0QsQ0FBQTtRQUVELE1BQU0sUUFBUSxHQUFrQixFQUFFLENBQUE7UUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDbEMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFBLHlCQUFjLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUMzRCxDQUFBO1FBSUQsSUFBSSxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEtBQUssRUFBRSxFQUFFO1lBQ3JELE1BQU0sSUFBSSxHQUFHLElBQUEsaUNBQW1CLEVBQzlCLE1BQU0sQ0FBQyxZQUFZLEVBQ25CLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLENBQUEsTUFBQSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sMENBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDOUMsU0FBUyxDQUNqQyxDQUFBO1lBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUN0QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQixNQUFNLElBQUEsc0JBQVMsRUFBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO2lCQUMzQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7U0FDeEM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkZBQTJGLENBQUMsQ0FBQTtTQUN6RztJQUNILENBQUM7Q0FDRixDQUFDLENBQUEifQ==