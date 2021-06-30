let VeryfiClientError = function (raw_response, error_info) {
    this.raw_response = raw_response['response'];
    this.status = this.raw_response['status'];
    this.error_info = error_info['error']
}

        
/** Veryfi API returns error messages with a json body
 * like:
 * {
 *     'status': 'fail',
 *     'error': 'Human readable error description.'
 * }
 */
VeryfiClientError.prototype.from_response = function (raw_response){
    try{
        error_cls = _error_map[this.status]
    } catch (KeyError) {
        console.error(
            "Unknown error Please contact customer support at support@veryfi.com."
        )
    }
    
    return {'status':error_cls, 'error':this.error_info}
}

_error_map = {
    400: 'BadRequest',
    401: 'UnauthorizedAccessToken',
    404: 'NotFound',
    405: 'UnexpectedHTTPMethod',
    409: 'AccessLimitReached',
    500: 'InternalError',
}

module.exports = VeryfiClientError;