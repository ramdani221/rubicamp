import { db } from "../Connector.js";

export default class Mahasiswa {
    constructor(obj) {
        this.nim = obj.nim; this.nama = obj.nama; this.alamat = obj.alamat;
        this.id_jurusan = obj.id_jurusan; this.lahir = obj.lahir;
    }

    save() {
        db.run("INSERT INTO mahasiswa (nim, nama, alamat, id_jurusan, lahir) VALUES (?, ?, ?, ?, ?)",
            [this.nim, this.nama, this.alamat, this.id_jurusan, this.lahir],
            (err, data) => {
                if (err) console.log(err)
                else data
            })

    };

    static list() {
        return new Promise(function (resolve, reject) {
            db.all("SELECT nim, mahasiswa.nama, lahir, alamat, jurusan.id_jurusan, jurusan.nama AS namajurusan FROM mahasiswa LEFT JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan", (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })

    };

    static find(nim) {
        return new Promise(function (resolve, reject) {
            db.get("SELECT * FROM mahasiswa WHERE nim = ?", [nim], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    };

    static add(nim, nama, alamat, id_jurusan, lahir) {
        const mahasiswa = new Mahasiswa({ nim: nim, nama: nama, alamat: alamat, id_jurusan: id_jurusan, lahir: lahir });
        return mahasiswa.save()
    };

    static delete(nim) {
        return new Promise(function (resolve, reject) {
            db.run("DELETE FROM mahasiswa WHERE nim = ?", [nim], (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    };
}

