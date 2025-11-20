"use strict"

module.exports = function logger(req, res, next){

    const start = Date.now();
    const method = req.method;
    const url = req.url;
    const isMutation = method === "POST" || method === "DELETE" || method === "PATCH";

    if(isMutation)
    {
        const transactioStarted = new Date().toISOString();
        const id = (req.params && (req.params.id ?? req.params.todoID)) ?? '-';
        const keys = Object.keys(req.body).join(',') || '-';
        console.log(`${transactioStarted} ${method} ${url} - started: ${id} ${keys}`)
    }

    res.on("finish", ()=>{

        const ms = Date.now() - start;
        const ts = new Date().toISOString();
        const suffix = isMutation ? " --end" : "";
        console.log(`${ts} ${method} ${url} ${res.statusCode} ${ms} ms - ${suffix}`)

    })

next();

}