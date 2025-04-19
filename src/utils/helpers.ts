export const toDynamoDBItem = (obj) => {
    const item = {};
  
    for (const key in obj) {
      const value = obj[key];
  
      if (value === null || value === undefined) continue; // Skip null/undefined
  
      if (typeof value === "string") {
        item[key] = { S: value };
      } else if (typeof value === "number") {
        item[key] = { N: value.toString() };
      } else if (typeof value === "boolean") {
        item[key] = { BOOL: value };
      } else if (Array.isArray(value)) {
        item[key] = {
          L: value.map((v) => toDynamoDBItem({ val: v })['val']), // Recursively map array elements
        };
      } else if (typeof value === "object") {
        item[key] = {
          M: toDynamoDBItem(value), // Recursively convert nested objects
        };
      } else {
        throw new Error(`Unsupported type for key "${key}"`);
      }
    }
  
    return item;
  };
  