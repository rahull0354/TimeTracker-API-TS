import { Parser } from "json2csv";
export const formatCSV = (data, filename) => {
    try {
        const fields = data.length > 0 ? Object.keys(data[0]) : [];
        const parser = new Parser({ fields });
        const csv = parser.parse(data);
        return {
            csv,
            filename: `${filename}_${Date.now()}.csv`,
            mimetype: "text/csv",
        };
    }
    catch (error) {
        throw new Error(`Error Formatting data to csv: ${error}`);
    }
};
