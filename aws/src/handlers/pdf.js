import log from '../utils/log'
import pdf, { makePrintOptions } from '../chrome/pdf'

export default async function handler (event, context, callback) {
    const queryStringParameters = event.queryStringParameters || {};

    const urlDomainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/;
    const re = new RegExp(urlDomainRegex,'g');

    let {
        url,
        fileName,
        ...printParameters
    } = queryStringParameters

    // if no fileName is specify, we use the url domain. For instance, https://github.com/jolancornevin will become 'github'
    fileName = fileName || re.exec(url)[1].split('.').slice(0, -1).join('_');

    const printOptions = makePrintOptions(printParameters)
    let data;

    if (!url) {
        console.error('Error for PDF, there was not specified url');
        return callback(null, {
            statusCode: 400
        });
    }

    log('Processing PDFification for', url, printOptions)

    const startTime = Date.now()

    try {
        data = await pdf(url, printOptions)
    } catch (error) {
        console.error('Error printing pdf for', url, error)
        return callback(error)
    }

    log(`Chromium took ${Date.now() - startTime}ms to load URL and render PDF.`)

    // TODO: handle cases where the response is > 10MB
    // with saving to S3 or something since API Gateway has a body limit of 10MB
    return callback(null, {
        statusCode: 200,
        body: data,
        isBase64Encoded: true,
        headers: {
            'Content-Type': 'application/pdf',
            "Content-disposition": "attachment; filename=\"" + fileName +".pdf\""
        },
    })
}
