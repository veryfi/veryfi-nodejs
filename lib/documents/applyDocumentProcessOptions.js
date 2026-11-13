/**
 * Merge extra Process a Document options into the request body.
 * `thinking` is included only when the caller sets it. Omit it, or pass null,
 * to use the standard pipeline. Accepted values are `light` and `deep`.
 * https://docs.veryfi.com/api/receipts-invoices/process-a-document/
 * https://faq.veryfi.com/en/articles/18356750-what-is-thinking-mode-and-how-do-i-use-it
 *
 * @param {Object} requestArguments Body fields already set by the caller
 * @param {Object} [kwargs] Additional request parameters
 * @returns {Object} Request body
 */
function applyDocumentProcessOptions(requestArguments, kwargs = {}) {
    const options = Object.assign({}, kwargs);
    if (options.thinking == null) {
        delete options.thinking;
    }
    return Object.assign(requestArguments, options);
}

module.exports = applyDocumentProcessOptions;
