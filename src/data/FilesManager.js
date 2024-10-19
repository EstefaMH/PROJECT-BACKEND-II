import fs from "fs"

export class FilesManager {
    static path = ""

    static setPath(rutaArchivo = "") {
        this.path = rutaArchivo
    }

    static async readFileData() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }

    static async recordFile(datos = "") {
        await fs.promises.writeFile(this.path, datos)
    }



    static async addInfoFile(newRow = {}) {
        try {
            let id;
            const data = await this.readFileData();
            console.log("datafile:", data, newRow);

            if (data.length === 0) {
                id = 1;
                newRow.id=id;
            } else {
                id = Math.max(...data.map(row => row.id)) + 1;
                newRow.id=id;
            }

            const addNewRow = {
                id,
                ...newRow,
            };

            data.push(addNewRow);

            await this.recordFile(JSON.stringify(data, null, 2)); 

            return addNewRow;
        } catch (error) {
            console.error("Error adding info file:", error);
            return "Error adding info file";
        }
    }

}