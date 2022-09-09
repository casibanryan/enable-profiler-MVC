const db = require('../database/Query_Builder');

class Enable_Profiler {
    constructor() {
        this.post = null;
    }   

    run(is_true) {
        return (req, res, next) => {
            let output = '';
            
            if(req.method == 'POST') {
                this.post = req.body;
            }
            output += `<div class="text-warning border border-warning p-3 mt-5">
                            <h3>GET DATA</h3>`;
                            if(Object.entries(req.query).length >= 1) {
                                Object.entries(req.query).forEach((val) => {
                                    output += `<p>${val[0]} = ${val[1]}</p>`;
                                });
                            } else {
                                output += `<p>No Get data exist</p>`;
                            }

                        output += `</div>`;

            output += `<div class="text-success border border-success p-3 mt-3">
                            <h3>POST DATA</h3>`;
                             
                            if(this.post != null) {
                                const post_data = Object.entries(this.post);
                                post_data.forEach((val) => {
                                    output += `<p>${val[0]} = ${val[1]}</p>`;
                                });
                            } else {
                                output += `<p>No Post data exist</p>`;
                            }
                        output += `</div>`;

            output += `<div class="text-primary border border-primary p-3 mt-3">
                            <h3>DATABASE: ${db.config.database}</h3>`;
                            if(db.queries.length >= 1) {
                                db.queries.forEach((val) => {
                                    output += `<p>${val[0]}</p>`
                                    output += `<p>${val[1] !== undefined ? val[1] : null}</p>`
                                });
                            }
                        output += `</div>`;

            output += `<div class="text-dark border border-dark p-3 mt-3">
                <h3>SESSION DATA</h3>`;
                    const session_data = Object.entries(req.session);
                    session_data.forEach((val) => {
                        output += `<p class="bg-secondary p-2 text-danger">`;
                        output += `${val[0]}`; 
                        output += `<span class="mx-5 text-dark">${JSON.stringify(val[1])}</span>`;
                        output += `</p>`;
                    });
                   
                `</div>`;
   
            req.output = is_true ? output : '';
            next();
        }
    }

}

module.exports = new Enable_Profiler();