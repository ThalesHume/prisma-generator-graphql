"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converEnumText = exports.converModelText = exports.converInputText = void 0;
const types_1 = require("./types");
function converInputText(input) {
    console.log(input);
    return '';
}
exports.converInputText = converInputText;
function converModelText(model) {
    const modelStr = [];
    modelStr.push(`"${model.documentation}"`, `type ${model.name} {\n`);
    model.fields.forEach((f) => {
        modelStr.push(converModelField(f));
    });
    modelStr.push('}');
    return modelStr.join('\n');
}
exports.converModelText = converModelText;
function converEnumText(em) {
    const enumStr = [];
    enumStr.push(`"${em.documentation}"`, `enum ${em.name} {\n`);
    em.values.forEach((v) => {
        enumStr.push(`    ${v.name}\n`);
    });
    enumStr.push('}');
    return enumStr.join('\n');
}
exports.converEnumText = converEnumText;
function converModelField(field) {
    const defaultConvert = (f) => {
        switch (f.kind) {
            case 'enum':
                return f.type;
            case 'object':
                return f.type;
            case 'scalar':
                switch (f.type) {
                    case types_1.PrismaSclar.BigInt:
                        return types_1.GraphqlSclar.Int;
                    case types_1.PrismaSclar.Boolean:
                        return types_1.GraphqlSclar.Boolean;
                    case types_1.PrismaSclar.Bytes:
                        return 'Bytes';
                    case types_1.PrismaSclar.DateTime:
                        return 'DateTime';
                    case types_1.PrismaSclar.Decimal:
                        return types_1.GraphqlSclar.Float;
                    case types_1.PrismaSclar.Float:
                        return types_1.GraphqlSclar.Float;
                    case types_1.PrismaSclar.Int:
                        return types_1.GraphqlSclar.Int;
                    case types_1.PrismaSclar.Json:
                        return field.name;
                    case types_1.PrismaSclar.String:
                        return types_1.GraphqlSclar.String;
                    default:
                        throw new Error(`Unrecognized field type: ${f.type}`);
                }
            case 'unsupported':
                return `${f.name.toUpperCase()}`;
            default:
                throw new Error(`Unrecognized field kind: ${f.kind}`);
        }
    };
    const docs = converDocs(field.documentation);
    if ((docs === null || docs === void 0 ? void 0 : docs.type['Hide']) === 'true') {
        return '';
    }
    if (field.isList) {
        return `${docs === null || docs === void 0 ? void 0 : docs.doc}    ${field.name}: [${(docs === null || docs === void 0 ? void 0 : docs.type['Type']) && docs.type['Type'] !== ''
            ? docs.type['Type']
            : defaultConvert(field)}${field.isRequired ? '!' : ''}]\n`;
    }
    else {
        return `${docs === null || docs === void 0 ? void 0 : docs.doc}    ${field.name}: ${(docs === null || docs === void 0 ? void 0 : docs.type['Type']) && docs.type['Type'] !== ''
            ? docs.type['Type']
            : defaultConvert(field)}${field.isRequired ? '!' : ''}\n`;
    }
}
function converDocs(doc) {
    const arrToobj = (arr) => {
        const obj = {};
        if (arr) {
            arr.forEach(([k, v]) => (obj[k] = v));
        }
        return obj;
    };
    if (!doc) {
        return null;
    }
    else {
        const docs = doc.split('\n');
        return {
            doc: docs
                .filter((v) => !v.startsWith('@'))
                .map((v) => `    "${v}"`)
                .join('\n') + '\n',
            type: arrToobj(docs
                .filter((v) => v.startsWith('@'))
                .map((v) => {
                const typeArr = v.split(':');
                return [
                    typeArr[0].replace('@', ''),
                    typeArr.length > 1 ? typeArr[1].trim() : null,
                ];
            })),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvY29udmVydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQWtFO0FBRWxFLFNBQWdCLGVBQWUsQ0FBQyxLQUFxQjtJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2xCLE9BQU8sRUFBRSxDQUFBO0FBQ1gsQ0FBQztBQUhELDBDQUdDO0FBQ0QsU0FBZ0IsZUFBZSxDQUFDLEtBQWlCO0lBQy9DLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQTtJQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLFFBQVEsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUE7SUFDbkUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDcEMsQ0FBQyxDQUFDLENBQUE7SUFDRixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2xCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUM1QixDQUFDO0FBUkQsMENBUUM7QUFDRCxTQUFnQixjQUFjLENBQUMsRUFBc0I7SUFDbkQsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQTtJQUM1RCxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQTtJ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