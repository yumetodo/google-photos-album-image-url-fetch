var AF_initDataKeys = ["ds:0"];
var AF_dataServiceRequests = {
    'ds:0': {
        id: 'snAcKc',
        ext: 7.1837398E7,
        request: ["AF1QipMgHGuJRRQa_sIbtZWMnVDRRID1eogDnfC73_4oSPl_yWMqqnEES8cEVYQqs2nmyw", null, null, "WHVZVTJwTEYxNDNiVXkwQS1zbTYxYVFYMktGSktB"]
    }
};
var AF_initDataChunkQueue = [];
var AF_initDataCallback;
var AF_initDataInitializeCallback;
if (AF_initDataInitializeCallback) {
    AF_initDataInitializeCallback(AF_initDataKeys, AF_initDataChunkQueue, AF_dataServiceRequests);
}
if (!AF_initDataCallback) {
    AF_initDataCallback = function(chunk) {
        AF_initDataChunkQueue.push(chunk);
    };
}