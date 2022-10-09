const fs = require('fs');
const sourceMap = require('source-map');
const path = require('path');

const getFileName = (fileInfo) => {
    return `${fileInfo.split('/').pop()}.map`;
}

const mapFromSource = async (error) => {
    console.log(error);
    if (error && error.length > 0) {
        error.exactStack = [];
        const mapPath = path.join('..', 'dist', 'assets', getFileName(error[0].fileName));
        if (fs.existsSync(mapPath)) {
            const file = fs.readFileSync(mapPath, 'utf8');
            const map = JSON.parse(file);
            const consumer = await new sourceMap.SourceMapConsumer(map);
            error.forEach((e) => {
                error.exactStack.push(consumer.originalPositionFor({ line: e.lineNumber, column: e.columnNumber }))
            })
            consumer.destroy();
        }
    }
    return error;
};

const getClientException = (error) => {
    return mapFromSource(error);
};

module.exports = {
    getClientException: getClientException
};
