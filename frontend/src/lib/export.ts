import { toast } from "sonner";

export function exportToCSV(data: any[], filename: string) {
  toast.info(`Preparing ${filename} for export...`);
  if (!data || data.length === 0) {
    toast.error("No data available to export.");
    return;
  }
  try {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            const val = row[fieldName];
            const cleanVal = val === null || val === undefined ? "" : String(val);
            const escaped = cleanVal.replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${filename} exported successfully as CSV!`);
  } catch (error) {
    console.error("Export error:", error);
    toast.error("Failed to export data.");
  }
}

export function exportToPDF(title: string) {
  toast.info(`Opening print options for ${title}...`);
  setTimeout(() => {
    window.print();
  }, 300);
}
