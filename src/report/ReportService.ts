import {Service} from "@tsed/common";

@Service()
export class ReportService {

    constructor() {
    }

    /**
     * Find a agenda by his ID.
     * @param id
     * @returns {undefined|Agenda}
     */
    async findReport(id: string) {
        return new Promise((resolve, reject) => {
            // db.find({_id: id}, (err, docs) => {
            //     if (err) {
            //         reject(err);
            //     } else {
            //         resolve(docs);
            //     }
            // });
        });
    }
}