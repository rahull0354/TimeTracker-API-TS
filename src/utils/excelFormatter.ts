import * as XLSX from "xlsx";

export const formatXLSX = (data: any, sheetname: any, filename: any) => {
  try {
    // creating new workbook
    const workbook = XLSX.utils.book_new();

    // converting json to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // appending workbook to worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetname);

    // buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return {
      buffer,
      filename: `${filename}_${Date.now()}.xlsx`,
      mimetype:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
  } catch (error) {
    throw new Error(`Error Formating Excel: ${error}`);
  }
};
